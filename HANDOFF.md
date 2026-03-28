# 项目交接说明

这个文件用来记录当前网站已经做到哪里、下次适合继续做什么，以及以后每次继续开发前应该先看哪些内容。

## 现在做到哪了

当前网站已经完成这些内容：
- 个人主页首页已经搭建完成
- 已加入姓名、专业、年级、技能、研究方向、教育经历/时间线、联系方式、作品展示
- GitHub Pages 已经成功发布上线
- “建站过程记录” 已经可以点击进入详情页
- “我的第一个网页仓库” 已经有项目介绍页
- “更多作品正在准备中” 已经有未来计划页
- BUILD-LOG.md 持续记录了整个搭建过程
- 所有主要步骤都已经做过 Git 提交并推送到了 GitHub

当前线上地址：
- 主页：`https://aaahuihui.github.io/my-first-website/`
- 建站过程记录页：`https://aaahuihui.github.io/my-first-website/process.html`
- 项目介绍页：`https://aaahuihui.github.io/my-first-website/project-website.html`
- 未来计划页：`https://aaahuihui.github.io/my-first-website/roadmap.html`

## 下次要做什么

下次最推荐继续做的内容：
1. 增加技能熟练度模块
2. 继续细化教育经历，补充年份、本科院校或阶段信息
3. 给研究方向加入更具体的内容，比如课程、项目或阅读方向
4. 给作品区继续增加新的项目卡片
5. 有头像之后，把现在的文字身份卡替换成真实头像
6. 继续完善 README.md，让项目简介更贴近当前真实网站状态

## 当前网站有哪些页面

当前项目中已经有这些网页页面：
- `index.html`：主页
- `process.html`：建站过程记录页
- `project-website.html`：第一个网页仓库项目介绍页
- `roadmap.html`：未来计划页

当前项目中的核心记录与配置文件：
- `BUILD-LOG.md`：全过程记录
- `README.md`：项目简介
- `HANDOFF.md`：交接说明
- `style.css`：样式文件
- `script.js`：主页交互脚本
- `process.js`：过程记录页脚本

## 我以后每次来都该先看什么

每次继续开发前，建议按这个顺序先看：
1. `HANDOFF.md`
作用：快速知道当前做到哪了、下次适合做什么

2. `BUILD-LOG.md`
作用：回顾整个过程、知道之前做过哪些修改和为什么这么做

3. `README.md`
作用：看项目简介是否需要同步更新

4. `git log --oneline --decorate -n 10`
作用：快速复习最近几次提交做了什么

5. 再看具体页面文件
通常优先看：
- `index.html`
- `style.css`
- `script.js`
- 如果要改详情页，再看对应的 html 文件

## 和 AI 协作时的建议说法

以后如果继续找我做网站，可以直接这样说：

```text
先看 HANDOFF.md、BUILD-LOG.md、README.md 和 git log，再继续做下面的内容。
```

如果你想让我继续保持现在这套可追溯方式，也可以补一句：

```text
继续保持 BUILD-LOG.md、README.md、Git 提交和 GitHub 推送。
```

## 当前重要约定

- 持续保留：`BUILD-LOG.md`
- 持续保留：`README.md`
- 持续保留：`HANDOFF.md`
- 每完成一小步尽量做一次 Git 提交
- 每个阶段完成后继续推送 GitHub
- 不到万不得已，不要往 `C 盘` 安装软件
