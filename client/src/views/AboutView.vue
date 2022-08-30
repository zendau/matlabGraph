<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn>test</v-btn>
    <v-rating v-model="rating" bg-color="orange-lighten-1" color="blue"></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>