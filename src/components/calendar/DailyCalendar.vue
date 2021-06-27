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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DailyCalendar',
  props: {
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
    }
  },
  setup() {
  
  }
})
</script>
