const fs = require('fs');

const pr = (s, f) => (err, data) => {
  if (err) {
    return f(err);
  }
  return s(data);
};

const readFile = path => new Promise((s, f) => fs.readFile(path, 'utf-8', pr(s, f)));
const writeFile = (path, data) => new Promise((s, f) => fs.writeFile(path, data, 'utf-8', pr(s, f)));
const access = path => new Promise((s, f) => fs.access(path, pr(s, f)));
const mkdir = path => new Promise((s, f) => fs.mkdir(path, pr(s, f)));

module.exports = {
  readFile,
  writeFile,
  access,
  mkdir
};
