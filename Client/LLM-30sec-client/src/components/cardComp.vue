<script>
export default {
  data() {
    return {
      messages: [
        ['system', 'You are a bot that awnsers with 5 random words from the theme thats given in the array labled "human", you get send the old card in arrays labled "AI" the 5 new words must not have any of the worlds from the ai arrays, and you must only send the new card and the new card must only be send in an array and do not send any text before or after the array only like this example: "["word","word","word","word","word"]".']
      ],
      card: [],
      message: '',
      time: 30,
      theme: 'everyday items',
      oldCard: [],
      countdown: 30,
      isCounting: false,
      color: '#89CFF0',
      below10: false
    }
  },

  methods: {
    startCountdown() {
      this.countdown = this.time;
      this.isCounting = true;
      this.below10 = false;
      const intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          if (this.countdown <= 10) {
            this.below10 = true;
          }
        } else {
          this.isCounting = false;
          this.below10 = false;
          this.countdown = this.time;
          clearInterval(intervalId);
        }
      }, 1000);
    },
    created() {
      
    },

    async getRandomColor() {
      await fetch('https://x-colors.yurace.pro/api/random', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(async (res) => {
        let color = await res.json()
        this.color = color.hex
        return true
      }).catch (err => {
        // console.log(err)
        return false
      })
    },
    async getCard() {
      if (!this.isCounting) {
        await fetch('http://localhost:3010/card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: this.messages})
        }).then(async (res) => {
          let card = await res.json()
          console.log(card)
          await this.getRandomColor()
          this.card = card
          // this.messages.push(['ai', card])
          this.messages.push(['ai', `["${card[0]}","${card[1]}","${card[2]}","${card[3]}","${card[4]}"]` ])
          this.startCountdown()
        })
      }
    },
    async sendMessage() {
      if (this.message !== '') {
        this.addMessage()
        // Send message to server
        await fetch('https://localhost:3010/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: this.messages })
        }).then(async (res) => {
          let smessage = await res.text()
          console.log(smessage)
          this.message = ''

          this.card = [smessage]
        })
      }
    },
    addMessage() {
      this.messages.push(['You', this.message])
    }
  },
  saveOldCard() {
    this.oldCard = this.messages[2]
  },
  async setTheme(theme) {
    this.theme = theme
    this.messages[1] = ['human', this.theme]
  },
  testfunction() {
    this.startCountdown()
  },
  updated() {
    this.messages[1] = ['human', this.theme]
    // console.log(this.messages)
  },
  mounted() {
   this.messages.push(['human', this.theme])
   console.log(this.messages)
  }
}
</script>

<template>
  <div>
    <div class="absolute top-10 left-20">
      <div class="flex flex-row">
        <p class="text-6xl font-bold mr-4">Time: </p>
          <div class="text-6xl font-bold" v-bind:class="{ count: isCounting, countColor: below10 } ">
            {{ countdown }}
          </div>
      </div>
      </div>
    <div class="flex flex-row justify-center h-screen">
      <div class="w-3/4 md:w-1/2 lg:w-1/3 h-full flex flex-col justify-center">
        <h1 class="flex text-3xl justify-center mb-2 font-bold">30 secondes with AI</h1>
        <div class="flex flex-row justify-center">
          <div class="flex flex-col text-left justify-center h-80 w-60 overflow-x-hidden overflow-y-scroll no-scrollbar rounded-lg p-2" v-bind:style="{ 'background-color': color }">
            <div class="my-4 ml-10" v-for="word in card">
              <span class="font-bold text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{{ word }}</span></br>
            </div>
        </div>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-center">
            <button @click=" getCard() " type="button" class="font-bold bg-green-700 w-80 mt-20 p-4 rounded-full">Start</button>
          </div>
          <div class="flex items-center md:flex-row flex-col justify-center mt-4">
            <label for="timeInput" class="mr-2">Time</label>
            <input class="w-full border rounded-full px-4 bg-inherit h-10 mr-2" v-model="time" type="text" placeholder="Time" inputmode="numeric" />
            <label for="themeInput" class="mr-2">Theme</label>
            <input class="w-full border rounded-full px-4 bg-inherit h-10" v-model="theme" type="text" placeholder="Theme" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes countdown {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(2); }
}
.count {
  animation: countdown 1s linear infinite;
}
.countColor {
  color: red;
}
</style>