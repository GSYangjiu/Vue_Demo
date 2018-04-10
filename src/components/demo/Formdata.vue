<template>
  <div>
    <input type="text" v-model.lazy="msg">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: "formdata",
    data() {
      return {
        msg: "hello"
      }
    }
  }
</script>

<style scoped>

</style>
