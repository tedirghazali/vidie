<template>
  <div class="flexBetween itemsCenter">
    <div class="btnGroup">
      <button type="button" class="btn bd-1 flexCenter itemsCenter darker" @click="controlEvent('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="eventNone" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <button type="button" class="btn bd-1 flexCenter itemsCenter darker" @click="controlEvent('next')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="eventNone" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
      <button type="button" class="btn bd-1 darker" @click="controlEvent('')">Today</button>
    </div>
    <div class="txtBold txt-6 txtOpacity-7 txtBlack dark">{{ getCalendarTitle }}</div>
    <div class="btnGroup">
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'yearly'}, 'darker']" @click="toggledEvent('yearly')">Year</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'monthly'}, 'darker']" @click="toggledEvent('monthly')">Month</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'weekly'}, 'darker']" @click="toggledEvent('weekly')">Week</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'daily'}, 'darker']" @click="toggledEvent('daily')">Day</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import { handleCalendar } from 'alga-vue' //../../assets/alga-vue.es.js

export default defineComponent({
  name: 'EventCalendarBar',
  props: {
    toggle: {
      type: String,
      default: 'monthly'
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: Number(new Date().getMonth()) + 1
    },
    day: {
      type: Number,
      default: new Date().getDate()
    },
    week: {
      type: Number
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    dayType: {
      type: String,
      default: 'short'
    },
    monthType: {
      type: String,
      default: 'long'
    }
  },
  emits: ['update:toggle', 'update:year', 'update:month', 'update:day', 'update:week', 'action'],
  setup(props, context) {
    const toggled = ref<string>('')
    const { toggle: toggleRef, year: yearRef, month: monthRef, day: dayRef, locale, dayType, monthType } = toRefs(props)
    const {
      setYearRef,
      setMonthRef,
      setDayRef,
      setWeeks,
      setCalendarType,
      startYear,
      endYear,
      getRangeYears,
      getMonthNames,
      getDayNames,
      getWeeks,
      getCalendarTitle,
      handleYear,
      handleMonth,
      handleWeek,
      handleDay
    } = handleCalendar(yearRef, monthRef, dayRef, locale, dayType, monthType)
    
    toggled.value = props.toggle
    setCalendarType.value = toggled.value
    
    watch(toggleRef, () => {
      toggled.value = props.toggle
      setCalendarType.value = toggled.value
      setYearRef.value = props.year
      setMonthRef.value = props.month
      setDayRef.value = props.day
    })
    
    const toggledEvent = (toggleArg: string) => {
      toggled.value = toggleArg
      setCalendarType.value = toggled.value
      context.emit('update:toggle', toggleArg)
      context.emit('action')
    }
    
    const controlEvent = (controlArg: string) => {
      if(setCalendarType.value === 'daily') {
        handleDay(controlArg)
        context.emit('update:year', setYearRef.value)
        context.emit('update:month', setMonthRef.value)
        context.emit('update:day', setDayRef.value)
      } else if(setCalendarType.value === 'weekly') {
        handleWeek(controlArg)
        context.emit('update:week', setWeeks.value)
      } else if(setCalendarType.value === 'yearly') {
        handleYear(controlArg)
        context.emit('update:year', setYearRef.value)
      } else {
        handleMonth(controlArg)
        context.emit('update:year', setYearRef.value)
        context.emit('update:month', setMonthRef.value)
      }
    }
    
    return {
      toggled,
      toggledEvent,
      controlEvent,
      setYearRef,
      setMonthRef,
      setDayRef,
      setWeeks,
      setCalendarType,
      startYear,
      endYear,
      getRangeYears,
      getMonthNames,
      getDayNames,
      getWeeks,
      getCalendarTitle
    }
  }
})
</script>
