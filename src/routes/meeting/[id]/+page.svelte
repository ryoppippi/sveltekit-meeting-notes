<script>
  import { page } from "$app/stores";
  import { notes, deleteNote } from "$lib/stores";
  import { goto } from "$app/navigation";

  let id = parseInt($page.params.id, 10);

  function removeNote() {
    deleteNote(id);
    goto("/");
  }
</script>

{#if $notes[id]}
  <h1>{$notes[id].title}</h1>
  <p>{$notes[id].content}</p>

  <button on:click="{removeNote}">議事録を削除</button>
{:else}
  <p>議事録が存在しません。</p>
{/if}
