<script lang="ts" setup>
import { toRefs } from 'vue'

interface Props {
  caption?: string,
  col?: boolean,
  header?: boolean,
  columns?: any[],
  body?: boolean,
  entries?: any[],
  footer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  caption: '',
  col: false,
  header: true,
  columns: [],
  body: true,
  entries: [],
  footer: false
})

const { entries } = toRefs<any>(props)

defineExpose({
  entries
})
</script>

<template>
  <table class="table">
    <caption class="tableCaption" v-if="caption === 'top' || caption === 'bottom'" :class="{'captionTop': caption === 'top'}">
      <slot name="tableCaption"></slot>
    </caption>
    <colgroup v-if="col">
      <slot name="tableCol"></slot>
    </colgroup>
    <thead class="tableHead">
      <tr v-if="header">
        <th v-for="column in columns" scope="col">
          <div class="flexBetween itemsCenter">
            <div>{{ column }}</div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up eventNone" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
          </div>
        </th>
      </tr>
      <slot name="tableHead"></slot>
    </thead>
    <tbody class="tableBody">
      <tr v-if="body">
        <template v-for="entry in entries" :key="entry">
          <!--<td v-for="val in Object.values(entry)" :key="val">{{ val }}</td>-->
          <td></td>
        </template>
      </tr>
      <slot></slot>
    </tbody>
    <tfoot class="tableFoot" v-if="footer">
      <slot name="tableFoot"></slot>
    </tfoot>
  </table>
</template>
