<template>
  <chartForm />
</template>

<script>
import { defineComponent } from 'vue';


import chartForm from '@/components/chartForm.vue';

export default defineComponent({
  name: 'mainPage',
  components: {
    chartForm,
  },
});
</script>
