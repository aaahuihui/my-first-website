# 网页仓库构建记录

这份文档用于记录我作为新手，是如何一步一步搭建自己的第一个静态网页仓库的。

## 项目目标

- 先做一个最简单的静态网页仓库
- 学会 Git 和上传到 GitHub 或 Gitee
- 学会发布到 GitHub Pages 或 Vercel
- 第一版上线后，再考虑框架和后端

## 本次协作约定

- 以后如果需要安装软件，优先避开 `C 盘`
- 如果某一步可能写入 `C 盘`，要先确认再继续
- 当前用户已明确说明：`C 盘空间已满，不希望继续往 C 盘安装东西`

我学到的点：
- 开发环境不仅要能用，还要考虑磁盘空间和安装位置
- 提前约定安装策略，可以减少后续返工和系统空间风险

## 第 1 阶段：创建最简单的静态网页仓库

### Step 1：确定不要和原有后端项目混在一起

我当前所在目录是 `E:\Project\houDuan`，里面已经有 Python 文件、数据库和上传目录，说明它不是一个纯静态网页项目。

我学到的点：
- 一个文件夹最好只做一类项目
- 新手练习网页时，单独新建一个文件夹会更清晰
- 这样后续上传 GitHub 时也不会把无关文件一起传上去

### Step 2：新建网页项目文件夹

我新建了一个文件夹：`E:\Project\houDuan\my-first-website`

我学到的点：
- 这个文件夹以后就是我的网页仓库根目录
- 仓库里的所有网页文件，都会放在这个目录下

### Step 3：创建最基础的静态网页文件

当前项目里已经有这些文件：
- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `.gitignore`
- `BUILD-LOG.md`

我学到的点：
- `index.html` 负责网页结构
- `style.css` 负责网页样式
- `script.js` 负责网页交互
- `README.md` 用来写项目说明
- `.gitignore` 用来忽略不需要提交的文件
- `BUILD-LOG.md` 用来记录整个学习和搭建过程

### Step 4：完成第一版页面骨架

第一版网页已经具备：
- 一个标题
- 一段介绍文字
- 一个跳转 GitHub 的按钮
- 一个可点击的交互按钮
- 一套基础样式

我学到的点：
- 静态网页不需要后端也可以先做出来
- 只靠 HTML、CSS、JavaScript 就能完成第一版页面

### Step 5：查看网页效果

要做的操作：
- 双击 `index.html`
- 或者用浏览器打开 `E:\Project\houDuan\my-first-website\index.html`

我学到的点：
- 本地网页可以先脱离服务器直接查看
- 这是检查页面结构、文字和样式是否正常的第一步

当前状态：
- 网页文件已创建完成
- 本地预览页已打开，方便检查页面效果

## 第 2 阶段：准备安装 Git

### Step 6：检查电脑里是否已经有 Git

目前检查结果：
- `git` 命令最开始不可用
- `winget` 不可用
- `choco` 不可用
- 常见安装路径下也没有发现 Git

我学到的点：
- Git 是版本管理工具
- 没有 Git，就不能方便地提交历史版本，也不能把代码推送到 GitHub
- 如果系统没有包管理工具，新手最稳妥的方式就是使用官方安装包

### Step 7：安装 Git 的推荐路线

推荐做法：
- 打开 Git 官方下载页：`https://git-scm.com/download/win`
- 下载 Git for Windows 安装包
- 安装过程中大部分选项保持默认即可
- 安装完成后重新打开终端

补充约定：
- 安装类操作优先避开 `C 盘`
- 如果安装器默认写入 `C 盘`，后续需要先确认安装路径

我学到的点：
- 对新手来说，先用默认安装选项最稳，但也要结合电脑空间情况调整安装位置
- 安装完成后一定要重新打开终端，否则环境变量可能不会立即生效

### Step 8：验证 Git 是否安装成功

安装完成后，在终端执行：

```powershell
git --version
```

本次实际结果：
- `git version 2.53.0.windows.2`

成功标志：
- 屏幕出现 Git 版本号，例如 `git version x.x.x.windows.x`

我学到的点：
- 先验证工具是否安装成功，再进入下一步
- 这是一个非常重要的排错习惯
- 只要终端能正确返回版本号，就说明 Git 已经安装成功并可用

## 第 3 阶段：准备上传到 GitHub

### Step 9：确认 Git 安装路径

在终端执行：

```powershell
where git
```

本次实际结果：
- `E:\Git\cmd\git.exe`

我学到的点：
- 可以用 `where git` 查看系统实际调用的是哪个 Git
- 这一步能帮助我确认 Git 装在什么位置，也能确认它没有安装到 `C 盘`

### Step 10：检查 Git 用户身份是否已配置

在终端执行：

```powershell
git config --global --get user.name
git config --global --get user.email
```

本次实际结果：
- `user.name` 为空
- `user.email` 为空

我学到的点：
- Git 提交代码前，通常要先配置用户名和邮箱
- 这两个信息会写进每次提交记录里
- 如果没有先配置，后面第一次提交时通常会被要求补上

### Step 11：接下来要做的事

下一步要继续完成：
- 设置 Git 用户名
- 设置 Git 邮箱
- 初始化本地仓库
- 查看仓库状态
- 创建第一次提交

## 当前状态

我已经完成了：
1. 搭建最基础的静态网页骨架
2. 建立完整的学习记录文档
3. 安装 Git 并确认安装位置在 `E 盘`
4. 检查出 Git 用户名和邮箱还没有配置

我现在距离上传 GitHub 还差的关键一步是：先设置 Git 身份信息。

### Step 12：设置 Git 全局用户名

执行命令：

```powershell
git config --global user.name "Li_Yinhui"
```

本次实际设置值：
- `Li_Yinhui`

我学到的点：
- `user.name` 会进入每一次 Git 提交记录
- 这里一般填写自己想显示的名字

### Step 13：设置 Git 全局邮箱

执行命令：

```powershell
git config --global user.email "li_yinhui@mail.ustc.edu.cn"
```

本次实际设置值：
- `li_yinhui@mail.ustc.edu.cn`

我学到的点：
- `user.email` 也会写进提交记录
- 以后在 GitHub 上，这个邮箱还可能用于关联提交身份

### Step 14：初始化本地 Git 仓库

执行命令：

```powershell
git init -b main
```

本次实际结果：
- 在 `E:\Project\houDuan\my-first-website` 中创建了 `.git` 目录
- 默认分支名为 `main`

我学到的点：
- `git init` 的作用是让一个普通文件夹变成 Git 仓库
- 从这一步开始，Git 才能跟踪这个项目的变化
- `main` 是当前常见的默认主分支名称

### Step 15：处理 safe.directory 提示

执行过程中遇到提示：
- Git 认为当前仓库的拥有者和当前 Windows 用户不一致
- 因此需要把这个目录加入 `safe.directory`

执行命令：

```powershell
git config --global --add safe.directory "E:/Project/houDuan/my-first-website"
```

我学到的点：
- 这是 Git 的安全保护机制之一
- 它不是报错修不好，而是在要求我明确标记“这个仓库是可信的”
- 只要是我自己确认安全的项目目录，就可以加入白名单

### Step 16：查看仓库当前状态

执行命令：

```powershell
git status --short --branch
```

本次实际结果：
- `## No commits yet on main`
- 文件前面显示 `??`，表示这些文件还没有被 Git 跟踪

我学到的点：
- `git status` 是最常用的 Git 检查命令之一
- `??` 表示未跟踪文件
- 提交前先看状态，是一个很重要的习惯

### Step 17：把文件加入暂存区

执行命令：

```powershell
git add .
```

本次实际结果：
- 当前网页项目中的所有文件都被加入暂存区

执行时出现提示：
- `LF will be replaced by CRLF`

我学到的点：
- `git add .` 会把当前目录下的改动加入暂存区
- Windows 中出现换行符提示很常见，一般不是错误
- 暂存区可以理解为“准备提交的清单”

### Step 18：创建第一次提交

执行命令：

```powershell
git commit -m "Initial commit"
```

本次实际结果：
- 成功创建第一次提交
- 提交编号：`43b7e1a`
- 提交说明：`Initial commit`

我学到的点：
- `commit` 是把当前暂存区内容正式保存为一个历史版本
- `-m` 后面的文字是这次提交的说明
- 从这一步开始，我的项目已经有了第一个可回退、可追踪的版本

### Step 19：确认第一次提交后的状态

检查结果：
- 当前分支：`main`
- 当前工作区是干净的，没有未提交改动

我学到的点：
- 如果 `git status` 显示干净，说明当前改动都已经被记录好了
- 这是判断“这一小步是否真正完成”的一个重要信号

## 当前状态更新

我现在已经完成了：
1. 创建静态网页项目骨架
2. 安装 Git，并确认安装在 `E 盘`
3. 配置 Git 用户名和邮箱
4. 初始化本地仓库
5. 完成第一次本地提交

下一步要进入的是：
1. 注册或登录 GitHub
2. 新建远程仓库 `my-first-website`
3. 把本地仓库连接到 GitHub
4. 执行第一次 `git push`

### Step 20：准备连接 GitHub 远程仓库

我提供的 GitHub 页面地址是：
- `https://github.com/aaahuihui/my-first-website/tree/main`

需要注意：
- 这个地址是仓库网页里的分支页面地址
- 真正给 Git 使用的远程仓库地址，通常写成：
- `https://github.com/aaahuihui/my-first-website.git`

我学到的点：
- GitHub 页面地址和 Git 远程仓库地址不是完全一样
- 给 `git remote add origin` 用的，一般是以 `.git` 结尾的仓库地址

### Step 21：第一次 push 遇到远程拒绝

执行命令：

```powershell
git push -u origin main
```

本次实际结果：
- 推送被拒绝
- 原因提示：`main -> main (fetch first)`
- Git 提示远程仓库里已经有本地没有的内容

我学到的点：
- 如果远程仓库已经有提交，本地不能无脑直接推送
- 这时候要先查看远程仓库里到底多了什么，再决定是合并还是其他处理方式
- 这不是项目坏了，而是 Git 在保护提交历史

### Step 22：检查远程仓库为什么不能直接 push

在第一次 push 被拒绝后，继续检查远程仓库内容。

检查结果：
- 远程 `origin/main` 已经存在提交历史
- 远程历史中有两次提交：
  - `3ba1247 Initial commit`
  - `01888b4 Delete README.md`
- 当前远程分支虽然文件树是空的，但历史不是空的

我学到的点：
- Git 判断“能不能直接 push”时，看的是提交历史，不只是当前有没有文件
- 即使远程现在看起来是空仓库，只要它有过提交，本地第一次 push 也可能被拒绝

### Step 23：合并远程历史

执行命令：

```powershell
git merge origin/main --allow-unrelated-histories -m "Merge remote main before first push"
```

本次实际结果：
- 合并成功
- 没有出现文件冲突

我学到的点：
- `--allow-unrelated-histories` 用于处理“本地和远程各自都有独立历史”的情况
- 这一步的目的不是覆盖谁，而是把两边历史安全接起来
- 比起强制覆盖，合并历史更稳妥，也更适合学习 Git 的正常流程

### Step 24：第一次成功 push 到 GitHub

再次执行命令：

```powershell
git push -u origin main
```

本次实际结果：
- 推送成功
- `branch 'main' set up to track 'origin/main'`
- 最新推送后的提交节点：`69ec6bb`

我学到的点：
- `-u origin main` 的作用是把本地 `main` 和远程 `origin/main` 建立跟踪关系
- 建好跟踪关系后，以后再 push、pull 会更方便
- 到这一步为止，我的本地网页仓库已经成功上传到了 GitHub

## 当前状态更新

我现在已经完成了：
1. 创建静态网页项目骨架
2. 安装 Git，并确认安装在 `E 盘`
3. 配置 Git 用户名和邮箱
4. 初始化本地仓库
5. 完成第一次本地提交
6. 连接 GitHub 远程仓库
7. 处理远程已有历史的问题
8. 成功把本地仓库推送到 GitHub

下一步要进入的是：
1. 检查 GitHub 仓库页面是否能看到本地文件
2. 开启 GitHub Pages
3. 等待网页生成公开访问链接
4. 验证网页是否上线成功
