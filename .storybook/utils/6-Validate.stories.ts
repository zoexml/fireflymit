import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  getPasswordStrength,
  trimSpaces,
  validateAccount,
  validateBankCard,
  validateChineseIDCard,
  validateEmail,
  validateIPv4Address,
  validatePassword,
  validatePhone,
  validateStrongPassword,
  validateTelPhone,
  validateURL,
} from '@fireflymit/utils'

const meta: Meta = {
  title: '工具/Validate',
}
export default meta
type Story = StoryObj

export const Demo: Story = {
  render: () => ({
    setup() {
      const ok = (v: boolean) => v
        ? '<span style="color:#16a34a;font-weight:600;">✓</span>'
        : '<span style="color:#dc2626;font-weight:600;">✗</span>'
      return {
        r1: ok(validatePhone('13812345678')),
        r2: ok(validateTelPhone('010-12345678')),
        r3: ok(validateAccount('admin_user')),
        r4: ok(validatePassword('abc12345')),
        r5: ok(validateStrongPassword('Abc123!@')),
        r6: ok(validateIPv4Address('192.168.1.1')),
        r7: ok(validateEmail('user@example.com')),
        r8: ok(validateURL('https://www.example.com')),
        r9: ok(validateChineseIDCard('11010119900307663X')),
        r10: ok(validateBankCard('6222021234567890')),
        s1: getPasswordStrength('123456'),
        s2: getPasswordStrength('abc12345'),
        s3: getPasswordStrength('Abc123!@#'),
        trim: trimSpaces('  hello world  '),
      }
    },
    template: `
      <div style="max-width: 700px;">
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f6f8fa;text-align:left;">
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">函数</th>
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">测试值</th>
              <th style="padding:8px 12px;border:1px solid #e5e7eb;width:50px;">结果</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validatePhone</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">13812345678</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r1"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateTelPhone</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">010-12345678</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r2"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateAccount</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">admin_user</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r3"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validatePassword</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">abc12345</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r4"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateStrongPassword</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">Abc123!@</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r5"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateIPv4Address</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">192.168.1.1</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r6"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateEmail</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">user@example.com</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r7"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateURL</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">https://www.example.com</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r8"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateChineseIDCard</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">11010119900307663X</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r9"></td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">validateBankCard</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">6222021234567890</td><td style="padding:6px 12px;border:1px solid #e5e7eb;" v-html="r10"></td></tr>
          </tbody>
        </table>

        <h3 style="font-size:14px;font-weight:600;margin:24px 0 8px;">getPasswordStrength 密码强度评估</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f6f8fa;text-align:left;">
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">密码</th>
              <th style="padding:8px 12px;border:1px solid #e5e7eb;">强度</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">123456</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">{{ s1 }}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">abc12345</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">{{ s2 }}</td></tr>
            <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">Abc123!@#</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">{{ s3 }}</td></tr>
          </tbody>
        </table>

        <h3 style="font-size:14px;font-weight:600;margin:24px 0 8px;">trimSpaces</h3>
        <pre style="background:#f6f8fa;padding:10px 14px;border-radius:4px;font-size:13px;">trimSpaces('  hello world  ') → "{{ trim }}"</pre>
      </div>
    `,
  }),
}
