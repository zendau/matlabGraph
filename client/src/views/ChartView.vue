<template>
  <div>
    <h1>Chart</h1>
    <div v-if="isError">
      {{ isError }}
    </div>
    <div v-else>
      {{ chartData }}
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data: () => ({ rating: 3, isError: '', chartData: 'test' }),
  async mounted() {


    const chartID = this.$route.params.id

    try {
      const resData = await axios.get(`${process.env.VUE_APP_API}/chart/get/${chartID}`)
      this.chartData = resData.data.chart.data
    } catch (e) {
      this.isError = e.response.data.message
    }



  }
}
</script>