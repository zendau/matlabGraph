<template>
  <v-container>
    <h1>Chart</h1>
    <div v-if="isError">
      {{ isError }}
    </div>
    <div v-else>
      <!-- {{ chartData }} -->
      <canvas class="w-100" ref="canvas"></canvas>
      <v-slider v-model="max" min="0" max="5" rounded @update:modelValue="updateSlider" label="Max characters">
      </v-slider>
    </div>
  </v-container>
</template>

<script>

import axios from 'axios'
import DrawChart from '@/utils/chart'

export default {
  data: () => ({ rating: 3, isError: '', chartData: null, max: 5, chart: null }),
  async mounted() {


    const chartID = this.$route.params.id

    try {
      const resData = await axios.get(`${process.env.VUE_APP_API}/chart/get/${chartID}`)
      this.chartData = JSON.parse(resData.data.chart.data)

      this.chart = new DrawChart(this.$refs.canvas)
      this.chart.draw(this.chartData, 5)

      //chart(this.$refs.canvas, this.chartData, 5)
    } catch (e) {
      console.log(e)
      this.isError = e.response.data.message
    }



  },
  methods: {
    updateSlider() {
      this.chart.draw(this.chartData, Math.round(this.max))
    }
  }
}
</script>