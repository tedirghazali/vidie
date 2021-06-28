<template>
  <div class="flex bdOpacity-2">
    <div :class="['txtCenter', 'bdStart-1', 'bdRight-0', 'bdBottom-1', 'bdSolid', 'bdBlack', 'bdDarker']" style="width: 60px;">
      <div class="pd-2">&nbsp;</div>
      <div>
        <div class="bdTop-1 bdDarker pd-2">allday</div>
        <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2">&nbsp;</div>
      </div>
      <div v-for="n in 24" :key="n - 1">
        <div class="bdTop-1 bdDarker pd-2">{{ n - 1 }}:00</div>
        <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2">&nbsp;</div>
      </div>
    </div>
    <div class="gridColumns-7 bdStart-1 bdEnd-0 bdSolid bdBlack flexFill">
      <div v-for="(wday, index) in weekDays" :key="wday" :class="['wd-100', 'txtCenter', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div class="pd-2">{{ wday }} {{ showDay(weekDates[index]) }}</div>
        <div>
          <div class="bdTop-1 bdDarker pd-2 txtLeft">&nbsp;</div>
          <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2 txtLeft">&nbsp;</div>
        </div>
        <div v-for="n in 24" :key="n - 1">
          <div class="bdTop-1 bdDarker pd-2 txtLeft">&nbsp;</div>
          <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2 txtLeft">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, inject } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js'

export default defineComponent({
  name: 'WeeklyCalendar',
  props: {
    locale: {
      type: String,
      default: 'en-US'
    },
    weekday: {
      type: String,
      default: 'short'
    }
  },
  setup(props, context) {
    const { locale, weekday } = toRefs(props)
    
    const year = inject<number>('year', new Date().getFullYear())
    const month = inject<number>('month', Number(new Date().getMonth()) + 1)
    const day = inject<number>('day', new Date().getDate())
    
    const { weekDays, beforeDays, afterDays } = useCalendar(year, month, day, locale, weekday)
    
    const weekDates = computed<any[]>(() => {
      return [...beforeDays.value, new Date(year.value, Number(month.value) - 1, day.value).valueOf(), ...afterDays.value]
    })
    
    const showDay = (time: number) => {
      return new Date(time).getDate()
    }
    
    return {
      weekDays,
      weekDates,
      showDay,
    }
  }
})
</script>
