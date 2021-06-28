<template>
  <div class="dark">
    <div class="gridColumns-7 gridItemsCenter">
      <div v-for="wday in weekDays" :key="wday" :class="['mgY-1', 'wd-100', 'txtCenter']">
        <div :class="['pd-2']">{{ wday }}</div>
      </div>
      <div v-for="pday in prevDays" :key="pday" :class="['mgY-1', 'wd-100', 'txtCenter']">
        <div :class="['pd-2']">{{ pday }}</div>
      </div>
      <div v-for="mday in monthDays" :key="mday" :class="['mgY-1', 'wd-100', 'txtCenter']" @click="eventDate(mday)">
        <div :class="['pd-2']">{{ mday }}</div> <!-- , {'txtGray': isCurrentCalendar(cal) === false, 'eventNone': isCurrentDate(cal) === false, 'cursorPointer': isCurrentDate(cal)} ||| , {'green': resultDate === cal} ||| filterCalendarDate(cal, 2) -->
      </div>
      <div v-for="nday in nextDays" :key="nday" :class="['mgY-1', 'wd-100', 'txtCenter']">
        <div :class="['pd-2']">{{ nday }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, computed } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js' //../../assets/alga-vue.es.js
import { date as dt } from '../../assets/alga.min.js'

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
    weekday: {
      type: String,
      default: 'short'
    }
  },
  emits: ['update:modelValue', 'action'],
  setup(props, context) {
    const resultDate = ref<string>('')
    const { modelValue: current, year: yearRef, month: monthRef, locale, weekday } = toRefs(props)
    const { weekDays, prevDays, monthDays, nextDays } = useCalendar(yearRef, monthRef, null, locale, weekday)
    
    /*const weekDays = computed<string[]>(() => {
      return dt.days(locale.value, weekday.value)
    })
    
    const prevDays = computed<string[]>(() => {
      const getFirstDay = Number(new Date(yearRef.value, Number(monthRef.value) - 1, 1).getDay())
      let restPrevDays = []
      if(getFirstDay > 0) {
        const getPrevDay = Number(dt.daysInMonth(yearRef.value, Number(monthRef.value) - 1)) - (getFirstDay - 1)
        for(let i = getPrevDay; i <= Number(dt.daysInMonth(yearRef.value, Number(monthRef.value) - 1)); i++) {
          restPrevDays.push(i)
        }
      }
      
      return restPrevDays
    })
    
    const monthDays = computed<number>(() => {
      return dt.daysInMonth(yearRef.value, monthRef.value)
    })
    
    const nextDays = computed<string[]>(() => {
      const getLastDay = Number(new Date(yearRef.value, Number(monthRef.value) - 1, Number(dt.daysInMonth(yearRef.value, monthRef.value))).getDay())
      let restNextDays = []
      if(getLastDay < 6) {
        const getNextDay = 6 - getLastDay
        for(let i = 1; i <= getNextDay; i++) {
          restNextDays.push(i)
        }
      }
      
      return restNextDays
    })*/
    
    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
      context.emit('action')
    }

    watch(current, (newVal, oldVal) => {
      resultDate.value = props.modelValue
    })

    return {
      weekDays,
      prevDays,
      monthDays,
      nextDays,
      eventDate,
      resultDate
    }
  }
})
</script>
