const managementMessage = document.getElementById('managementMessage');
const resourceForm = document.getElementById('resourceForm');
const resourceList = document.getElementById('resourceList');
const todayInput = document.getElementById('updatedAt');

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
    return `<span class="resource-link resource-link--pending">${label}：未填写</span>`;
  }

  const suffix = code ? `（提取信息：${escapeHtml(code)}）` : '';
  return `<a class="resource-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label}${suffix}</a>`;
}

function setMessage(text, isSuccess) {
  managementMessage.textContent = text;
  managementMessage.classList.toggle('private-message--success', Boolean(isSuccess));
}

function createToday() {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-');
}

todayInput.value = createToday();

async function loadAllResources() {
  if (window.location.protocol === 'file:') {
    setMessage('请不要直接双击 manage.html。先运行 npm run dev，再访问 http://127.0.0.1:3000/manage.html。', false);
    return;
  }

  try {
    const response = await fetch('/api/resources?visibility=all');
    if (!response.ok) {
      throw new Error('接口请求失败');
    }

    const result = await response.json();
    const resources = result.data || [];

    if (!resources.length) {
      resourceList.innerHTML = '<p class="resource-empty">数据库里还没有任何资料，先用上面的表单添加第一条吧。</p>';
      return;
    }

    resourceList.innerHTML = resources.map((resource) => `
      <article class="resource-item management-item">
        <div>
          <p class="resource-item__category">${escapeHtml(resource.visibility === 'public' ? '公开资料' : '私人资料')} / ${escapeHtml(resource.category)}</p>
          <h3>${escapeHtml(resource.title)}</h3>
          <p>${escapeHtml(resource.description)}</p>
          <p class="resource-meta">更新时间：${escapeHtml(resource.updated_at)}</p>
        </div>
        <div class="resource-links">
          ${renderLink('阿里云盘', resource.aliyun_url, resource.aliyun_code)}
          ${renderLink('百度网盘', resource.baidu_url, resource.baidu_code)}
          <button class="button button--soft management-delete" type="button" data-id="${resource.id}">删除这条资料</button>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('.management-delete').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id');
        const confirmed = window.confirm('确定要删除这条资料吗？');
        if (!confirmed) {
          return;
        }

        const response = await fetch(`/api/resources/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        setMessage(result.message || '删除完成', response.ok);
        await loadAllResources();
      });
    });
  } catch (error) {
    setMessage('还没有连上本地后端，请先运行 npm run dev。', false);
  }
}

resourceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    category: document.getElementById('category').value.trim(),
    visibility: document.getElementById('visibility').value,
    aliyun_url: document.getElementById('aliyunUrl').value.trim(),
    aliyun_code: document.getElementById('aliyunCode').value.trim(),
    baidu_url: document.getElementById('baiduUrl').value.trim(),
    baidu_code: document.getElementById('baiduCode').value.trim(),
    updated_at: document.getElementById('updatedAt').value.trim()
  };

  try {
    const response = await fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    setMessage(result.message || (response.ok ? '资料已成功写入数据库。' : '保存失败。'), response.ok);

    if (response.ok) {
      resourceForm.reset();
      todayInput.value = createToday();
      await loadAllResources();
    }
  } catch (error) {
    setMessage('保存失败，请先确认本地后端已经启动。', false);
  }
});

loadAllResources();
