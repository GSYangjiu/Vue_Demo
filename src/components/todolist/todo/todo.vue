<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      placeholder="接下来要做什么?"
      autofocus="autofocus"
      @keyup.enter="addTodo"
    >
    <items
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
  import Items from './items'
  import Tabs from './tabs'

  let id = 0;
  export default {
    name: "todo",
    components: {
      Items,
      Tabs
    },
    data() {
      return {
        todos: [],
        filter: 'all'
      }
    },
    computed: {
      filteredTodos() {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo: function (e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
        e.target.value = ''
      },
      deleteTodo: function (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter: function (state) {
        this.filter = state
      },
      clearAllCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }
  .add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
  }
</style>
