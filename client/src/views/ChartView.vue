<template>
  <v-container>
    <div class="chart__header">
      <h1>Chart - {{this.title}}</h1>
      <v-btn @click="isOpenSetting = !isOpenSetting" color="green">{{isOpenSetting ? 'Close' : 'Open'}} settings</v-btn>
    </div>
    <div v-if="isError">
      {{ isError }}
    </div>
    <div v-else>
      <div :class="{'chart': isOpenSetting }">
        <canvas class="w-100" ref="canvas"></canvas>
        <div class="chart__setting" v-if="isOpenSetting">
          <h2 class="text-center">Chart setting</h2>
          <h3 class="text-center">Smoothness level</h3>
          <v-slider v-model="max" min="0" max="5" rounded @update:modelValue="updateSlider" label="Max characters">
          </v-slider>
          <v-divider class="ma-5"></v-divider>
          <v-btn class="setting__btn" @click="updateColors" color="blue">Update colors</v-btn>
  
        </div>
      </div>
      <v-divider class="ma-5"></v-divider>
      <h2 class="text-center mt-10">Chart data</h2>
      <v-table fixed-header height="300px" v-if="desserts.length > 0">
        <thead>
          <tr>
            <th class="text-left" v-for="(item, index) in Object.keys(desserts[0])" :key="item">
              {{index === 0 ? '№' : index === 1 ? 'x1' : item}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in desserts" :key="index">
            <td v-for="col in item" :key="col">{{ col }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-container>
</template>

<script>

import axios from 'axios'
import DrawChart from '@/utils/chart'

export default {
  data: () => ({
    rating: 3, isError: '', chartData: null, max: 5, chart: null, desserts: [], title: null, isOpenSetting: false
  }),
  async mounted() {


    const chartID = this.$route.params.id

    try {
      const resData = await axios.get(`${process.env.VUE_APP_API}/chart/get/${chartID}`)
      const chartData = JSON.parse(resData.data.chart.data)
      this.title = resData.data.chart.title

      this.chart = new DrawChart(this.$refs.canvas, chartData)
      this.chart.draw()
      this.tableBody(chartData)
      //chart(this.$refs.canvas, this.chartData, 5)
    } catch (e) {
      console.log(e)
      this.isError = e.response.data.message
    }



  },
  methods: {
    updateColors() {
      this.chart.getRandomColors()
      this.chart.draw()
    },
    updateSlider() {
      this.chart.updateSmoot = Math.round(this.max)
      this.chart.draw()
    },
    tableBody(chartData) {

      chartData[0].forEach((_, index) => {

        const obj = {}

        obj.index = index

        chartData.forEach((item, i) => {
          obj[`y${i}`] = item[index]
        })
        this.desserts.push(obj)
      })
      console.log(this.desserts)
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