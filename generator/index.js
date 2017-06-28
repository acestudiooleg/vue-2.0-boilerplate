const writer = require('./writer');

const [,, type, name] = process.argv;

const allowed = ['component', 'layout', 'mixin', 'page', 'route', 'service', 'module', 'transformer'];
const destinations = ['/components', '/layouts', '/mixins', '/pages', '/routes', '/services', '/store/modules', '/transformers'];

const index = allowed.indexOf(type);

if (index !== -1) {
  const dest = destinations[index];
  const tpl = require(`./${type}`)(name);
  writer(type, name, tpl, dest);
} else {
  console.log('Error: type is unknown');
}

