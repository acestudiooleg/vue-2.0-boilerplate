const writer = require('./writer');

const [,, type, name] = process.argv;

const allowed = ['components', 'layouts', 'mixin', 'pages', 'routes', 'services', 'store', 'transformers'];

if (allowed.indexOf(type) !== -1) {
  const tpl = require(`./${type}`)(name);
  writer(type, name, tpl);
} else {
  console.log('Error: type is unknown');
}
