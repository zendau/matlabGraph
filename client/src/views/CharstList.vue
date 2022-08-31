<template>
  <charDataList :isLoading="isLoading" :chartsData="chartsData" />
</template>

<script>

import axios from 'axios'
import charDataList from '@/components/chartDataList.vue'

export default {
  components: {
    charDataList
  },
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