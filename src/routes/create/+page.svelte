<script>
  import { notes } from "$lib/stores";
  import { goto } from "$app/navigation";

  let title = "";
  let content = "";

  let recognition;
  let isListening = false;
  let isSpeechRecognitionSupported = false;

  if (typeof window !== "undefined") {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      isSpeechRecognitionSupported = true;

      recognition.addEventListener("result", (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        content = transcript;
      });
    }
  }

  function startListening() {
    if (recognition) {
      recognition.start();
      isListening = true;
    }
  }

  function stopListening() {
    if (recognition) {
      recognition.stop();
      isListening = false;
    }
  }

  function createNote() {
    $notes = [...$notes, { title, content }];
    goto("/");
  }
</script>

<h1>議事録作成</h1>

<label>
  タイトル: <input bind:value="{title}" />
</label>
<label>
  内容:
  <textarea bind:value="{content}" rows="10" cols="50"></textarea>
</label>

{#if isSpeechRecognitionSupported}
  <button on:click="{startListening}" disabled="{isListening}">音声入力開始</button>
  <button on:click="{stopListening}" disabled="{!isListening}">音声入力停止</button>
{/if}

<button on:click="{createNote}">作成</button>

<style>
  label {
    display: block;
    margin-bottom: 1rem;
  }
  textarea {
    width: 100%;
  }
  button {
    background-color: blue;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
</style>
