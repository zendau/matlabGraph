<template>
  <div :class="{'chart': isOpenSetting }">
    <canvas class="w-100" ref="canvas"></canvas>
    <chart-setting v-if="isOpenSetting" @updateSlider="updateSlider" @updateColors="updateColors" />
  </div>
</template>

<script>

import chartSetting from './chartSetting.vue';
import DrawChart from '@/composables/chart'

export default {
  components: { chartSetting },
  props: {
    isOpenSetting: {
      type: Boolean
    },
    chartData: {
      type: Array
    }

  },
  data: () => ({
    chart: null
  }),
  mounted() {
    this.chart = new DrawChart(this.$refs.canvas, this.chartData)
    this.chart.draw()
  },
  methods: {
    updateColors() {
      this.chart.getRandomColors()
      this.chart.draw()
    },
    updateSlider(smoth) {
      this.chart.updateSmoot = Math.round(smoth)
      this.chart.draw()
    },
  }
}
</script>