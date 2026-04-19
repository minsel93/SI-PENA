const fs = require('fs');
const content = fs.readFileSync('gas/Script.html', 'utf8');
const scriptContent = content.match(/<script>([\s\S]*?)<\/script>/)[1];
try {
  require('vm').Script(scriptContent);
  console.log('Syntax OK');
} catch (e) {
  console.error('Syntax Error:', e);
}
