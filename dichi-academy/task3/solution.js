/*==================================01 03 Algorithm Design(flattenDeep(obj, prefix = ''))======================
Write a function that takes a deeply nested object and returns a flat object where keys represent the full
path using dot notation. Arrays must use bracket notation for their indices.
*/


/* ================================== Expected output ==================================
– Arrays use bracket notation: key[0], key[1], etc.
– Empty objects or arrays — include the key with value null.
- Input: { user: { name: 'Ana', scores: [10, 20], meta: { active: true } } }
– Output: key, value
    {
        'user.name': 'Ana',
        'user.scores[0]': 10,
        'user.scores[1]': 20,
        'user.meta.active': true,
    }  
*/


// ================================== Coding Part ================================== 
const nestedUserData = {
    user: {
        name: 'Ana',
        scores: [10, 20],
        meta: {
            active: true
        }
    }
}
const emptyObj = {
    user: {
        name: 'Ana',
        scores: 23,
        meta: {}
    }
}

const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      const newKey = Array.isArray(obj)
      ? `${prefix}[${key}]`
      : prefix
          ? `${prefix}.${key}`
          : key
      
  
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
        Object.assign(acc, flattenObject(value, newKey));
      } else {
        acc[newKey] =
        (typeof value === 'object' && value !== null)
            ? null
            : value
      }

      return acc;
    }, {});
  };

  console.log('nestedUserData', flattenObject(nestedUserData));
  console.log('emptyObj', flattenObject(emptyObj));
  module.exports = fetchWithRetry