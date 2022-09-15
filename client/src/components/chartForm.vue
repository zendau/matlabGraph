<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <h1 class="mb-5" >Add matlab data file</h1>
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

import axios from 'axios'

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
  methods: {
    async validate() {
      const res = await this.$refs.form.validate()
      if (res.valid === false) return

      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.name)

      this.isLoading = true

      try {
        const resData = await axios.post(`${process.env.VUE_APP_API}/chart/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })



        if (resData.status) {
          this.addToLocalStore(resData.data.chart)
          this.$router.push(`/chart/${resData.data.chart.id}`)
        }

      } catch (e) {
        this.errorMessage = e.response.data.message
      } finally {
        this.isLoading = false
      }
    },
    addToLocalStore(chartData) {
      let userCharts = JSON.parse(localStorage.getItem(process.env.VUE_APP_LOCAL_STORE_CHARTS))
      if (userCharts) {
        userCharts.push(chartData)
      } else {
        userCharts = []
        userCharts.push(chartData)
      }

      localStorage.setItem(process.env.VUE_APP_LOCAL_STORE_CHARTS, JSON.stringify(userCharts))
    },
    updateFileData(test) {
      this.file = test[0]
    }
  },
}
</script>