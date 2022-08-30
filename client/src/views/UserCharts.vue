<template>
  <ul v-if="chartsData.length">
    <li v-for="item in chartsData" :key="item.id">
      <router-link :to="`/chart/${item.id}`">{{  item.title  }}</router-link>
    </li>
  </ul>
  <div v-else>Not have charts</div>
</template>

<script>


export default {
  data: () => ({
    chartsData: [],
  }),
  async mounted() {
   const userCharts = JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCAL_STORE_CHARTS))
   if (userCharts) {
    this.chartsData = userCharts
   }
  }
}
</script>