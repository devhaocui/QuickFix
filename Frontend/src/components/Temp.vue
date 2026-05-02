<script setup>
import { ref, onMounted } from "vue";

// FIX: needs a .env for api at some point. easier to read like this for now.
const API = "http://localhost:3000/api/notes";

const notes = ref([]);
const newNote = ref("");

async function fetchNotes() {
  const res = await fetch(API);
  notes.value = await res.json();
}

async function addNote() {
  await fetch(API, {
    method: "POST",
    // NOTE: appplication/json tells express.js that the body being sent is a json format.
    headers: { "Content-Type": "application/json" },
    // NOTE: converts ref newNote value into json format and send it to the backend
    body: JSON.stringify({ text: newNote.value }),
  });
  newNote.value = "";
  // NOTE: fetch the notes after posting an update to the DB.
  await fetchNotes();
}

onMounted(fetchNotes);
</script>

<template>
  <div>
    <input v-model="newNote" placeholder="Write a note" />
    <button @click="addNote">Save</button>
    <p v-for="note in notes" :key="note._id">{{ note.text }}</p>
  </div>
</template>
