---
title: 前后端契约
---

# 前后端契约

本页只写能从代码中直接读出的事实：响应封装、鉴权、前端请求层与分页约定。未在仓库中体现的约定会明确标为「待补充」。

## 统一响应封装

后端所有普通 JSON 响应通过 `apps/admin-backend/app/common/response.py` 的 `ResponseSchema` 输出：

| 字段          | 类型        | 说明                     |
| ------------- | ----------- | ------------------------ |
| `code`        | `int`       | 业务状态码，成功默认 `0` |
| `msg`         | `str`       | 响应消息                 |
| `data`        | `T \| null` | 响应数据                 |
| `status_code` | `int`       | HTTP 状态码，默认 `200`  |
| `success`     | `bool`      | 是否成功，默认 `true`    |

- `SuccessResponse`：默认 `code=0`、`msg="成功"`、`status_code=200`、`success=true`
- `ErrorResponse`：默认 `code=1`、`msg="请求错误"`、`status_code=400`、`success=false`
- 响应头固定为 `Content-Type: application/json; charset=utf-8`

业务码定义在 `app/common/constant.py` 的 `RET` 枚举，例如 `OK=(0, "成功")`、`ERROR=(1, "请求错误")`、`EXCEPTION=(-1, "系统异常")`。

前端 `apps/admin/src/enums/api/result.enum.ts` 使用同一套业务码：

```ts
export const enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  EXCEPTION = -1,
  UNAUTHORIZED = 10403,
  TOKEN_EXPIRED = 10401,
}
```

前端响应类型 `ApiResponse<T>`（`apps/admin/src/types/global.d.ts`）与后端字段一一对应：`code`、`data`、`msg`、`status_code`、`success`。

## 鉴权

### 令牌

- JWT 算法 `HS256`，密钥与有效期来自 `app/config/setting.py`（`ACCESS_TOKEN_EXPIRE_SECONDS`、`REFRESH_TOKEN_EXPIRE_SECONDS` 默认均为 12 小时）。
- 令牌类型为 `Bearer`（`TOKEN_TYPE`）。
- 请求头格式：

```http
Authorization: Bearer <access_token>
```

后端 `app/core/security.py` 的 `CustomOAuth2PasswordBearer` 会校验 scheme 是否为 `Bearer`，不匹配时抛出业务码 `10401`、HTTP `401` 的异常。

### 登录与刷新

| 接口                                | 方法   | 说明                                                                                                                 |
| ----------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `/api/v1/system/auth/login`         | `POST` | 登录。表单（`multipart/form-data`）字段：`username`、`password`，并支持可选的 `captcha_key`、`captcha`、`login_type` |
| `/api/v1/system/auth/token/refresh` | `POST` | 刷新令牌。JSON body：`{ "refresh_token": "..." }`，返回新的 `access_token` / `refresh_token`                         |

令牌响应模型 `JWTOutSchema`（`app/core/base_schema.py`）：

```text
access_token / refresh_token / token_type (默认 Bearer) / expires_in
```

### 前端携带与续期

`apps/admin/src/utils/http/index.ts` 的请求拦截器：

- 自动读取 `Auth.getAccessToken()`，写入 `Authorization: Bearer <token>`
- 请求头 `Authorization` 设为 `no-auth`（`NO_AUTH_FLAG`）时不带令牌

响应拦截器在以下情况静默刷新令牌，成功后重放等待中的请求：

- HTTP `401` 且响应体没有业务 `code`
- 响应体 `code === 10401`（`TOKEN_EXPIRED`）

刷新接口自身返回 `401`、或刷新失败时，跳转登录页。

## 接口调用约定

### 请求实例

`apps/admin/src/utils/http/index.ts` 创建 Axios 实例：

| 配置                | 值                                         | 说明                                   |
| ------------------- | ------------------------------------------ | -------------------------------------- |
| `baseURL`           | `import.meta.env.VITE_APP_BASE_API`        | 开发环境为 `/api/v1`                   |
| `timeout`           | `VITE_API_TIMEOUT`（默认 15000）           | 开发环境配置为 `120000` 毫秒           |
| 默认 `Content-Type` | `application/json;charset=utf-8`           | 登录接口单独改为 `multipart/form-data` |
| `paramsSerializer`  | `qs.stringify(params, { indices: false })` | 数组参数展开为重复 key                 |

开发环境由 Vite 代理转发：`apps/admin/vite.config.ts` 把 `VITE_APP_BASE_API`（`/api/v1`）代理到 `VITE_API_BASE_URL`（`http://127.0.0.1:8001`）。

### 业务模块

前端接口按后端模块放在 `apps/admin/src/api/module_*/`，调用形式统一为：

```ts
import { request } from '@utils'

const API_PATH = '/system/auth'

const AuthAPI = {
  login(body: LoginFormData) {
    return request<ApiResponse<LoginResult>>({
      url: `${API_PATH}/login`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: body,
    })
  },
}
```

响应拦截器的统一处理：

- `data.code !== 0`：弹出 `data.msg` 并 `reject`
- 非 `GET` 且 URL 不含 `login` / `logout` 的成功请求：自动弹出成功提示
- 文件下载（`responseType: 'blob'`）直接透传

### 分页

后端公共查询参数 `PaginationQueryParam`（`app/core/base_params.py`）：

| 参数        | 默认 | 约束                                 |
| ----------- | ---- | ------------------------------------ |
| `page_no`   | `1`  | `>= 1`                               |
| `page_size` | `10` | `1 ~ 100`                            |
| `order_by`  | 无   | JSON 字符串，形如 `[{"id": "desc"}]` |

分页响应 `PageResultSchema`（后端 `app/core/base_schema.py`）与前端 `PageResult<T>`（`apps/admin/src/types/global.d.ts`）字段一致：

```text
items: T[]
total: number
page_no: number
page_size: number
has_next: boolean
```

## WebSocket

- 前端端点由 `VITE_APP_WS_ENDPOINT` 指定，开发环境为 `ws://localhost:8001`。
- 后端 WebSocket 认证从查询参数读取令牌（`app/core/dependencies.py` 的 `get_current_user_ws`，参数名 `token`）。

## 待补充

- 业务错误码（`RET` 中 4000+ 段）与前端提示的完整映射
- 接口版本升级（`/api/v1` 之外的新版本）策略
- 按接口生成的 OpenAPI 客户端或类型同步流程
