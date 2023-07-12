import { API_URL } from './config.js';
import { TIMEOUT } from './config.js';

const timeout = async function (time) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(
        new Error(
          'There was an error getting your results. Please check your connection and try again!'
        )
      );
    }, time * 1000);
  });
};

export function getItems(obj, str) {
  const arr = [];
  for (const key in obj) {
    if (key.includes(str)) {
      arr.push(obj[key]);
    }
  }
  return arr;
}

export async function getJSON(type, input) {
  try {
    const results = await Promise.race([
      fetch(`${API_URL}${type}${input}`),
      timeout(TIMEOUT),
    ]);

    if (!results.ok) throw new Error();
    const data = await results.json();
    return data;
  } catch (err) {
    throw err;
  }
}
