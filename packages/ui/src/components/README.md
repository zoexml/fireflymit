# Components

业务组件统一出口在 [`index.ts`](./index.ts)，安装器在 [`installer.ts`](./installer.ts)，
`unplugin-vue-components` 解析器依赖的组件名清单见 [`names.ts`](./names.ts)。

## 图表组件

图表组件（`BarChart` / `LineChart` / `KLineChart` / `MapChart` / `HBarChart` /
`DualBarCompareChart` / `RadarChart` / `RingChart` / `ScatterChart`）作为
`apps/admin` 的私有业务组件保留在
[`apps/admin/src/components/charts/fa-*-chart/`](../../../apps/admin/src/components/charts/fa-bar-chart)，
未对外发布，因此不在 `@fireflymit/ui` 公共组件清单中。

如果后续要把图表组件纳入 `@fireflymit/ui`，请：

1. 在 [`names.ts`](./names.ts) 追加对应组件名；
2. 在 [`index.ts`](./index.ts) 中显式 `export * from './<ChartName>'`；
3. 补充 `<ChartName>.stories.ts`、`<ChartName>.types.ts` 与最小测试用例。
