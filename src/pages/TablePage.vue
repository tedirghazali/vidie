<script lang="ts" setup>
import { ref, reactive, toRef, watch } from 'vue'
import Table from '../components/table/Table.vue'
import rawEntries from '../assets/raw-entries.js'

const columns = reactive<any[]>([
  [
    {name: 'id', text:'ID', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: false, checkbox: true, rowspan: 2, valign: 'middle'}, 
    {name: 'name', text:'Name', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}, 
    {name: 'position', text: 'Position', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}, 
    {name: 'office', text: 'Office', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}, 
    {name: 'extension', text: 'Extension', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}, 
    {name: 'startdate', text: 'Start Date', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}, 
    {name: 'salary', text: 'Salary', bg: '#fff;', fg: '#333;', align: 'left', width: 'auto', sortable: true}
  ],
  [
    {filter: true},
    {filter: true},
    {filter: true},
    {filter: true},
    {filter: true},
    {filter: true}
  ]
])

const entries = rawEntries

const footerRows = reactive<any[]>([
  [
    {text: 'Sub Total', colspan: 6},
    {text: 200}
  ],
  [
    {text: 'All Total', colspan: 6},
    {text: 45000}
  ]
])

const sort = ref<any>({})

watch(sort, () => {
  console.log(sort.value)
})

defineExpose({
  columns,
  entries,
  footerRows,
  sort
})
</script>

<template>
  <h1>Table Element</h1>
  <Table caption="top" caption-text="This is caption text" :columns="columns" :entries="entries" :footer="true" :footer-rows="footerRows" v-model:sort="sort" />
</template>

<style scoped>
@inject table;
</style>
