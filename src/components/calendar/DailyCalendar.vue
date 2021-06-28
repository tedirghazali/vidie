<template>
  <div class="list listBorder listSharp bdDarker">
    <div class="listItem active flex txtBold bgDarkest bdDarker">
      <div class="pw-15">allday</div>
      <div class="pdLeft-2">
        <span class="dot"></span>
        <span class="pdLeft-3">List Item 1</span>
      </div>
    </div>
    <div class="listItem flex bdDarker">
      <div class="pw-15">8:00 - 10:00</div>
      <div class="pdLeft-2">
        <span class="dot"></span>
        <span class="pdLeft-3">List Item 2</span>
      </div>
    </div>
    <div class="listItem flex bdDarker">
      <div class="pw-15">10:30 - 11:00</div>
      <div class="pdLeft-2">
        <span class="dot"></span>
        <span class="pdLeft-3">List Item 3</span>
      </div>
    </div>
    <div class="listItem flex bdDarker">
      <div class="pw-15">13:00 - 16:00</div>
      <div class="pdLeft-2">
        <span class="dot"></span>
        <span class="pdLeft-3">List Item 4</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'DailyCalendar',
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
  setup() {
    const year = inject<number>('year', new Date().getFullYear())
    const month = inject<number>('month', Number(new Date().getMonth()) + 1)
    const day = inject<number>('day', new Date().getDate())
    
    return {
      year,
      month,
      day
    }
  }
})
</script>
