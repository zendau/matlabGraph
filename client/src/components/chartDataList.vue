<template>
  <div class="fill-height d-flex justify-center align-center">
    <v-progress-circular v-if="isLoading" :size="90" :width="7" color="blue" indeterminate></v-progress-circular>
    <div v-else class="w-100">
      <v-list v-if="chartsData.length">
        <v-list-item v-for="item in chartsData" :key="item.id" class="text-center" :title="item.title"
          :to="`/chart/${item.id}`">
        </v-list-item>
      </v-list>
      <h1 class="align-self-center text-center" v-else>Not have charts</h1>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    },
    chartsData: {
      type: Array,
      required: true
    }
  }
}
</script>