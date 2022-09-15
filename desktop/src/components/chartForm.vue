<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <h1 class="mb-5">Add matlab data file</h1>
    <v-alert v-if="errorMessage" type="error" max-width="600" max-height="60" class="mb-5">{{ errorMessage }}</v-alert>
    <v-form ref="form" v-model="valid" lazy-validation class="w-75 d-flex flex-column align-center">
      <v-text-field prepend-icon="mdi-clipboard-outline" v-model="name" :counter="15" :rules="nameRules" label="Name"
        required class="w-100"></v-text-field>
      <v-file-input accept=".mat" label="File input" :rules="fileRules" show-size clearable class="w-100"
        @update:modelValue="updateFileData">
      </v-file-input>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Create chart
      </v-btn>
    </v-form>
    <v-progress-linear class="mt-5" v-if="isLoading" indeterminate value="15"></v-progress-linear>
  </v-container>
</template>

<script>

//import axios from 'axios'
import matlabConverter from '@/libs/matlab/subProcess'
import * as uuid from 'uuid'

import Store from 'electron-store';

const store = new Store();


export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 15) || 'Name must be less than 15 characters',
      v => (v && v.length >= 4) || 'Name must be bigger than 4 characters',
    ],
    fileRules: [
      v => !!v[0] || 'File is required',
    ],
    file: null,
    isLoading: false,
    errorMessage: null
  }),
  mounted() {
    console.log(store.store)
  },
  methods: {
    async validate() {
      const res = await this.$refs.form.validate()
      if (res.valid === false) return

      try {
        this.isLoading = true
        const resMatlab = await matlabConverter(this.file.path)
        const chartData = {
          id: uuid.v4(),
          title: this.name,
          data: JSON.parse(resMatlab[0])
        }

        this.addToLocalStore(chartData)
        this.$router.push(`/chart/${chartData.id}`)
      } catch (e) {
        this.errorMessage = e
      } finally {
        this.isLoading = false
      }

    },
    addToLocalStore(chartData) {
      store.set(chartData.id, chartData);
    },
    updateFileData(test) {
      this.file = test[0]
    }
  },
}
</script>