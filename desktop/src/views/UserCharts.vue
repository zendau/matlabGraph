<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-alert type="error" v-if="isError" max-width="400">{{ isError }}</v-alert>
    <charDataList v-else :isLoading="false" :chartsData="chartsData" />
  </v-container>

</template>

<script>

import charDataList from '@/components/chartDataList.vue'

import Store from 'electron-store';

const store = new Store();


export default {
  components: {
    charDataList
  },
  data: () => ({
    chartsData: [], isError: ''
  }),
  async mounted() {

    try {
      const userCharts = Object.keys(store.store).map(key => ({
        id: key,
        title: store.store[key]['title']
      }))
      if (userCharts) {
        this.chartsData = userCharts
        console.log(this.chartsData)
      }
    } catch (e) {
      console.log('e', e)
      this.isError = e
    }


  }
}
</script>