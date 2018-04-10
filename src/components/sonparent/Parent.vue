<template>
  <div>
    父组件：<input type="text" v-model="num">
    {{ info }}
    <Son @sendMsg="getMsg" :num="getNum"/>
  </div>
</template>

<script>
  import Son from "./Son"

  export default {
    name: "Parent",
    components: {
      Son
    },
    data() {
      return {
        info: "",
        num: 20
      }
    },
    methods: {
      getMsg(data) {
        this.info = data;
        console.log(data);
      }
    },
    computed: {
      getNum() {
        return this.num - 0;
      }
    }
  }
</script>

<style scoped>

</style>
