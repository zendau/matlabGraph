<template>
  <div>
    <h1>Chart</h1>
    <div v-if="isError">
      {{ isError }}
    </div>
    <div v-else>
      <!-- {{ chartData }} -->
      <canvas ref="canvas"></canvas>
      <v-slider v-model="max" min="0" max="5"  rounded @update:modelValue="updateSlider"  label="Max characters">
      </v-slider>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import chart from '@/utils/chart'

export default {
  data: () => ({ rating: 3, isError: '', chartData: 'test', max: 5 }),
  async mounted() {


    const chartID = this.$route.params.id

    try {
      const resData = await axios.get(`${process.env.VUE_APP_API}/chart/get/${chartID}`)
      this.chartData = JSON.parse(resData.data.chart.data)
      chart(this.$refs.canvas, this.chartData, 5)
    } catch (e) {
      console.log(e)
      this.isError = e.response.data.message
    }



  },
  methods: {
    updateSlider() {
      chart(this.$refs.canvas, this.chartData, Math.round(this.max))
    }
  }
}
</script>