<script lang="ts" setup>
import { ref, toRefs } from 'vue'

interface Props {
  caption?: string,
  captionText?: string,
  columns?: any[],
  header?: number,
  entries?: any[],
  footer?: boolean,
  footerRows?: any[],
  sort?: any
}

withDefaults(defineProps<Props>(), {
  caption: '',
  captionText: '',
  columns: [],
  header: 0,
  entries: [],
  footer: false,
  footerRows: [],
  sort: {}
})

const emit = defineEmits<{
  (e: 'update:sort', value: any): void
}>()
</script>

<template>
  <table class="table tableBorder tableStripe">
    <caption class="tableCaption" v-if="caption === 'top' || caption === 'bottom'" :class="{'captionTop': caption === 'top'}">
      {{ captionText }}
    </caption>
    <thead class="tableHead">
      <tr v-for="(column, index) in columns" :key="index" class="tableRow">
        <th v-for="(col, ind) in column" :key="ind" scope="col" :colspan="col.colspan" :rowspan="col.rowspan" :style="{'text-align': col.align, 'vertical-align': col.valign, width: col.width, 'background-color': col.bg, color: col.fg}">
          <div v-if="!col.filter" style="display: flex; justify-content: space-between; items-content: center;">
            <div>{{ col.text }}</div>
            <div v-if="col.sortable">
              <template v-if="sort.column === col.name && sort.by === 'asc'">
                <div @click="emit('update:sort', {column: col.name, by: 'desc'})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16" style="pointer-events: none;">
                    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                  </svg>
                </div>
              </template>
              <template v-else-if="sort.column === col.name && sort.by === 'desc'">
                <div @click="emit('update:sort', {column: col.name, by: ''})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16" style="pointer-events: none;">
                    <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                  </svg>
                </div>
              </template>
              <template v-else>
                <span @click="emit('update:sort', {column: col.name, by: 'asc'})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort" viewBox="0 0 16 16" style="pointer-events: none;">
                    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5z"></path>
                    <path d="M9.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L9.5 11.293V2.5z"></path>
                  </svg>
                </span>
              </template>
            </div>
          </div>
          <div v-else>
            <input type="search" class="input" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="tableBody">
      <tr v-for="(entry, index) in entries" :key="index" :style="{'background-color': entry.bg, color: entry.fg}">
        <td v-for="(column, ind) in columns[header]" :key="ind" :colspan="entry.colspan" :rowspan="entry.rowspan" :style="{'text-align': column.align, 'vertical-align': column.valign, width: column.width, 'background-color': column.bg, color: column.fg}">
          <template v-if="!column.component && !column.checkbox">{{ entry[column.name] }}</template>
          <template v-else>
            <template v-if="column.checkbox">
              <input type="checkbox" class="check" />
            </template>
            <template v-else>
              <component :is="column.component" :entry="entry"></component>
            </template>
          </template>
        </td>
      </tr>
    </tbody>
    <tfoot class="tableFoot" v-if="footer">
      <tr v-for="(rows, index) in footerRows" :key="index">
        <td v-for="(row, ind) in rows" :key="ind" :colspan="row.colspan ? row.colspan : 0">{{ row.text }}</td>
      </tr>
    </tfoot>
  </table>
</template>
