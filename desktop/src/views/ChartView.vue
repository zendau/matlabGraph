<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-progress-circular v-if="isLoading" :size="90" :width="7" color="blue" indeterminate></v-progress-circular>
    <div v-else>
      <v-alert type="error" v-if="isError">{{ isError }}</v-alert>
      <div v-else>
        <div class="chart__header">
          <h1>Chart - {{chartData.title}}</h1>
          <v-btn @click="isOpenSetting = !isOpenSetting" color="green">{{isOpenSetting ? 'Close' : 'Open'}} settings
          </v-btn>
        </div>
        <chartCanvas :chartData="chartData.data" :isOpenSetting="isOpenSetting" />
        <v-divider class="ma-5"></v-divider>
        <chartTable :tableData="tableData" />
      </div>
    </div>
  </v-container>
</template>

<script>

import chartTable from '@/components/chartTable.vue'
import chartCanvas from '@/components/chartCanvas.vue'
import Store from 'electron-store';

const store = new Store();


export default {
  components: { chartTable, chartCanvas },
  data: () => ({
    isError: '', chartData: [], tableData: [], isOpenSetting: false, isLoading: true
  }),
  async mounted() {
    this.isLoading = true
    const chartId = this.$route.params.id

    try {
      this.chartData = store.get(chartId)
      this.tableBody(this.chartData.data)
    } catch {
      this.isError = 'Something went wrong'
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