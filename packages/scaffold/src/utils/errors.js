/**
 * Shared error class for CLI commands. Thrown instead of calling
 * process.exit() so the top-level error handler can decide the exit code.
 */
export class CliError extends Error {
  constructor(message, exitCode = 1) {
    super(message)
    this.name = 'CliError'
    this.exitCode = exitCode
  }
}
