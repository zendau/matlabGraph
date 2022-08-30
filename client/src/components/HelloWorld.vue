<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-file-input accept=".mat" label="File input" :rules="fileRules" show-size clearable
      @update:modelValue="updateFileData">
    </v-file-input>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

  </v-form>
  <v-progress-circular :size="80" :width="7" color="green" indeterminate>
  </v-progress-circular>
  <v-alert type="success" max-width="300" height="60" >test</v-alert>
  <v-alert type="error" max-width="300" height="60" >test</v-alert>

</template>

<script>

import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      v => (v && v.length >= 4) || 'Name must be bigger than 4 characters',
    ],
    fileRules: [
      v => !!v[0] || 'File is required',
    ],
    file: null
  }),
  methods: {
    async validate() {
      const res = await this.$refs.form.validate()
      console.log('res', res)
      if (res.valid === false) return
      console.log('name', this.name, this.file)

      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.name)

      const resData = await axios.post(`${process.env.VUE_APP_API}/chart/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (resData.status) {
        console.log(resData.data.path)
      } else {
        // TODO: Добавить обработку ошибки с алертом
        console.lo('error')
      }
    },
    updateFileData(test) {
      console.log('test', test)
      this.file = test[0]
    }
  },
}
</script>