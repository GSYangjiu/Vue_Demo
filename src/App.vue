<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/demo/HelloWorld'
  // import Events from './components/Event'
  // import Formdata from './components/Formdata'
  // import Style from './components/Style'
  //import Parent from './components/slot/Parent'
  //import Todolist from './components/todolist/todolist'

  export default {
    name: 'App',
    components: {
      HelloWorld,
      // Events,
      // Formdata,
      // Style,
      //Parent
      //Todolist
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
