<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as path from 'path'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  mounted() {
    console.log('path', path)
  },
  data: () => ({
    //
  }),
}
</script>
