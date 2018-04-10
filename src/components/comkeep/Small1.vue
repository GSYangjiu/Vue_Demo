<template>
  <div>
    {{ msg }}
    <button @click="changInfo">changInfo</button>
  </div>
</template>

<script>
  export default {
    name: "Small1",
    data() {
      return {
        msg: "Small1"
      }
    },
    methods: {
      changInfo: function () {
        this.msg = "Small11111";
      }
    }
  }
</script>

<style scoped>

</style>
