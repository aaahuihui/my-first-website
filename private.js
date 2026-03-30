const PASSWORD_HASH = '16023df26ed384352d6820bc638c686ac3ef71424a51ca3f0941a96d7c948332';
const form = document.getElementById('privateForm');
const passwordInput = document.getElementById('privatePassword');
const message = document.getElementById('privateMessage');
const panel = document.getElementById('privatePanel');
const apiStatus = document.getElementById('privateApiStatus');
const databaseList = document.getElementById('privateDatabaseList');

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
    databaseList.innerHTML = '<p class="resource-empty">数据库里还没有私人资料。你可以先去本地管理页添加，再回来查看。</p>';
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

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((item) => item.toString(16).padStart(2, '0')).join('');
}

async function loadPrivateResources() {
  if (window.location.protocol === 'file:') {
    apiStatus.textContent = '当前是直接打开的静态文件，数据库功能不会生效。请先运行 npm run dev，再访问 http://127.0.0.1:3000/private.html。';
    return;
  }

  try {
    const response = await fetch('/api/resources?visibility=private');
    if (!response.ok) {
      throw new Error('接口请求失败');
    }

    const result = await response.json();
    apiStatus.textContent = '数据库连接成功：下面是后端自动加载的私人资料列表。';
    renderResources(result.data || []);
  } catch (error) {
    apiStatus.textContent = '暂时还连不上本地后端。请先运行 npm run dev，然后刷新本页。';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim();
  const passwordHash = await sha256(password);

  if (passwordHash === PASSWORD_HASH) {
    panel.classList.remove('private-panel--hidden');
    message.textContent = '当前状态：密码正确，私人资料已解锁';
    message.classList.add('private-message--success');
    passwordInput.value = '';
    await loadPrivateResources();
    return;
  }

  panel.classList.add('private-panel--hidden');
  message.textContent = '当前状态：密码不正确，请重新输入';
  message.classList.remove('private-message--success');
});
