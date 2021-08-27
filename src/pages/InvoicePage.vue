<script lang="ts" setup>
import { reactive } from 'vue'
import InvoiceTable from '../components/table/InvoiceTable.vue'

const entries = reactive<Array<{id: number, description: string, quantity: number, price: number, amount: number}>>([
  { id: 1, description: 'Barang-1', quantity: 3, price: 15000, amount: 0 },
  { id: 2, description: 'Barang-2', quantity: 5, price: 78000, amount: 0 },
  { id: 3, description: 'Barang-3', quantity: 9, price: 6000, amount: 0 },
  { id: 4, description: 'Barang-4', quantity: 2, price: 1000, amount: 0 }
])

defineExpose({
  entries
})
</script>

<template>
  <div style="margin: 20px">
    <InvoiceTable :entries="entries" />
  </div>
</template>

<style scoped>
@inject table;
</style>
