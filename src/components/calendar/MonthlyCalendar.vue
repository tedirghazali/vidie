<template>
  <div class="dark">
    <div class="gridColumns-7 gridItemsCenter bdStart-1 bdEnd-0 bdSolid bdOpacity-2 bdBlack">
      <div v-for="wday in weekDays" :key="wday" :class="['wd-100', 'txtCenter', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div :class="['pd-2']">{{ wday }}</div>
      </div>
      <div v-for="pday in prevDays" :key="pday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div :class="['pd-2', 'ph-15', 'txtGray']">{{ pday }}</div>
      </div>
      <div v-for="mday in monthDays" :key="mday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack']" @click="eventDate(mday)">
        <div :class="['pd-2', 'ph-15']">{{ mday }}</div>
      </div>
      <div v-for="nday in nextDays" :key="nday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div :class="['pd-2', 'ph-15', 'txtGray']">{{ nday }}</div>
      </div>
      <!--<div v-for="cal in calendar" :key="cal" :class="['wd-100', 'txtCenter', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', {'txtGray': isCurrentCalendar(cal) === false, 'eventNone': isCurrentDate(cal) === false, 'cursorPointer': isCurrentDate(cal)}]" @click="eventDate(cal), $emit('leave')">
        <div :class="['pd-2', 'bgOpacity-2', {'green': resultDate === cal, 'txtBlack': resultDate === cal, 'ph-15': isDayNames(cal) === false, 'txtRight': isDayNames(cal) === false}]">{{ filterCalendarDate(cal) }}</div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js' //../../assets/alga-vue.es.js

export default defineComponent({
  name: 'MonthlyCalendar',
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
  emits: ['update:modelValue', 'leave'],
  setup(props, context) {
    const resultDate = ref<string>('')
    const { modelValue: current, year: yearRef, month: monthRef, locale, weekday } = toRefs(props)
    const { weekDays, prevDays, monthDays, nextDays } = useCalendar(yearRef, monthRef, null, locale, weekday)
  
    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
    }

    watch(current, (newVal, oldVal) => {
      resultDate.value = props.current
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
