<script lang="ts" setup>
import { toRefs } from 'vue'
import { useCalculate } from '../../assets/alga-vue.es.js'
import { number as num } from 'alga-js'

interface Props {
  columns?: Array<{name: string, text: string, bg?: string, fg?: string, width?: string, align?: string}>,
  entries?: any[],
  rates?: any[],
  quantity?: string,
  price?: string,
  amount?: string,
  currency?: string,
  locale?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: [
    {name: 'id', text: 'SN.', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '50px', align: 'center'},
    {name: 'description', text: 'Item Description', bg: 'rgba(0, 0, 0, 0.009)', fg: 'currentColor', width: 'auto', align: 'left'},
    {name: 'quantity', text: 'Quantity', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '100px', align: 'right'},
    {name: 'price', text: 'Price', bg: 'rgba(0, 0, 0, 0.009)', fg: 'currentColor', width: '150px', align: 'right', format: 'currency'},
    {name: 'amount', text: 'Amount', bg: 'rgba(0, 0, 0, 0.0125)', fg: 'currentColor', width: '150px', align: 'right', format: 'currency'},
  ],
  entries: [],
  rates: [],
  quantity: 'quantity',
  price: 'price',
  amount: 'amount',
  currency: 'USD',
  locale: 'en-US'
})

const { columns, entries, rates, quantity, price, amount, currency, locale } = toRefs(props)

const { setEntries, setRates, getEntries, getSubTotal, getRates, getTotal } = useCalculate(quantity.value, price.value, amount.value)

setEntries.value = entries.value
setRates.value = rates.value

defineExpose({
  columns, 
  getEntries,
  getSubTotal,
  getRates,
  getTotal,
  currency, 
  locale
})
</script>

<template>
  <table class="table tableBorder tableInvoice dark" role="table">
    <thead class="tableHead" role="rowgroup">
      <tr class="tableRow" role="row">
        <th v-for="(column, index) in columns" :key="index" class="tableScope" scope="col" role="columnheader" aria-sort="none" :style="{'width': column.width, 'text-align': column.align, 'background-color': column.bg, 'color': column.fg}">{{ column.text }}</th>
      </tr>
    </thead>
    <tbody class="tableBody" role="rowgroup">
      <tr v-for="(entry, index) in getEntries" :key="index" class="tableRow" role="row">
        <td v-for="(col, ind) in columns" :key="ind" class="tableCell" role="cell" :style="{'text-align': col.align, 'background-color': col.bg, 'color': col.fg}">{{ (col.format === 'currency') ? num.currency(entry[col.name], currency, locale) : entry[col.name] }}</td>
        <!--<th class="tableScope" role="rowheader"></th>-->
      </tr>
    </tbody>
    <tfoot class="tableFoot" role="rowgroup">
      <tr class="tableRow" role="row">
        <td class="tableCell" :colspan="Number(columns.length) - 2" :rowspan="Number(rates.length) + 2" role="cell"></td>
        <th class="tableScope" scope="row" role="rowheader">Sub Total</th>
        <td class="tableCell" role="cell" :style="{'text-align': columns[Number(columns.length) - 1].align}">{{ num.currency(getSubTotal, currency, locale) }}</td>
      </tr>
      <tr v-for="(rate, index) in getRates" :key="index" class="tableRow" role="row">
        <th class="tableScope" scope="row" role="rowheader">{{ rate.text }}</th>
        <td class="tableCell" role="cell" :style="{'text-align': columns[Number(columns.length) - 1].align}">{{ num.currency(rate.amount, currency, locale) }}</td>
      </tr>
      <tr class="tableRow" role="row">
        <th class="tableScope" scope="row" role="rowheader">Total</th>
        <td class="tableCell" role="cell" :style="{'text-align': columns[Number(columns.length) - 1].align}">{{ num.currency(getTotal, currency, locale) }}</td>
      </tr>
    </tfoot>
  </table>
</template>
