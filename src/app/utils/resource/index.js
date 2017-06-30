/* ============
 * resource Service
 * ============
 *
 */
import axios from 'axios';
import moment from 'moment';
import jQuery from 'jquery';

const {
  each,
  param
} = jQuery;


export const httpMethodsNames = {
  get: 'httpGet',
  post: 'httpPost',
  put: 'httpPut',
  delete: 'httpDelete'
};

export const makeExpiration = ms => moment().add(ms / 1000, 'seconds').unix();
export const checkIsExpired = timestams => moment.unix(timestams).isBefore(moment());
export const cache = {};

export const makeAjax = method => ({
  url,
  data = {},
  headers = {}
}) => axios({
  headers,
  url,
  method,
  data
});

export const http = {
  get: makeAjax('get'),
  post: makeAjax('post'),
  put: makeAjax('put'),
  del: makeAjax('delete')
};

/**
 * Get data from cache by uniq key
 * @param {Object} data which needs get data from cache
 */
export const fromCache = (dataForKey) => {
  const {
    serviceName,
    query,
    headers,
    url
  } = dataForKey;
  // uniq key for cache storage based on query string "a=1&b=2&c=3"
  const key = param({
    serviceName,
    url,
    query,
    headers
  });

  // get data by key
  const val = key in cache && cache[key];

  if (val && !checkIsExpired(val.exp)) {
    return val.data;
  }

  // if returns null that means we need to get data from server (mek HTTP request)
  return null;
};

/**
 * Save data to cache by uniq key
 * @param {Object} dataForKey - data which needs to create uniq key for cache storage
 * @param {Any} data to keep in cache storage
 */
export const setCache = (dataForKey, data) => {
  const {
    serviceName,
    query,
    headers,
    url,
    cacheTimeout
  } = dataForKey;
  const key = param({
    serviceName,
    url,
    query,
    headers
  });
  const exp = makeExpiration(cacheTimeout || 600000);
  cache[key] = {
    exp,
    data
  };
};


/**
 * Flush cache using array of cache names
 * @param {Array} caches - list of resource names to force flush
 */
export const resetCaches = (caches = []) => {
  const cacheKeys = Object.keys(cache);
  caches.forEach(cacheName => {
    cacheKeys.forEach(cacheKey => {
      if (new RegExp(cacheName, 'g').test(cacheKey)) {
        delete cache[cacheKey];
      }
    });
  });
};


/**
 *
 * @param {String} httpMethod - name of http method - same for POST, PUT, DEKETE
 */
export const makeServiceMixinHttpMethod = httpMethod => (host, endpoint, options = {}) => {
  const {
    headers,
    resetCaches: rc
  } = options;
  let {
    data
  } = options;
  const url = `${host}${endpoint}`;

  if (rc) {
    resetCaches(rc);
  }
  if (httpMethod === 'del' || Object.keys(data || {}).length === 0) {
    data = null;
  }

  return http[httpMethod]({
    url,
    data,
    headers
  });
};

export const httpMethods = {

  /**
   * Call GET HTTP Request and save response to cache if it needs
   * @param {String} url - urls without host "/users"
   * @param {Object} options
   */
  [httpMethodsNames.get]: (endpoint, options = {}) => {
    const url = `${this.get('host')}${endpoint}`;

    let {data} = options;

    const {
      headers,
      useCache,
      cacheTimeout,
      serviceName
    } = options;
    const cacheData = {
      url: endpoint,
      data,
      headers,
      serviceName,
      cacheTimeout
    };
    if (useCache) {
      const dataFromCache = fromCache(cacheData);
      if (fromCache) {
        return Promise.resolve(dataFromCache);
      }
    }
    if (Object.keys(data || {}).length === 0) {
      data = null;
    }
    return http.get({
      url,
      data,
      headers
    }).then(response => {
      setCache(cacheData, response);
      return response;
    });
  },

  /**
   * Call POST HTTP Reqest and reset some cache if it needs
   * @param {String} endpoint - urls without host "/users"
   * @param {Object} options
   */
  [httpMethodsNames.post]: makeServiceMixinHttpMethod('post'),

  /**
   * Call PUT HTTP Reqest and reset some cache if it needs
   * @param {String} endpoint - urls without host "/users"
   * @param {Object} options
   */
  [httpMethodsNames.put]: makeServiceMixinHttpMethod('put'),

  /**
   * Call DELETE HTTP Reqest and reset some cache if it needs
   * @param {String} endpoint - urls without host "/users"
   * @param {Object} options
   */
  [httpMethodsNames.delete]: makeServiceMixinHttpMethod('del')

};

/**
 * Method which convert resource object to service mixin
 *
 * ========
 *  Input
 * ========
 * @example
 *     const resources = {
 *       getAllIssues: {
 *         url: '/repos/vmg/redcarpet/issues',
 *         type: 'get',
 *         useCache: true,
 *         cacheTimeout: 6000,
 *       },
 *       newIssue: {
 *         url: '/',
 *         type: 'post',
 *         resetCaches: ['getAllIssues']
 *       }
 *     };
 *
 *
 * ========
 *  Output
 * ========
 * @example
 *    const serise = {
 *      getAllIssues(host, url, data, cacheData) {
 *        return http.get({
 *          url: `${host}${url}`,
 *          data: data.query,
 *          headers: data.headers
 *        }).then(response => {
 *          setCache(cacheData, response);
 *          return response;
 *        })
 *      },
 *      newIssue(host, url, data, headers) {
 *        // remove caches -  ['getAllIssues']
 *        return http.post({
 *          url: `${host}${url}`,
 *          data: data.data,
 *          headers: data.headers
 *        });
 *      }
 *    };
 *
 *
 * =================
 *  Resourse form
 * =================
 *  url {String} - Path to endpoint without host part, could contain dynamic param "/users/:id"
 *  type {String} - Name of HTTP Protocol method [GET,POST,PUT,DELETE]
 *  params {Object} - List of names and aliases of url
     dynamic segments "/folders/:folderId/files/:fileId"
 *  {
 *    fid: 'folderId',
 *    flid: 'fileId',
 *    // serviceName.loadFile({fid: 3, flid: 5}),then(...) - fires "/folders/3/files/5"
 *  }
 *  headers {Object} - Some specific headers for HTTP current request
 *  useCache {Boolean} - Mark that needs to save http response to cache - Default (true)
 *  cacheTimeout {Number} - Time in millisecond to flush cache for current method
     - Default (600000) - 10 minutes
 *  resetCache {Array} - List of methods which needs to flush cache - Default (Empty)
 *
 *
 * @param {Object} resources - list of method names and parameters which
     needs to create for use in mixins
 * @returns {Object} Return the Ember mixin with http methods
 *
 */
export default (host, resources) => {
  const ServiceMixin = {};
  each(resources, (methodName, config) => {
    // extract dara from Resource config
    const {
      url,
      type,
      useCache: cUseCache,
      params,
      headers: cHeaders,
      cacheTimeout,
      resetCaches
    } = config;

    // define new ServiceMixin method and build specific HTTP calls according to configuration
    /**
     * @param {Object} data - Means POST, PUT body or GET, DELETE query including url params
     * @param {Object} options - service data (useCache, cacheTimeout, headers)
     * @returns {Promise} Promise of http call
     */
    ServiceMixin[methodName] = (data = {}, options = {}) => {
      const {
        headers,
        useCache
      } = options;

      // jQuery AJAX http method
      const method = httpMethodsNames[type];

      // useCache {bool} - from options or from config
      const uc = useCache !== undefined ? useCache : cUseCache || false;

      // headers {Object} - from options or from config
      const h = headers || cHeaders;

      // will contain compiled url for example /users/1
      let formatedUrl = url;

      // Get aliases for dynamic segments from Resource.params and data to replace container in url
      if (params && Object.keys(params).length > 0) {
        each(params, (key, val) => {
          formatedUrl = formatedUrl.replace(`:${key}`, data[val]);
        });
      }
      // call method which defined in Ember "httpservice.js" service
      return httpMethods[method](host, formatedUrl, {
        data,
        headers: h,
        useCache: uc,
        cacheTimeout,
        resetCaches,
        serviceName: methodName
      });
    };
  });
  return ServiceMixin;
};
