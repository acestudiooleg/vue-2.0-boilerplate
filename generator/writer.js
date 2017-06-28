const fs = require('fs');

module.exports = (path, name, tpl) => {
  const p = 'src/app'
  const pathFolder = `${p}/${path}/${name}`;
  const pathVue = `${p}/${path}/${name}/index.vue`;
  const pathTpl = `${p}/${path}/${name}/template.html`;
  const pathScript = `${p}/${path}/${name}/script.js`;
  const pathTest = `${p}/${path}/${name}/${name}.spec.js`;


  let isFolder = false;
  let isVue = false;
  let isTpl = false;
  let isScript = false;
  let isTest = false;

  try {
    fs.accessSync(pathFolder);
  } catch (err) {
    isFolder = err.code !== 'ENOENT';
  }


  try {
    fs.accessSync(pathVue);
  } catch (err) {
    isVue = err.code !== 'ENOENT';
  }

  try {
    fs.accessSync(pathTpl);
  } catch (err) {
    isTpl = err.code !== 'ENOENT';
  }

  try {
    fs.accessSync(pathScript);
  } catch (err) {
    isScript = err.code !== 'ENOENT';
  }

  try {
    fs.accessSync(pathTest);
  } catch (err) {
    isTest = err.code !== 'ENOENT';
  }
  if(!isFolder){
    const r = fs.mkdirSync(pathFolder);
    console.log(pathFolder, 'was created');

  }


  if (!isVue) {
    const r = fs.writeFileSync(pathVue, tpl.vue, 'utf-8');
    console.log(pathVue, 'was created');
  }

  if (!isTpl) {
    const r = fs.writeFileSync(pathTpl, tpl.tmpl, 'utf-8');
    console.log(pathTpl, 'was created');
  }

  if (!isScript) {
    const r = fs.writeFileSync(pathScript, tpl.script, 'utf-8');
    console.log(pathScript, 'was created');
  }

  if (!isTest) {
    const r = fs.writeFileSync(pathTest, tpl.test, 'utf-8');
    console.log(pathTest, 'was created');
  }
};
