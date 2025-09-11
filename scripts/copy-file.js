const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

function copyPackageJson() {
  const mainPackageJsonPath = path.join(__dirname, '../packages/main/package.json')
  const distPackageJsonPath = path.join(__dirname, '../dist/package.json')

  if (fs.existsSync(mainPackageJsonPath)) {
    fs.copyFileSync(mainPackageJsonPath, distPackageJsonPath)
  }
}

try {
  copyPackageJson()
}
catch {
  process.exit(1)
}
