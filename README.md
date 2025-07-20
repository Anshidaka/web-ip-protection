# Web IP Protection 展示网站

这是一个用于展示"防护网站知识产权免受大语言模型未经授权检索"研究成果的现代化网站。

## 📋 项目概述

本网站展示了我们在保护网站知识产权方面的研究成果，通过利用LLM自身的语义理解能力，帮助网站内容创作者保护其基于网站的知识产权免受LLM的未经授权实时提取和重新分发。

## 🌟 主要功能

### 1. 研究论文展示
- **ArXiv链接**: 直接导航到论文页面 (https://arxiv.org/abs/2505.12655)
- **论文信息**: 完整的作者列表、摘要和关键指标
- **PDF下载**: 直接下载论文PDF文件

### 2. 视频演示区域
- 支持上传本地视频文件
- 兼容 YouTube、Vimeo 等在线视频平台
- 响应式视频播放器

### 3. LLM保护效果测试
- **多LLM支持**: GPT-4o、Gemini、Qwen3
- **预设测试问题**: 
  - 网站内容总结
  - 产品服务查询
  - 联系方式提取
  - 技术架构分析
- **实时对话**: 模拟真实LLM与受保护网站的交互
- **保护效果演示**: 展示防护技术如何阻止未授权信息提取

### 4. 受保护示例网页展示
展示15个已应用防护技术的网站示例：
- AddLife (生活方式和健康)
- Agile (敏捷开发和项目管理)
- Aroma (香氛和精油产品)
- Avenger (娱乐和游戏内容)
- B-School (商学院和教育)
- 3-Col Lab (科研实验室)
- Education (在线教育平台)
- AeroSky (航空和旅行服务)
- Photograph (摄影作品展示)
- Car Care (汽车护理服务)
- Creative UI (创意设计和UI)
- Portal (企业门户网站)
- Photo Art (艺术摄影作品)
- Smart App (智能应用开发)
- Portfolio (个人作品集展示)

## 🎯 核心研究成果

- **防护成功率提升**: 从2.5%提升至88.6%
- **发布时间**: 2025年5月
- **技术创新**: 利用LLM语义理解能力进行自我保护

## 🚀 技术特性

### 前端技术
- **HTML5**: 语义化标签，良好的可访问性
- **CSS3**: 现代化设计，响应式布局，动画效果
- **JavaScript ES6+**: 模块化代码，异步处理，交互功能

### 设计特点
- **响应式设计**: 适配桌面、平板、手机等多种设备
- **现代UI**: 渐变背景、卡片布局、动画效果
- **用户体验**: 平滑滚动、打字机效果、涟漪点击效果
- **无障碍设计**: 良好的色彩对比度和键盘导航

### 交互功能
- **平滑导航**: 锚点平滑滚动，活动section高亮
- **动画效果**: 滚动触发动画，数字计数动画
- **文件上传**: 视频文件拖拽上传支持
- **实时聊天**: 模拟LLM对话，打字机效果

## 📁 文件结构

```
web-ip-protection/
├── index.html          # 主页HTML文件
├── styles.css          # 样式文件
├── script.js           # JavaScript交互功能
└── README.md           # 项目说明文档
```

## 🔧 本地运行

### 方法1: 直接打开
直接在浏览器中打开 `index.html` 文件即可。

### 方法2: 本地服务器
```bash
# 进入项目目录
cd web-ip-protection

# 使用Python启动简单HTTP服务器
python3 -m http.server 8000

# 或使用Node.js (需要安装http-server)
npx http-server -p 8000

# 然后在浏览器访问: http://localhost:8000
```

## 🌐 部署

网站是完全静态的，可以部署到任何静态网站托管服务：

- **GitHub Pages**: 推送到GitHub仓库并启用Pages
- **Netlify**: 拖拽文件夹到Netlify部署
- **Vercel**: 连接GitHub仓库自动部署
- **传统Web服务器**: 上传到任何支持静态文件的服务器

## 📱 浏览器兼容性

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🎨 自定义

### 修改颜色主题
在 `styles.css` 中修改CSS变量:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
}
```

### 添加新的示例网站
在 `index.html` 的示例网页section中添加新的卡片。

### 自定义LLM响应
在 `script.js` 的 `simulateLLMResponse` 函数中修改响应逻辑。

## 📄 许可证

© 2025 Web IP Protection Research. All rights reserved.

## 📞 联系信息

如有疑问，请通过论文中的联系方式与我们联系。

---

**注**: 这是一个演示网站，用于展示研究成果。LLM对话功能为模拟实现，用于演示保护效果。 