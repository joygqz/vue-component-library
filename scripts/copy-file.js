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

// function copyReadme() {
//   const readmePath = path.join(__dirname, '../README.md')
//   const distReadmePath = path.join(__dirname, '../dist/README.md')

//   if (fs.existsSync(readmePath)) {
//     fs.copyFileSync(readmePath, distReadmePath)
//   }
// }

try {
  copyPackageJson()
  // copyReadme()
}
catch {
  process.exit(1)
}
