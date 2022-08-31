<template>
  <charDataList :isLoading="false" :chartsData="chartsData" />
</template>

<script>
  
import charDataList from '@/components/chartDataList.vue'

export default {
  components: {
    charDataList
  },
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