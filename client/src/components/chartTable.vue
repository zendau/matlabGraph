<template>
  <h2 class="text-center mt-10">Chart data</h2>
  <v-table fixed-header height="300px" v-if="tableData.length > 0">
    <thead>
      <tr>
        <th class="text-left" v-for="(item, index) in Object.keys(tableData[0])" :key="item">
          {{index === 0 ? '№' : index === 1 ? 'x1' : item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tableData" :key="index">
        <td v-for="col in item" :key="col">{{ col }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array
      }
    }
  }
</script>