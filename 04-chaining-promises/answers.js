/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {function} asyncTransformer
 */
function flatMapPromise(promise, asyncTransformer) {
  return new Promise((resolve, reject) => {
    promise
      .then(async value => {
        await asyncTransformer(value).then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        });
        
      })
      .catch((err) => reject(err));
  });
}

/**
 *
 * EXERCISE 2
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
  return firstPromise.then(async response => {
    return await slowAsyncProcess(response);
  });
}

/**
 *
 * EXERCISE 3
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  return async function getUserByIdWithOrganization(userId) {
    return await getUserById(userId).then(response => {
      return getOrganizationById(response.organizationId).then(res => {
        return {...response, organization: res};
      });
    }).catch(() => {
      return undefined;
    });
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
};
