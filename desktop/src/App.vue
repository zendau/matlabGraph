<template>
  <v-app>
    <navbar/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import navbar from './components/navbar.vue';

export default {
  components: {
    navbar
  },
  name: 'App',
}
</script>
