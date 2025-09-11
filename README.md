# Vue Component Library Template 🎨

一个基于 Vue 3 + TypeScript + Vite 的现代化组件库开发模板，采用 Monorepo 架构，提供完整的开发、构建、测试和文档解决方案。

## ✨ 特性

- 🎯 **Vue 3 + TypeScript** - 完整的类型支持
- 📦 **Monorepo 架构** - 使用 pnpm workspace 管理
- ⚡ **Vite 构建** - 快速的开发体验和构建速度
- 🧩 **模块化设计** - 组件、Hook、工具函数独立管理
- 📚 **文档系统** - 基于 VitePress 的文档站点
- 🎮 **Playground** - 实时组件预览和调试
- 🔧 **自动解析器** - 支持按需导入
- 📝 **类型声明** - 自动生成 TypeScript 声明文件
- 🎨 **代码规范** - ESLint + Prettier 代码格式化
- 🚀 **CI/CD 友好** - 完整的构建和发布流程

## 📁 项目结构

```
monorepo-demo/
├── docs/                    # 📚 文档站点 (VitePress)
├── packages/                # 📦 核心包
│   ├── components/         # 🧩 Vue 组件
│   ├── hooks/              # 🪝 Vue Composables
│   ├── main/               # 🎯 主入口包
│   └── resolver/           # 🔧 自动导入解析器
├── playground/             # 🎮 开发调试环境
├── scripts/                # 📜 构建脚本
├── dist/                   # 📂 构建产物
└── README.md              # 📖 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
# 安装依赖
pnpm install

# 或者完全重新安装
pnpm run fresh-install
```

### 开发

```bash
# 启动开发环境 (Playground)
pnpm dev

# 启动文档站点
pnpm docs:dev
```

### 构建

```bash
# 构建组件库
pnpm build

# 构建文档
pnpm docs:build
```

## 📦 包结构

### @main/components

Vue 组件集合，包含所有 UI 组件。

```typescript
// 按需导入
import { Button } from '@main/components'

// 或全量导入
import * as MainComponents from '@main/components'
```

### @main/hooks

Vue Composables 集合，提供可复用的逻辑函数。

```typescript
import { useTest } from '@main/hooks'
```

### @main/resolver

自动导入解析器，支持 unplugin-auto-import 和 unplugin-vue-components。

```typescript
// vite.config.ts
import { MainResolver } from '@main/resolver'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Components({
      resolvers: [MainResolver()]
    })
  ]
}
```

## 🎯 使用方式

### 全局安装

```typescript
// main.ts
import Main from '@main/main'
import { createApp } from 'vue'

const app = createApp(App)
app.use(Main)
```

### 按需导入

```vue
<script setup>
import { Button } from '@main/components'
</script>

<template>
  <Button type="primary">
    点击我
  </Button>
</template>
```

### 自动导入 (推荐)

配置解析器后，无需手动导入：

```vue
<script setup>
// 自动导入 hooks
const { value } = useTest()
</script>

<template>
  <!-- 自动解析，无需 import -->
  <Button type="primary">
    点击我
  </Button>
</template>
```

## 🛠️ 开发指南

### 添加新组件

1. 在 `packages/components/` 下创建组件目录
2. 创建组件文件和导出
3. 在 `packages/components/index.ts` 中导出
4. 在 `packages/main/index.ts` 中注册

### 添加新 Hook

1. 在 `packages/hooks/` 下创建 hook 目录
2. 实现 composable 函数
3. 在 `packages/hooks/index.ts` 中导出

### 构建配置

- **ES Module**: `dist/es/` - 现代 ES 模块格式
- **CommonJS**: `dist/lib/` - 兼容 CommonJS 格式
- **Types**: 自动生成 `.d.ts` 声明文件
- **Tree Shaking**: 支持按需加载

## 📜 可用脚本

```bash
# 开发
pnpm dev              # 启动 playground
pnpm docs:dev         # 启动文档站点

# 构建
pnpm build            # 构建组件库
pnpm docs:build       # 构建文档
pnpm docs:preview     # 预览文档

# 代码质量
pnpm lint             # 检查代码规范
pnpm lint:fix         # 自动修复代码规范

# 清理
pnpm clean            # 清理所有 node_modules
pnpm fresh-install    # 重新安装依赖
```

## 🔧 技术栈

- **框架**: Vue 3
- **语言**: TypeScript
- **构建工具**: Vite
- **包管理**: pnpm
- **文档**: VitePress
- **代码规范**: ESLint + @antfu/eslint-config
- **类型生成**: unplugin-dts
- **测试**: Vitest

## 📄 许可证

[MIT](./LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📞 联系

如有问题，请提交 Issue 或联系维护者。

---

**Happy Coding! 🎉**
