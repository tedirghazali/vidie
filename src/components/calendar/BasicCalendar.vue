<template>
  <div class="dark">
    <div class="gridColumns-7 gridItemsCenter">
      <div v-for="wday in getDayNames" :key="wday" class="mgY-1 wd-100 txtCenter txtGray">
        <div class="pd-2">{{ wday }}</div>
      </div>
      <div v-for="pday in getPrevDays" :key="pday" class="mgY-1 wd-100 txtCenter txtGray">
        <div class="pd-2">{{ pday }}</div>
      </div>
      <div v-for="mday in getMonthDays" :key="mday" :class="['mgY-1', 'wd-100', 'txtCenter']" @click="eventDate(mday)">
        <div v-if="`${mday}` in getEvents" class="pd-2 relative">
          <div>{{ mday }}</div>
          <span class="dot absolute bottom-0 left-40" style="--dot: 6px"></span>
        </div>
        <div v-else :class="['pd-2']">{{ mday }}</div> <!-- , {'txtGray': isCurrentCalendar(cal) === false, 'eventNone': isCurrentDate(cal) === false, 'cursorPointer': isCurrentDate(cal)} ||| , {'green': resultDate === cal} ||| filterCalendarDate(cal, 2) -->
      </div>
      <div v-for="nday in getNextDays" :key="nday" class="mgY-1 wd-100 txtCenter txtGray">
        <div class="pd-2">{{ nday }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js' //../../assets/alga-vue.es.js
//import { date as dt } from '../../assets/alga.min.js'

export default defineComponent({
  name: 'BasicCalendar',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: Number(new Date().getMonth()) + 1
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    dayType: {
      type: String,
      default: 'short'
    },
    events: {
      type: Array,
      default: []
    }
  },
  emits: ['update:modelValue', 'action'],
  setup(props, context) {
    const resultDate = ref<string>('')
    const { modelValue: current, year: yearRef, month: monthRef, locale, dayType, events } = toRefs(props)
    const { getDayNames, getPrevDays, getMonthDays, getNextDays, setEvents, getEvents } = useCalendar(yearRef, monthRef, null, locale, dayType)
    
    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
      context.emit('action')
    }
    
    setEvents.value = events.value
    
    watch(events, (newVal, oldVal) => {
      setEvents.value = events.value
    })
    
    watch(current, (newVal, oldVal) => {
      resultDate.value = props.modelValue
    })

    return {
      getDayNames,
      getPrevDays,
      getMonthDays,
      getNextDays,
      getEvents,
      eventDate,
      resultDate
    }
  }
})
</script>
