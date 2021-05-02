<template>
  <div :class="[sideBar(), 'dark']">
    <div class="start:bar-menu" v-show="menuStart">
      <slot name="menuStart"></slot>
    </div>
    <div class="center:bar-menu" v-if="menuCenter">
      <slot name="menuCenter"></slot>
    </div>
    <div class="fill:bar-menu" v-else>
      <slot></slot>
    </div>
    <div class="end:bar-menu" v-show="menuEnd">
      <slot name="menuEnd"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  props: {
    type: {
      type: String,
      default: ''
    },
    menuStart: {
      type: Boolean,
      default: false
    },
    menuCenter: {
      type: Boolean,
      default: false
    },
    menuEnd: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const sideBar = () => {
      let sidebar
      if(props.type === '') {
        sidebar = 'side:bar'
      } else {
        sidebar = 'side:bar ' + props.type
      }
      return sidebar
    }
    
    return {
      sideBar
    }
  }
})
</script>
