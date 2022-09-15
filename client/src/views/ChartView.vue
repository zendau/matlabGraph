<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-progress-circular v-if="isLoading" :size="90" :width="7" color="blue" indeterminate></v-progress-circular>
    <div v-else>
      <v-alert type="error" v-if="isError">{{ isError }}</v-alert>
      <div v-else>
        <div class="chart__header">
          <h1>Chart - {{this.title}}</h1>
          <v-btn @click="isOpenSetting = !isOpenSetting" color="green">{{isOpenSetting ? 'Close' : 'Open'}} settings
          </v-btn>
        </div>
        <chartCanvas :chartData="chartData" :isOpenSetting="isOpenSetting" />
        <v-divider class="ma-5"></v-divider>
        <chartTable :tableData="tableData" />
      </div>
    </div>
  </v-container>
</template>

<script>

import axios from 'axios'

import chartTable from '@/components/chartTable.vue'
import chartCanvas from '@/components/chartCanvas.vue'

export default {
  components: { chartTable, chartCanvas },
  data: () => ({
    isError: '', chartData: [], tableData: [], title: null, isOpenSetting: false, isLoading: true
  }),
  async mounted() {
    this.isLoading = true
    const chartID = this.$route.params.id

    try {
      const resData = await axios.get(`${process.env.VUE_APP_API}/chart/get/${chartID}`)

      this.chartData = JSON.parse(resData.data.chart.data)
      this.title = resData.data.chart.title
      this.tableBody(this.chartData)
    } catch (e) {
      if (e.code === 'ERR_NETWORK') {
        this.isError = 'Server is not available'
      } else {
        this.isError = e.response.data.message
      }
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    tableBody(chartData) {

      chartData[0].forEach((_, index) => {

        const obj = {}

        obj.index = index

        chartData.forEach((item, i) => {
          obj[`y${i}`] = item[index]
        })
        this.tableData.push(obj)
      })
    }
  }
}
</script>

<style>
.chart {
  display: grid;
  grid-template-columns: 1fr 300px;
}

.chart__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.setting__btn {
  margin: 20px auto;
  display: block;
}
</style>