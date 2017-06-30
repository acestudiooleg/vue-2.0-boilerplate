import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import jQuery from 'jquery';

const {
  each,
  param
} = jQuery;

// import { resetCaches } from './index';

test('makeAjax', async t => {
  const spy = sinon.spy();
  const { makeAjax } = proxyquire('./index', {
    axios: spy
  });

  const method = 'get';

  const args = {
    headers: 'headers',
    url: 'url',
    data: { a: 'b'}
  };

  makeAjax(method)(args);

  t.deepEqual(spy.args[0][0], {method, ...args});
});

test('makeAjax with Default data', async t => {
  const spy = sinon.spy();
  const { makeAjax } = proxyquire('./index', {
    axios: spy
  });

  const method = 'post';

  const args = {
    url: 'url'
  };

  makeAjax(method)(args);

  t.deepEqual(spy.args[0][0], {method, ...args, headers: {}, data: {}});
});


const fromCacheHelper = isExp => t => {
  const spy = sinon.spy();
  const moment = () => 333;
  moment.unix = ts => {
    spy(ts);
    return moment;
  };

  moment.isBefore = () => isExp;
  moment['@noCallThru'] = true;

  const { fromCache, cache } = proxyquire('./index', {
    moment
  });

  const dataForKey = {
    serviceName: 'name',
    url: '/www/bbb',
    query: { a: 'b'},
    headers: {}
  };

  const data = {
    name: 'name',
    surname: 'surname'
  };

  const key = param(dataForKey);
  const exp = 111;

  cache[key] = { exp, data };

  const actual = fromCache(dataForKey);

  t.is(spy.args[0][0], exp);
  if (isExp) {
    t.is(actual, null);
  } else {
    t.deepEqual(actual, data);
  }
};


test('fromCache', fromCacheHelper());
test('fromCache - expired', fromCacheHelper(true));

const setCacheHelper = cacheTimeout => t => {
  const spy = sinon.spy();

  const o = {
    unix: () => cacheTimeout,
    add: x => {
      spy(x);
      return o;
    }
  };
  const moment = () => o;

  moment['@noCallThru'] = true;

  const { setCache, cache } = proxyquire('./index', {
    moment
  });

  const dataForKey = {
    serviceName: 'name',
    url: '/www/bbb',
    query: { a: 'b'},
    headers: {}
  };

  const data = {
    name: 'name',
    surname: 'surname'
  };

  const key = param(dataForKey);


  const expected = { exp: cacheTimeout, data };

  setCache({...dataForKey, cacheTimeout}, data);

  const actual = cache[key];

  t.is(spy.args[0][0], (cacheTimeout || 600000) / 1000);

  t.deepEqual(actual, expected);
};


test('setCache', setCacheHelper(300));
test('setCache default', setCacheHelper());

const resetCachesHelper = isEmpty => t => {
  const { resetCaches, cache } = proxyquire('./index', {});

  cache.a = 'a';
  cache.b = 'b';

  const x = {
    ...cache
  };

  resetCaches(isEmpty ? [] : ['b']);

  if (isEmpty) {
    t.deepEqual(cache, x);
  } else {
    t.deepEqual(cache, {a: cache.a});
  }
};

test('resetCaches', resetCachesHelper(true));
test('resetCaches default', resetCachesHelper());
