<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      messages: [],
      message: ''
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    async sendMessage() {
      if (this.message !== '') {
        this.addMessage()
        // Send message to server
        await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: this.message })
        }).then(async (res) => {
          let smessage = await res.text()
          console.log(smessage)
          this.message = ''
          this.messages.push(['Server', smessage])
        })
      }
    },
    addMessage() {
      this.messages.push(['You', this.message])
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    
  }
}
</script>

<template>
  <div class="flex flex-row justify-center h-screen">
    <div class="w-3/4 md:w-1/2 lg:w-1/3 h-full flex flex-col">
      <h1 class="text-3xl mb-2 font-bold">Chat component</h1>
      <div class="h-full overflow-x-hidden overflow-y-scroll no-scrollbar">
        <div class="mt-6 text-wrap" v-for="message in messages">
            <span class="font-bold">{{ message[0] }}</span></br> 
            <p class="">
              {{ message[1] }}
            </p>            
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <div class="flex justify-center">        
          <input id="messageField" class="w-full border rounded-full px-4 bg-inherit h-10 " v-model="message" @keyup.enter="sendMessage()"  type="text" />
          <button @click="sendMessage()" type="button">Send</button>
        </div>
      </div>
    </div>
  </div>
  
</template>
