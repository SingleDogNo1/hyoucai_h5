<template>
  <div class="rewards">
    <div class="reward" :class="{active:current%8 === 0}">0</div>
    <div class="reward" :class="{active:current%8 === 1}">1</div>
    <div class="reward" :class="{active:current%8 === 2}">2</div>
    <div class="reward" :class="{active:current%8 === 7}">7</div>
    <div class="reward btn">
      <button @click="getReward">立即抽奖</button>
    </div>
    <div class="reward" :class="{active:current%8 === 3}">3</div>
    <div class="reward" :class="{active:current%8 === 6}">6</div>
    <div class="reward" :class="{active:current%8 === 5}">5</div>
    <div class="reward" :class="{active:current%8 === 4}">4</div>
  </div>
</template>

<script>
export default {
  name: 'receiveAddress',
  data() {
    return {
      rewards: [1, 2, 3, 4, 5, 6, 7, 8],
      reward: 7,
      current: 0
    }
  },
  computed: {
    target() {
      return this.reward - 0 + 80
    }
  },
  methods: {
    getReward() {
      this.current = 0
      this.nextStep()
      /*let t = window.setInterval(() => {
        this.current++
        if (this.current - this.target === 0) {
          window.clearInterval(t)
        }
      }, 100)*/
    },
    nextStep() {
      this.current++
      let num = this.target - this.current
      let intervalTime = 0
      if (num > 30) {
        intervalTime = 50
      } else if (num > 20) {
        intervalTime = 100
      } else if (num > 10) {
        intervalTime = 200
      } else if (num > 5) {
        intervalTime = 300
      } else if (num > 1) {
        intervalTime = 600
      } else if (num <= 1) {
        intervalTime = 700
      }
      if (num !== 0) {
        window.setTimeout(() => {
          this.nextStep()
        }, intervalTime)
      }
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.rewards {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .reward {
    width: 1rem;
    height: 1rem;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      border: 1px solid red;
    }
  }
}
</style>
