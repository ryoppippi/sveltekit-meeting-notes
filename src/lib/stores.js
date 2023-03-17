import { writable } from "svelte/store";
import { persistentStore } from "./persistentStore";

const initialNotes = [
  {
    title: "サンプル議事録1",
    content: "これはサンプル議事録1の内容です。",
  },
  {
    title: "サンプル議事録2",
    content: "これはサンプル議事録2の内容です。",
  },
];

export const notes = persistentStore("notes", initialNotes);

// 削除機能を追加
export function deleteNote(id) {
  notes.update((currentNotes) => {
    return currentNotes.filter((note, index) => index !== id);
  });
}
