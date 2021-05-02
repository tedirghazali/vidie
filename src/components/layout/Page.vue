<template>
  <div :class="pageLayout()">
    <div class="top:section">
      <slot name="sectionTop"></slot>
    </div>
    <div class="left:section">
      <slot name="sectionLeft"></slot>
    </div>
    <div class="main:section">
      <slot name="sectionMain"></slot>
    </div>
    <div class="right:section">
      <slot name="sectionRight"></slot>
    </div>
    <div class="bottom:section">
      <slot name="sectionBottom"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Page',
  props: {
    sections: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const pageLayout = () => {
      let page
      if(props.sections === '') {
        page = 'page'
      } else {
        page = props.sections + ':page'
      }
      return page
    }
    
    return {
      pageLayout
    }
  }
})
</script>
