/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer){
  return new Promise((resolve, reject) => {
    /* IMPLEMENT ME!! */
    promise.then(resp => {
      resolve(transformer(resp));
    }).catch(err => {
      reject(err);
    });

  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise){
  return numberPromise
    .then(response => {
      return new Promise((resolve, reject) => {
        const value = parseInt(response);
        if(Number.isNaN(value)){
          reject('Cannot convert \'abc\' to a number!');
        }
        resolve(Math.pow(value, 2));
      });
    }).catch(err => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise){
  return squarePromise(promise)
    .catch(/* IMPLEMENT ME! */
      () => {
        return new Promise(resolve => {
          resolve(0);
        });
      }
    );
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
function switcheroo(promise){
  return promise.then(resp => {
    return new Promise((resolve,reject)=> {
      reject(resp);
    });
  }, onrejectionhandled => {
    return new Promise((resolve)=> {
      resolve(onrejectionhandled);
    });
  });
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};