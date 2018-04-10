<template>
  <div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
    <button @click="changView">切换</button>
  </div>
</template>

<script>
  import Small1 from './Small1'
  import Small2 from './Small2'

  export default {
    name: "big",
    components: {
      Small1,
      Small2
    },
    data() {
      return {
        currentView: "Small1",
        flag: true
      }
    },
    methods: {
      changView: function () {
        if (this.flag === true) {
          this.currentView = "Small2";
          this.flag = false;
        } else {
          this.currentView = "Small1";
          this.flag = true;
        }
      },
    }
  }
</script>

<style scoped>

</style>
