<template>
  <div class="dark">
    <div class="gridColumns-4 gridItemsCenter gap-8">
      <div v-for="n in 12" class="bd-1 bdDarker pdX-5 pdTop-3 pdBottom-4 rd-2 wd-100">
        <div class="txtCenter txtBold txt-5">{{ getMonthNames[Number(n) - 1] }}</div>
        <BasicCalendar :year="setYearRef" :month="n" :dayType="'narrow'" :events="events.filter(i => Number(new Date(i.startdate).getMonth()) + 1 === n)" />
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
    dayType: {
      type: String,
      default: 'narrow'
    },
    monthType: {
      type: String,
      default: 'long'
    },
    events: {
      type: Array,
      default: []
    }
  },
  components: {
    BasicCalendar
  },
  setup(props) {
    const locale = toRef(props, 'locale')
    const dayType = toRef(props, 'dayType')
    const monthType = toRef(props, 'monthType')
    const events = toRef(props, 'events')
    
    const year = inject<number>('year', new Date().getFullYear())
    
    const { setYearRef, getMonthNames } = handleCalendar(year, null, null, locale, dayType, monthType)
    
    watch(year, (newVal, oldVal) => {
      setYearRef.value = year.value
    })
    
    return {
      setYearRef,
      getMonthNames,
      events
    }
  }
})
</script>
