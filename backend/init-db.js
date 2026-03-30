const { ensureDatabase, dbPath } = require('./database');

const db = ensureDatabase();
db.close();

console.log(`数据库已准备完成：${dbPath}`);
console.log('下一步运行：npm run dev');
