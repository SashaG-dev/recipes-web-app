import { API_URL } from "./config.js";

export function getItems(obj, str) {
  const arr = [];
  for (const key in obj) {
    if (key.includes(str) && obj[key]) {
      arr.push(obj[key]);
    }
  }
  return arr;
}

export async function getJSON(type, input) {
  try {
    const results = await fetch(`${API_URL}${type}${input}`);

    if (!results.ok)
      throw new Error(
        "There was an error loading results! Check your connection and try again."
      );

    const data = await results.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
