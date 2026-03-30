const markdownContainer = document.getElementById("markdownDocument");
const source = markdownContainer?.dataset.markdownSource;
const fallbackMessage = markdownContainer?.dataset.markdownError || "加载失败了，请稍后刷新重试。";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inCodeBlock = false;
  let codeLines = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  const closeCodeBlock = () => {
    if (inCodeBlock) {
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      inCodeBlock = false;
      codeLines = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      closeList();
      if (inCodeBlock) {
        closeCodeBlock();
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (/^###\s+/.test(line)) {
      closeList();
      html.push(`<h3>${renderInline(line.replace(/^###\s+/, ""))}</h3>`);
      continue;
    }

    if (/^##\s+/.test(line)) {
      closeList();
      html.push(`<h2>${renderInline(line.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }

    if (/^#\s+/.test(line)) {
      closeList();
      html.push(`<h1>${renderInline(line.replace(/^#\s+/, ""))}</h1>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(line)}</p>`);
  }

  closeList();
  closeCodeBlock();
  return html.join("\n");
}

if (!markdownContainer || !source) {
  throw new Error("缺少 markdown 容器或数据源配置");
}

fetch(source)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`无法读取 ${source}`);
    }
    return response.text();
  })
  .then((markdown) => {
    markdownContainer.innerHTML = renderMarkdown(markdown);
  })
  .catch(() => {
    markdownContainer.innerHTML = `<p>${fallbackMessage}</p>`;
  });
