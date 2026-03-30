# My First Website

这是一个正在持续完善中的个人主页项目，也是我从 0 开始学习网页开发、Git、GitHub Pages 和最小后端数据库的实践仓库。

## 当前页面

- `index.html`：主页
- `process.html`：建站过程记录页
- `project-website.html`：第一个网页仓库项目介绍页
- `roadmap.html`：未来计划页
- `downloads.html`：资料下载中心页
- `private.html`：私人资料入口页（静态网站阶段的密码入口）
- `manage.html`：本地资料管理页（通过后端维护资料列表）

## 后端与数据库文件

- `backend/server.js`：本地后端服务，负责提供 API 和静态页面
- `backend/database.js`：SQLite 数据库读写逻辑
- `backend/init-db.js`：初始化数据库脚本
- `backend/data/resources.db`：本地数据库文件，运行后自动生成，不提交到 Git
- `package.json`：本地后端运行脚本

## 重要记录文件

- `BUILD-LOG.md`：记录全过程
- `HANDOFF.md`：记录当前进度、下次待办和每次继续开发前应先看什么
- `CLOUD-STORAGE-PLAN.md`：记录阿里云盘主用、百度网盘备用的文件分类方案
- `ERROR-LOG.md`：记录遇到的错误、原因、修正方法和最终结果
- `BACKEND-LEARNING-LOG.md`：后端学习手册，单独记录后端设计、流程、命令、问题和收获
- `BACKEND-INTERVIEW-NOTES.md`：后端项目的面试表达记录

## 如何查看

1. 只看静态网页：直接双击 `index.html`
2. 体验后端数据库版：
   - 在项目目录运行 `npm run dev`
   - 然后访问 `http://127.0.0.1:3000/index.html`
3. 本地资料管理页：`http://127.0.0.1:3000/manage.html`

## 当前资料存储原则

- 网站仓库主要保存网页代码、说明和下载入口
- 大文件如压缩包、PDF、PPT 等建议长期保存在阿里云盘中，百度网盘可作为备用分享渠道
- 后端数据库保存资料标题、说明、分类、链接、提取信息和更新时间
- `private.html` 适合做静态网站阶段的第一层密码入口，真正的私人文件仍建议继续放在云盘里，并使用分享密码或提取码保护

## 当前运行方式

- 初始化数据库：`npm run init-db`
- 启动本地后端：`npm run dev`
- 公开资料页会自动读取 `public` 资料
- 私人资料页在输入密码后会自动读取 `private` 资料
- 新资料推荐通过 `manage.html` 维护，而不是直接手改网页

## 协作约定

- 持续记录 `BUILD-LOG.md`
- 重要阶段维护 `README.md`
- 保留 `HANDOFF.md` 方便以后追溯和继续开发
- 遇到重要错误时，继续维护 `ERROR-LOG.md`
- 后端相关内容单独维护 `BACKEND-LEARNING-LOG.md`
- 后端项目面试表达持续维护 `BACKEND-INTERVIEW-NOTES.md`
- 每完成一小步尽量做一次 Git 提交
- 每个阶段完成后继续推送 GitHub
- 不到万不得已，不往 `C 盘` 安装软件
