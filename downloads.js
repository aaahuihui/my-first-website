const apiStatus = document.getElementById('downloadsApiStatus');
const databaseList = document.getElementById('downloadsDatabaseList');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLink(label, url, code) {
  if (!url) {
    return `<span class="resource-link resource-link--pending">${label}：待接入</span>`;
  }

  const suffix = code ? `（提取信息：${escapeHtml(code)}）` : '';
  return `<a class="resource-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label}${suffix}</a>`;
}

function renderResources(resources) {
  if (!resources.length) {
    databaseList.innerHTML = '<p class="resource-empty">数据库里还没有公开资料。你可以先打开本地管理页添加第一条资料。</p>';
    return;
  }

  databaseList.innerHTML = resources.map((resource) => `
    <article class="resource-item">
      <div>
        <p class="resource-item__category">${escapeHtml(resource.category)}</p>
        <h3>${escapeHtml(resource.title)}</h3>
        <p>${escapeHtml(resource.description)}</p>
        <p class="resource-meta">更新时间：${escapeHtml(resource.updated_at)}</p>
      </div>
      <div class="resource-links">
        ${renderLink('阿里云盘', resource.aliyun_url, resource.aliyun_code)}
        ${renderLink('百度网盘', resource.baidu_url, resource.baidu_code)}
      </div>
    </article>
  `).join('');
}

async function loadResources() {
  if (window.location.protocol === 'file:') {
    apiStatus.textContent = '当前是直接打开的静态文件，数据库功能不会生效。请先运行 npm run dev，再访问 http://127.0.0.1:3000/downloads.html。';
    return;
  }

  try {
    const response = await fetch('/api/resources?visibility=public');
    if (!response.ok) {
      throw new Error('接口请求失败');
    }

    const result = await response.json();
    apiStatus.textContent = '数据库连接成功：下面是后端自动加载的公开资料列表。';
    renderResources(result.data || []);
  } catch (error) {
    apiStatus.textContent = '暂时还连不上本地后端。请先运行 npm run dev，然后刷新本页。';
  }
}

loadResources();
