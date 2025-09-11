const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

function getPackageNames() {
  // 从 packages 目录自动检测所有包名
  const packagesDir = path.join(__dirname, '../packages')
  if (!fs.existsSync(packagesDir)) {
    return []
  }

  return fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name !== 'main') // 排除 main 包自身
}

function detectPackageNamesFromDist() {
  // 从 dist 目录检测包名（作为备选方案）
  const esDir = path.join(__dirname, '../dist/es')
  if (!fs.existsSync(esDir)) {
    return []
  }

  return fs.readdirSync(esDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['main', 'node_modules'].includes(name)) // 排除特殊目录
}

function fixMainFilePaths() {
  const esDir = path.join(__dirname, '../dist/es')
  const libDir = path.join(__dirname, '../dist/lib')

  // 获取所有包名，优先从源码目录，后备从构建目录
  let packageNames = getPackageNames()
  if (packageNames.length === 0) {
    packageNames = detectPackageNamesFromDist()
  }

  // 创建正则表达式匹配所有包
  const packagePattern = packageNames.length > 0
    ? new RegExp(`\\.\\./(${packageNames.join('|')})/`, 'g')
    : /\.\.\/([\w-]+)\//g // fallback: 匹配任何有效的包名

  function processDirectory(dir) {
    const mainDir = path.join(dir, 'main')

    if (!fs.existsSync(mainDir)) {
      return
    }

    const mainFiles = fs.readdirSync(mainDir)

    // 移动文件并修复路径
    mainFiles.forEach((file) => {
      const srcPath = path.join(mainDir, file)
      const destPath = path.join(dir, file)

      // 跳过目录
      if (fs.lstatSync(srcPath).isDirectory()) {
        return
      }

      // 读取文件内容
      let content = fs.readFileSync(srcPath, 'utf-8')

      // 修复导入路径：将 ../packageName/ 改为 ./packageName/
      content = content.replace(packagePattern, './$1/')

      // 写入新位置
      fs.writeFileSync(destPath, content)
    })

    // 删除原目录
    fs.rmSync(mainDir, { recursive: true })
  }

  // 处理 ES 模块
  if (fs.existsSync(esDir)) {
    processDirectory(esDir)
  }

  // 处理 CommonJS 模块
  if (fs.existsSync(libDir)) {
    processDirectory(libDir)
  }
}

try {
  fixMainFilePaths()
}
catch {
  process.exit(1)
}
