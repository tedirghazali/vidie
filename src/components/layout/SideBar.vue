<template>
  <div :class="[sideBar(), 'dark', 'zi-2']">
    <div class="sideMenuStart" v-if="menuStart">
      <slot name="menuStart"></slot>
    </div>
    <div class="sideMenuCenter" v-if="menuCenter">
      <slot name="menuCenter"></slot>
    </div>
    <div class="sideMenuFill" v-else>
      <slot></slot>
    </div>
    <div class="sideMenuEnd" v-if="menuEnd">
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
      default: true
    },
    menuCenter: {
      type: Boolean,
      default: false
    },
    menuEnd: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const sideBar = () => {
      let sidebar
      if(props.type === '') {
        sidebar = 'sideBar'
      } else {
        sidebar = 'sideBar ' + props.type
      }
      return sidebar
    }
    
    return {
      sideBar
    }
  }
})
</script>
