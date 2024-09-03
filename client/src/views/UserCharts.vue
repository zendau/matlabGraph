<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-alert type="error" v-if="isError" max-width="400">{{ isError }}</v-alert>
    <charDataList v-else :isLoading="false" :chartsData="chartsData" />
  </v-container>

</template>

<script>

import charDataList from '@/components/chartDataList.vue'

export default {
  components: {
    charDataList
  },
  data: () => ({
    chartsData: [], isError: ''
  }),
  async mounted() {

    try {
      const userCharts = JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCAL_STORE_CHARTS))
      if (userCharts) {
        this.chartsData = userCharts
      }
    } catch (e) {
      console.log('e', e)
      this.isError = e
    }


  }
}
</script>