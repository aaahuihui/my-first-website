const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const { ensureDatabase, listResources, addResource, deleteResource } = require('./database');

const host = '127.0.0.1';
const port = 3000;
const rootDir = path.join(__dirname, '..');

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  response.end(text);
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let raw = '';

    request.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error('请求体过大'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('请求体不是合法 JSON'));
      }
    });

    request.on('error', reject);
  });
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
  };

  return contentTypes[extension] || 'application/octet-stream';
}

function serveStatic(requestUrl, response) {
  const pathname = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const filePath = path.join(rootDir, decodeURIComponent(pathname));
  const normalized = path.normalize(filePath);

  if (!normalized.startsWith(rootDir)) {
    sendText(response, 403, '禁止访问');
    return;
  }

  fs.readFile(normalized, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        sendText(response, 404, '页面不存在');
        return;
      }

      sendText(response, 500, '读取文件失败');
      return;
    }

    response.writeHead(200, {
      'Content-Type': getContentType(normalized)
    });
    response.end(content);
  });
}

function validateResource(payload) {
  const title = String(payload.title || '').trim();
  const description = String(payload.description || '').trim();
  const category = String(payload.category || '').trim();
  const visibility = String(payload.visibility || '').trim();
  const updatedAt = String(payload.updated_at || '').trim();

  if (!title || !description || !category || !updatedAt) {
    return '标题、说明、分类、更新时间不能为空';
  }

  if (!['public', 'private'].includes(visibility)) {
    return '可见性只能是 public 或 private';
  }

  return null;
}

ensureDatabase().close();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (requestUrl.pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, {
      success: true,
      message: 'backend-ready'
    });
    return;
  }

  if (requestUrl.pathname === '/api/resources' && request.method === 'GET') {
    const visibility = requestUrl.searchParams.get('visibility') || 'all';
    const data = listResources(visibility);
    sendJson(response, 200, {
      success: true,
      data
    });
    return;
  }

  if (requestUrl.pathname === '/api/resources' && request.method === 'POST') {
    try {
      const payload = await parseRequestBody(request);
      const validationError = validateResource(payload);

      if (validationError) {
        sendJson(response, 400, {
          success: false,
          message: validationError
        });
        return;
      }

      const inserted = addResource(payload);
      sendJson(response, 201, {
        success: true,
        data: inserted
      });
    } catch (error) {
      sendJson(response, 400, {
        success: false,
        message: error.message
      });
    }
    return;
  }

  if (requestUrl.pathname.startsWith('/api/resources/') && request.method === 'DELETE') {
    const id = Number(requestUrl.pathname.split('/').pop());

    if (!Number.isInteger(id) || id <= 0) {
      sendJson(response, 400, {
        success: false,
        message: '无效的资源 id'
      });
      return;
    }

    const removed = deleteResource(id);
    sendJson(response, removed ? 200 : 404, {
      success: removed,
      message: removed ? '删除成功' : '没有找到对应资料'
    });
    return;
  }

  serveStatic(requestUrl, response);
});

server.listen(port, host, () => {
  console.log(`本地后端已启动：http://${host}:${port}`);
  console.log(`主页地址：http://${host}:${port}/index.html`);
  console.log(`资料管理页：http://${host}:${port}/manage.html`);
});
