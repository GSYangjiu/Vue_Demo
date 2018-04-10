<template>
  <div id="todoList">
    <div id="cover"></div>
    <Header/>
    <Todo/>
    <Footer/>
  </div>
</template>

<script>
  import Header from './todo/header'
  import Todo from './todo/todo'
  import Footer from './todo/Footer'

  export default {
    name: "todolist",
    components: {
      Todo,
      Header,
      Footer
    }
  }
</script>

<style lang="stylus" scoped>
  #todoList {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }

  #cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background: #999
    opacity .9
    z-index -1
  }
</style>
