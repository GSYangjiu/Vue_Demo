<template>
  <div>
    <button @click="sendMsg">传递</button>
  </div>
</template>

<script>
  export default {
    name: "son",
    data() {
      return {
        msg: "我是子组件数据"
      }
    },
    methods: {
      sendMsg(event) {
        this.$emit("sendMsg", this.addNum);
      }
    },
    props: {
      num: {
        type: Number,
        default: 10
      }
    },
    computed: {
      addNum() {
        return this.num * 200;
      }
    }
  }
</script>

<style scoped>

</style>
