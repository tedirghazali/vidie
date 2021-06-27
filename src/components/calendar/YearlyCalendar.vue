<template>
  <div class="dark">
    <div class="gridColumns-4 gridItemsCenter gap-8">
      <div v-for="n in 12" class="bd-1 bdDarker pdX-5 pdTop-3 pdBottom-4 rd-2 wd-100">
        <div class="txtCenter txtBold txt-5">{{ getMonthNames[Number(n) - 1] }}</div>
        <BasicCalendar :year="yearRef" :month="n" :weekday="'narrow'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { date as dt } from '../../assets/alga.min.js'
import { useCalendarBar } from '../../assets/alga-vue.es.js' //../../assets/alga-vue.es.js
import BasicCalendar from './BasicCalendar.vue'

export default defineComponent({
  name: 'CalendarPage',
  props: {
    year: {
      type: Number,
      default: new Date().getFullYear()
    }
  },
  components: {
    BasicCalendar
  },
  setup(props) {
    const yearRef = toRef(props, 'year')
    //const { getMonthNames } = useCalendarBar()
    const getMonthNames = dt.months()
    
    return {
      yearRef,
      getMonthNames
    }
  }
})
</script>
