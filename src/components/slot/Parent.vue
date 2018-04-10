<template>
  <div class="parent">
    父组件
    <Son>
      <div slot="s1">
        <p class="ptest">我是插槽1</p>
        <p class="ptest">我是插槽11</p>
      </div>
      <p slot-scope="props" slot="s2" class="ptest">
        {{ props.text }}
      </p>
    </Son>
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
      return {}
    }
  }
</script>

<style scoped>
  .ptest {
    color: red;
  }
</style>
