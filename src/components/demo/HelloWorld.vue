<template>
  <div class="list">
    <ul>
      <li v-for="news in newsData"></li>
      <p>{{ news.title }}</p>
      <img :src="news.thumbnail_pic_s" alt="">
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        newsData: []
      }
    },
    created() {
      this.$axios("http://www.wwtliu.com/sxtstu/news/juhenews.php", {
        params: {
          type: "junshi",
          count: 30
        }
      })
        .then(res => {
          console.log(res.data.result.data);
          this.newsData = res.data.result.data;
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
