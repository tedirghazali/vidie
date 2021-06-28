<template>
  <div class="dark">
    <div class="gridColumns-4 gridItemsCenter gap-8">
      <div v-for="n in 12" class="bd-1 bdDarker pdX-5 pdTop-3 pdBottom-4 rd-2 wd-100">
        <div class="txtCenter txtBold txt-5">{{ getMonthNames[Number(n) - 1] }}</div>
        <BasicCalendar :year="setYearRef" :month="n" :weekday="'narrow'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, inject, watch } from 'vue'
import { handleCalendar } from '../../assets/alga-vue.es.js' //../../assets/alga-vue.es.js
import BasicCalendar from './BasicCalendar.vue'

export default defineComponent({
  name: 'CalendarPage',
  props: {
    locale: {
      type: String,
      default: 'en-US'
    },
    weekday: {
      type: String,
      default: 'narrow'
    }
  },
  components: {
    BasicCalendar
  },
  setup(props) {
    const locale = toRef(props, 'locale')
    const weekday = toRef(props, 'weekday')
    
    const year = inject<number>('year', new Date().getFullYear())
    
    const { setYearRef, getMonthNames } = handleCalendar(year, null, null, locale, weekday)
    
    watch(year, (newVal, oldVal) => {
      setYearRef.value = year.value
    })
    
    return {
      setYearRef,
      getMonthNames
    }
  }
})
</script>
