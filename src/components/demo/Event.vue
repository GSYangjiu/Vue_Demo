<template>
  <!--在template中只能存在一个根组件-->
  <div class="event">
    {{ message.split('').reverse().join('') }}
    {{ reversedMessage }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "yang"
      }
    },
    computed: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('');
      }
    }
  }
</script>

<style scoped>

</style>
