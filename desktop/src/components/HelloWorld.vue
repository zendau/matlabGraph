<template>
  <div class="hello">
    <h1>{{ counter }}</h1>
    <button @click="counter++" >inc</button>
    <button @click="counter--" >dec</button>
  </div>
</template>

<script>
export default {
  data: () => ({counter: 0}),
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
