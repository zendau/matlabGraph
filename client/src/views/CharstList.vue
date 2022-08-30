<template>
  <v-progress-circular v-if="isLoading" :size="80" :width="7" color="green" indeterminate></v-progress-circular>
  <ul v-if="chartsData.length">
    <li v-for="item in chartsData" :key="item.id">
      <router-link :to="`/chart/${item.id}`">{{  item.title  }}</router-link>
    </li>
  </ul>
  <div v-else>Not have charts</div>
</template>

<script>

import axios from 'axios'

export default {
  data: () => ({
    chartsData: [],
    isLoading: false
  }),
  async mounted() {
    this.isLoading = true
    const resData = await axios.get(`${process.env.VUE_APP_API}/chart/list`)
    this.chartsData = resData.data.charts
    this.isLoading = false
  }
}
</script>