<template>
  <div>
    <p v-bind:class="{active:isActive}">duan</p>
  </div>
</template>

<script>
  export default {
    name: "Style",
    data() {
      return {
        isActive: true
      }
    }
  }
</script>

<style scoped>
  .active {
    color: red;
  }
</style>
