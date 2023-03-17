import { writable } from "svelte/store";
import { browser } from "$app/environment";

export function persistentStore(key, value) {
  const storedValue = browser ? localStorage.getItem(key) : null;
  const data = writable(storedValue ? JSON.parse(storedValue) : value);

  data.subscribe(($data) => {
    if (browser) {
      localStorage.setItem(key, JSON.stringify($data));
    }
  });

  return data;
}
