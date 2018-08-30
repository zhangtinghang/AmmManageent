# 基于VUE的后台管理系统

> 这是一个简单的管理后台系统，内部使用，使用vue-element-templete模版改造。

项目模版：
[vue-element-templete](https://github.com/PanJiaChen/vue-admin-template)

模块参考：
[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 相关项目
[服务器地址(node.js)](https://github.com/zhangtinghang/AmmAdmin)

[前端展示地址](https://github.com/zhangtinghang/Amm)

## 开发

```bash
# 克隆项目
git clone git@github.com:zhangtinghang/AmmManageent.git

# 安装依赖
npm install

# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建正式环境
npm run build

```
## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限

- 全局功能
  - 国际化多语言
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Screenfull全屏
  - 自适应收缩侧边栏

- 完成功能
  - 登录注册的权限认证
  - 动态路由侧边栏
  - 图片上传
  - 展示数据
  - 基础数据管理

```

Copyright (c) 2017
