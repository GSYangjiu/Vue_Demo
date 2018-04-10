<template>
  <div>
    儿子：{{ title }} - {{ lifeMsg }} - {{ num*20 }} - {{ objdata.name }}
  </div>
</template>

<script>


  export default {
    name: "child",
    data() {
      return {}
    },
    props: {
      title: [String, Number],
      lifeMsg: {
        type: String,
        required: true
      },
      num: {
        type: Number,
        default: 5
      },
      objdata: {
        name: "未知",
        age: 399
      }
    }
  }
</script>

<style scoped>

</style>
