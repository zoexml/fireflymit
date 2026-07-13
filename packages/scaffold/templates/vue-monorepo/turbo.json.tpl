{
  "$schema": "https://turborepo.com/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": { "dependsOn": ["^lint"] },
    "check-types": {
      "dependsOn": ["^check-types"],
      "inputs": ["$TURBO_DEFAULT$", "tsconfig.json", "src/**/*.{ts,tsx,vue}"]
    },
    "test": {
      "inputs": ["src/**/*.{ts,tsx,vue}", "**/*.spec.ts", "**/*.test.ts"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {}
  }
}
