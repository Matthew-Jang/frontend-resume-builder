<script setup>
import { ref } from "vue";
import { chatClient } from "../services/apiClient.js"; // Import chatClient

const showModal = ref(false); // Controls modal visibility
const messages = ref([
  { role: "system", content: "You are a helpful assistant." },
]); // Stores the chat messages
const userInput = ref(""); // Stores the current user input

const sendMessage = async () => {
  if (!userInput.value.trim()) return; // Prevent empty messages

  // Add user message to the chat
  messages.value.push({ role: "user", content: userInput.value });
  const userMessage = userInput.value; // Capture user input
  userInput.value = ""; // Clear input

  try {
    // Send conversation history to OpenAI API
    const response = await chatClient.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: messages.value,
    });

    // Add ChatGPT's response to the chat
    const gptMessage = response.data.choices[0].message;
    messages.value.push(gptMessage);
  } catch (error) {
    console.error("Error communicating with ChatGPT:", error);
    messages.value.push({ role: "assistant", content: "Sorry, there was an error." });
  }
};
</script>

<template>
  <!-- Button to Open Chat Modal -->
  <v-btn color="primary" @click="showModal = true">Open Chat</v-btn>

  <!-- Chat Modal -->
  <v-dialog v-model="showModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Chat with ChatGPT</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="showModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Chat Display Area -->
      <v-card-text class="chatbox" style="height: 400px; overflow-y: auto;">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.role === "user" ? "You" : "ChatGPT" }}:</strong>
          <span>{{ message.content }}</span>
        </div>
      </v-card-text>

      <!-- Input Field for User Message -->
      <v-card-actions>
        <v-text-field
          v-model="userInput"
          label="Type a message..."
          dense
          outlined
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn color="primary" @click="sendMessage">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.chatbox {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 5px;
  border-radius: 5px;
}

.message:nth-child(odd) {
  background-color: #f0f0f0;
}

.message:nth-child(even) {
  background-color: #e0f7fa;
}
</style>
