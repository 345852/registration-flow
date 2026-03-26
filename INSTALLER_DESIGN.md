# 热血编辑器 - 安装流程设计文档

## 🎮 设计理念

基于**黑紫游戏化**主题的编辑器安装向导，采用现代化的UI设计，融合了：
- 深色背景（黑/深紫渐变）
- 紫粉霓虹色强调色
- 动态粒子和光效
- 流畅的动画过渡
- 沉浸式全屏图片展示

## 🎨 色彩系统

### 主色调
- **背景**: `from-gray-900 via-purple-900 to-black`
- **主色**: `purple-600` → `pink-600` (渐变)
- **边框**: `purple-500/30` (半透明)
- **文字**: `purple-300`, `gray-300`, `gray-400`

### 交互色彩
- **悬停态**: `purple-500`, `pink-500`
- **激活态**: `purple-600`, `pink-600`
- **阴影**: `shadow-purple-500/50`

## 📐 布局结构

### 窗口规格
- **尺寸**: 920px × 580px
- **边框**: 1px 紫色半透明边框
- **阴影**: 2xl 级别阴影
- **背景**: 黑紫渐变

### 上下分区
1. **上半部分** (flex-1)
   - 铺满背景图片
   - 渐变覆盖层
   - 紫色光晕效果
   - 动态内容展示

2. **下半部分** (固定高度)
   - 半透明深色背景
   - 操作按钮/配置项
   - 装饰线条效果

## 🎬 页面流程

### 1. Welcome（欢迎页）
**路径**: `/`

**功能**:
- 展示编辑器宣传图
- 用户协议勾选（带渐变色链接）
- 两个安装选项：
  - **自定义安装**: 进入路径配置页
  - **立即安装**: 直接开始安装

**特效**:
- 图片缩放淡入动画
- 按钮渐变闪光效果
- 勾选框动画

---

### 2. InstallPath（安装路径配置）
**路径**: `/install-path`

**功能**:
- 显示安装路径输入框
- 显示磁盘空间信息（紫色/绿色高亮）
- 更改地址按钮（打开文件选择器）
- 桌面快捷方式选项
- 上一步/立即安装按钮

**特效**:
- 装饰性边框条
- 输入框聚焦发光
- 按钮悬停缩放

---

### 3. Installing（安装进度）
**路径**: `/installing`

**功能**:
- 显示安装进度百分比
- 动态状态文本更新
- 游戏化进度条

**特效**:
- **粒子效果**: 20个动态紫色粒子漂浮
- **进度条动画**:
  - 紫粉渐变填充
  - 光波扫描效果
  - 网格背景纹理
  - 边框发光
- 状态文本淡入淡出

**进度阶段**:
- 0-30%: 正在下载安装包
- 30-60%: 正在解压文件
- 60-90%: 正在安装组件
- 90-100%: 即将完成

---

### 4. Complete（安装成功）
**路径**: `/complete`

**功能**:
- 显示成功提示
- 立即体验按钮

**特效**:
- **成功图标**:
  - 圆形渐变背景
  - 弹性缩放旋转入场
  - 对勾路径动画
  - 外圈发光效果
- **粒子爆炸**: 12个粒子径向扩散
- **文字动画**: 渐变色标题淡入

---

### 5. Splash（版本信息加载）
**路径**: `/splash`

**功能**:
- 显示产品Logo
- 显示版本号
- 加载进度条

**特效**:
- **呼吸光环**: 持续脉动的紫色光晕
- **Logo**: 渐变方形图标
- **产品名**: 渐变色标题
- **进度条**: 细条形闪光动画

**自动跳转**: 加载完成后进入编辑器主界面

---

### 6. Editor（编辑器主界面）
**路径**: `/editor`

最终目标页面（全屏编辑器界面）

## 🎯 交互元素设计

### 按钮
```tsx
// 主按钮（紫粉渐变）
className="bg-gradient-to-r from-purple-600 to-pink-600 
           hover:from-purple-500 hover:to-pink-500
           shadow-lg shadow-purple-500/50 
           hover:shadow-purple-500/70 
           hover:scale-105 
           transition-all duration-300"

// 次要按钮（紫色边框）
className="bg-gray-800/50 border border-purple-500/50 
           text-purple-300 
           hover:bg-purple-900/30 
           hover:border-purple-400"
```

### 复选框
```tsx
className="w-5 h-5 rounded border-2
           bg-gradient-to-br from-purple-600 to-pink-600 // 选中
           border-purple-500 shadow-lg shadow-purple-500/50 // 选中
           bg-gray-800/50 border-purple-500/50 // 未选中"
```

### 输入框
```tsx
className="bg-gray-800/50 border-purple-500/30 
           text-gray-200 
           focus:border-purple-500 
           focus:ring-purple-500/50"
```

### 进度条
```tsx
// 外层容器
className="bg-gray-900/80 rounded-lg border border-purple-500/30"

// 填充条
className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"

// 光效层
animate={{ x: ['-100%', '200%'] }}
```

## ✨ 动画效果清单

### 入场动画
- 图片: `scale: 1.1 → 1`, `opacity: 0 → 1`
- 底部操作区: `y: 50 → 0`, `opacity: 0 → 1`
- 延迟: 0.3s - 0.8s

### 持续动画
- 按钮闪光: 3s 循环
- 进度条光波: 1.5s 循环
- 粒子漂浮: 3-5s 随机循环
- 呼吸光环: 3s 循环

### 交互动画
- 勾选框: 弹性缩放
- 按钮: 缩放 + 阴影加强
- 成功图标: 旋转 + 缩放 + 路径绘制

## 🖼️ 图片资源

所有页面图片均使用 `ImageWithFallback` 组件，支持替换：

```tsx
<ImageWithFallback
  src="你的图片URL"
  alt="描述"
  className="w-full h-full object-cover"
/>
```

### 推荐图片尺寸
- Welcome: 920 × 360 (16:9)
- InstallPath: 920 × 360
- Installing: 920 × 360
- Complete: 920 × 360
- Splash: 920 × 360

### 图片风格建议
- 编程/代码界面
- 科技感/未来感
- 紫色/霓虹色调
- 游戏化元素

## 🔒 导航保护

使用 `sessionStorage` 实现页面访问控制：

```typescript
// 授权访问
sessionStorage.setItem("pageAccessAllowed", "true");

// 检查权限
const hasAccess = sessionStorage.getItem("pageAccessAllowed");

// 清除权限（每个页面消费一次）
sessionStorage.removeItem("pageAccessAllowed");
```

### 流程保护
- 直接访问中间页面会重定向到首页
- 刷新页面会回到首页
- 必须按顺序完成流程

## 📱 响应式设计

当前设计为**固定窗口尺寸**（920×580px），居中显示在屏幕中央。

如需支持不同屏幕尺寸，可以调整：
```tsx
className="w-[920px] h-[580px]" // 固定尺寸
// 改为
className="max-w-[920px] w-full aspect-[920/580]" // 自适应
```

## 🛠️ 技术栈

- **React Router**: 页面路由
- **Motion (Framer Motion)**: 动画库
- **Tailwind CSS v4**: 样式框架
- **ImageWithFallback**: 图片组件

## 📝 自定义建议

### 替换Logo
在 `Splash.tsx` 中替换 Logo SVG 或使用图片：
```tsx
<img src="/your-logo.png" className="w-20 h-20" />
```

### 修改主题色
在各组件中全局替换：
- `purple-600` → 你的主色
- `pink-600` → 你的辅助色

### 调整动画速度
修改 `transition.duration` 参数：
```tsx
transition={{ duration: 0.6 }} // 更快/更慢
```

### 添加音效
在关键节点添加音效：
```typescript
const audio = new Audio('/sounds/click.mp3');
audio.play();
```

## 🎉 完成状态

✅ 所有页面UI已完成  
✅ 黑紫游戏化主题  
✅ 全屏图片展示  
✅ 动态特效和动画  
✅ 导航流程保护  
✅ 用户协议弹窗  
✅ 自定义安装路径  
✅ 进度条动画  
✅ 成功页面特效  
✅ 版本信息加载页  

---

**设计师**: AI Assistant  
**最后更新**: 2024-03-22  
**版本**: v1.0
