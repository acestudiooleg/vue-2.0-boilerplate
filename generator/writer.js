const _ = require('lodash');
const PATH = require('path');
const fs = require('./fspromise');

const access = path => fs.access(path);
const mkdir = path => fs.mkdir(path);
const writeFile = (path, data) => fs.writeFile(path, data);

const make = m => (path, data) =>  new Promise((s, f) => {
  access(path)
  .then(() => {
    console.log(path, ' - already exists');
    f();
  })
  .catch(() => {
    m(path, data).then(() => {
      console.log(path, ' - was created');
      s();
    });
  });
});

const makeDir = make(mkdir);
const makeFile = make(writeFile);

const connectFile = (name, path, importPattern, exportPattern) => {
  fs.readFile(path, 'utf-8').then((file) => {
    if (!(new RegExp(`import\\s+${name}`, 'g').test(file))) {
      const newFile = file.replace(importPattern.target, importPattern.value)
        .replace(exportPattern.target, exportPattern.value);
      fs.writeFile(path, newFile);
    }
  });
};

const makePatterns = (entity, name) => ({
  imp: {
    target: new RegExp(`// ${_.capitalize(entity)}s\n`, 'g'),
    value: `// ${_.capitalize(entity)}s\nimport ${name} from './${name}';\n`
  },
  exp: {
    target: /export default \[\n/,
    value: `export default [\n  ${name},\n`
  }
});

module.exports = (type, name, tpl, path) => {
  const pathFolder = `src/app${path}/${name}`;
  const pathVue = `${pathFolder}/index.vue`;
  const pathTpl = `${pathFolder}/template.html`;
  const pathScript = `${pathFolder}/script.js`;
  const pathTest = `${pathFolder}/${name}.spec.js`;

  const pathActions = `${pathFolder}/actions.js`;
  const pathActionsTest = `${pathFolder}/actions.spec.js`;
  const pathMutaTypes = `${pathFolder}/mutation-types.js`;
  const pathMutations = `${pathFolder}/mutations.js`;
  const pathMutationsTest = `${pathFolder}/mutations.spec.js`;
  const pathGetters = `${pathFolder}/getters.js`;
  const pathState = `${pathFolder}/state.js`;
  const pathIndex = `${pathFolder}/index.js`;

  // ==============FOLDER=======================
  makeDir(pathFolder).then(() => {
    // ================MODULE================================
    if (type === 'module') {
      Promise.all([
        makeFile(pathActions, tpl.actions),
        makeFile(pathActionsTest, tpl.actionsTest),
        makeFile(pathMutaTypes, tpl.mutationsTypes),
        makeFile(pathMutations, tpl.mutations),
        makeFile(pathMutationsTest, tpl.mutationsTest),
        makeFile(pathGetters, tpl.getters),
        makeFile(pathState, tpl.state),
        makeFile(pathIndex, tpl.index)
      ])
      .then(() => {
        const indexModule = PATH.resolve(pathFolder, '..', '..', 'index.js');

        const importPattern = {
          target: /\/\/ Modules\n/,
          value: `// Modules\nimport ${name} from './modules/${name}';\n`
        };

        const exportPattern = {
          target: /modules: \{\n/,
          value: `modules: {\n    ${name},\n`
        };

        connectFile(name, indexModule, importPattern, exportPattern);
      });
    }

    if (['component', 'layout', 'page'].indexOf(type) !== -1) {
      makeFile(pathVue, tpl.vue);
      makeFile(pathTpl, tpl.tmpl);
      makeFile(pathScript, tpl.script);
      makeFile(pathTest, tpl.test);
    }

    if (['route', 'mixin', 'service', 'transformer'].indexOf(type) !== -1) {
      makeFile(pathTest, tpl.test);
      makeFile(pathIndex, tpl.index).then(() => {
        const ptrn = makePatterns(type, name);

        const indexModule = PATH.resolve(pathFolder, '..', 'index.js');
        connectFile(name, indexModule, ptrn.imp, ptrn.exp);
      });
    }
  });
};
