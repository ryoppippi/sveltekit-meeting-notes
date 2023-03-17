<script>
  import { notes } from "$lib/stores";
</script>

<div class="container">
  <h1>議事録一覧</h1>

  <ul>
    {#each $notes as note, index}
      <li>
        <a href={`/meeting/${index}`}>{note.title}</a>
      </li>
    {/each}
  </ul>

  <a href="/create">議事録を作成する</a>
</div>

<style global>
  @import "../app.css";
</style>
