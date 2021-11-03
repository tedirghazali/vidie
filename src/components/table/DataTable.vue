<script lang="ts" setup>
import { ref } from 'vue'
import Table from './Table.vue'


interface Props {
  caption?: string,
  captionText?: string,
  columns?: any[],
  header?: number,
  entries?: any[],
  footer?: boolean,
  footerRows?: any[],
  sort?: any,
  filter?: any,
  checkList?: any[]
}

withDefaults(defineProps<Props>(), {
  caption: '',
  captionText: '',
  columns: [],
  header: 0,
  entries: [],
  footer: false,
  footerRows: [],
  sort: {},
  filter: {},
  checkList: []
})

const checkedEntries = ref<any[]>([])

defineExpose({
  checkedEntries
})
</script>

<template>
  <div class="dataTable">
    <Table :columns="columns" :entries="entries" :footer="true" :footer-rows="footerRows" v-model:sort="sort" v-model:filter="filter" v-model:checkList="checkList" />
  </div>
</template>
