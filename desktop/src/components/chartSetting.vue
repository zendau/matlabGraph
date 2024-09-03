<template>
  <div class="chart__setting">
    <h2 class="text-center">Chart setting</h2>
    <h3 class="text-center">Smoothness level</h3>
    <v-slider min="0" max="5" v-model="smooth" rounded @update:modelValue="$emit('updateSlider', smooth)">
    </v-slider>
    <v-divider class="ma-5"></v-divider>
    <v-btn class="setting__btn" @click="$emit('updateColors')" color="blue">Update colors</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    smooth: 5
  })
}
</script>