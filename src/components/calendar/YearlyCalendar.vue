<template>
  <div class="dark">
    <div class="gridColumns-4 gridItemsCenter gap-8">
      <div v-for="n in 12" class="bd-1 bdDarker pdX-5 pdTop-3 pdBottom-4 rd-2 wd-100">
        <div class="txtCenter txtBold txt-5">{{ getMonthNames[Number(n) - 1] }}</div>
        <BasicCalendar v-model="date" :year="setYearRef" :month="n" :dayType="'narrow'" :events="filteredEvents(events, n)" @action="emitDate()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, inject, watchEffect } from 'vue'
import { handleCalendar } from 'alga-vue' //../../assets/alga-vue.es.js
import BasicCalendar from './BasicCalendar.vue'

export default defineComponent({
  name: 'CalendarPage',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
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
  emits: ['update:modelValue'],
  components: {
    BasicCalendar
  },
  setup(props, context) {
    const date = ref<string>('')
    const { locale, dayType, monthType, events } = toRefs<any>(props)
    
    const year = inject<any>('year', Number(new Date().getFullYear()))
    
    const { setYearRef, getMonthNames } = handleCalendar(year, null, null, locale, dayType, monthType)
    
    watchEffect(() => {
      setYearRef.value = year.value
    })
    
    const emitDate = () => {
      context.emit('update:modelValue', date.value)
    }
    
    const filteredEvents = (events: any[], monthNum: number) => {
      return events.filter((i: any) => {
        return Number(new Date(i.startdate).getMonth()) + 1 === monthNum
      })
    }
    
    return {
      date,
      emitDate,
      setYearRef,
      getMonthNames,
      events,
      filteredEvents
    }
  }
})
</script>
