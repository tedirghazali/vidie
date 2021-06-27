<template>
  <div class="picker">
    <div class="pickerToggler">
      <slot></slot>
    </div>
    <div class="pickerMenu bd-1 bdOpactiy-3 bdDarker dark" v-bind="$attrs" v-show="pickerOpen">
      <slot name="pickerMenu"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  name: 'Picker',
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const pickerOpen = toRef(props, 'open')
    
    return {
      pickerOpen
    }
  }
})
</script>
