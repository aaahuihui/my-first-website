# 错误与修正记录

这份文档专门记录开发过程中遇到的错误、定位过程、修正方法和最终结果。

以后每次遇到值得保留的问题，都按下面结构继续追加：

## 记录模板

### Error N：错误标题

- 时间：
- 场景：
- 原始报错：
- 原因定位：
- 修正方法：
- 最终结果：
- 我学到的点：

## 已记录问题

### Error 1：`git push` 能在浏览器打开 GitHub，但终端始终连不上

- 时间：`2026-03-29`
- 场景：
  - 浏览器可以正常打开 `https://github.com`
  - 在仓库目录执行 `git push` 时失败
- 原始报错：
  - `fatal: unable to access 'https://github.com/aaahuihui/my-first-website.git/': Failed to connect to github.com port 443 after 21149 ms: Could not connect to server`
- 原因定位：
  - 浏览器走了本地代理 `127.0.0.1:7897`
  - Git 之前没有使用同一个代理，而是尝试直连 GitHub
  - 终端里对 `github.com:443` 的连接超时，因此 `push` 失败
- 修正方法：
  - 给 Git 配置和浏览器一致的代理：
  - `git config --global http.proxy http://127.0.0.1:7897`
  - `git config --global https.proxy http://127.0.0.1:7897`
  - 然后重新执行：
  - `git push`
- 最终结果：
  - `git push` 成功
  - 本地提交 `27969e3 Add cloud storage plan` 已同步到远程仓库
- 我学到的点：
  - 浏览器能打开 GitHub，不代表 Git 终端也一定能连上
  - 如果浏览器走了代理，而 Git 没走，`push` 和 `pull` 就可能失败
  - 遇到“浏览器能开、Git 不能推”的情况，优先检查代理配置
