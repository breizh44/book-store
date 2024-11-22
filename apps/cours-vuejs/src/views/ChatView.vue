<script setup lang="ts">
import GenButton from '@/components/atoms/GenButton.vue'
import { io } from 'socket.io-client'
import { ref } from 'vue'

const socket = io('http://localhost:1000')

const inputMessage = ref<string>('')
const messages = ref<string[]>(['Hello', 'Bonjour', 'Salut'])

const sendMessage = () => {
  socket.emit('chat', inputMessage.value)
  inputMessage.value = ''
  console.log(inputMessage.value)
}

socket.on('connect', () => {
  console.log('connected to server')
})
socket.on('chat', (message: string) => {
  console.log(`message recu : ${message}`)
  messages.value.push(message)
})
socket.emit('chat', 'connected to server')

socket.on('disconnect', () => {
  console.log('disconnected from server')
})
</script>
<template>
  <div class="flex justify-center items-start h-full">
    <div class="flex flex-col items-center justify-center w-1/2 gap-2">
      <h1 class="text-3xl font-bold">Chat</h1>
      <div class="flex flex-col border border-black rounded-md w-full h-[300px] overflow-scroll">
        <p
          v-for="(message, index) in messages"
          class="border-black border-b ps-4 py-2"
          :key="index"
          :class="[index % 2 ? 'bg-blue-200' : 'bg-purple-200']"
        >
          {{ message }}
        </p>
      </div>
      <input
        class="border-black rounded-md w-full"
        v-model="inputMessage"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Enter your message"
      />
      <GenButton class="self-end" @click="sendMessage" :text="$t('chat.action.send')"
        >Send</GenButton
      >
    </div>
  </div>
</template>
