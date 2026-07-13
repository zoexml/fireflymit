import pc from 'picocolors'
import { version } from './version.js'

const HEAD = text => pc.bgBlack(pc.brightBlue(text))

const LINES = [
  ' ███╗   ██╗███████╗██████╗  ██████╗ ',
  ' ████╗  ██║██╔════╝██╔══██╗██╔═══██╗',
  ' ██╔██╗ ██║█████╗  ██████╔╝██║   ██║',
  ' ██║╚██╗██║██╔══╝  ██╔══██╗██║   ██║',
  ' ██║  ╚████║███████╗██║  ██║╚██████╔╝',
  ' ╚═╝   ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ',
]

const TAIL = [
  pc.dim(`v${version}`),
  pc.dim('fireflymit/scaffold'),
  '',
  `${pc.brightGreen('▶')} ${pc.dim('One-command project engineering setup')}`,
  '',
  '',
]

export function splash() {
  console.log()
  for (let i = 0; i < LINES.length; i++) {
    const tail = TAIL[i] ? `  ${TAIL[i]}` : ''
    console.log(`${HEAD(LINES[i])}${tail}`)
  }
  console.log()
}
