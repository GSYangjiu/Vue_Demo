<template>
  <div>
    父亲:
    <input type="text" v-model="lifeMsg">
    <Child :title="msg" :lifeMsg="lifeMsg" :num="num" :objdata="objdata"/>
    <button @click="changeMsg">按钮</button>
  </div>
</template>

<script>
  import Child from './Child'

  export default {
    name: "parent",
    data() {
      return {
        msg: "我是活的数据",
        lifeMsg: "hello",
        num: 10,
        objdata: {
          name: "iwen",
          age: 20
        }
      }
    },
    components: {
      Child
    },
    methods: {
      changeMsg(event) {
        this.msg = "我是修改之后的数据";
      }
    }
  }
</script>

<style scoped>

</style>
