<template>
  <div>
    <Picker :open="picker" class="pw-30 pd-3 hgMaxAuto hgAuto ofYHidden">
      <template v-slot:default>
        <div class="inlineBlock pd-3 pdRight-6 bd-1 bdOpactiy-3 bdDarker wd-100 selectionNone dark" @click="pressToggler">{{ modelValue }}</div>
      </template>
      <template v-slot:pickerMenu>
        <BasicCalendarBar />
        <BasicCalendar />
      </template>
    </Picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import Picker from './Picker.vue'
import BasicCalendar from '../calendar/BasicCalendar.vue'
import BasicCalendarBar from '../calendar/BasicCalendarBar.vue'

export default defineComponent({
  name: 'SelectPicker',
  props: {
    modelValue: {
      type: String,
      default: '-- Select Options --'
    },
    options: {
      type: Array,
      default: []
    }
  },
  emits: ['update:modelValue'],
  components: {
    Picker,
    BasicCalendar,
    BasicCalendarBar
  },
  setup(props, { attrs, slots, emit }) {
    const picker = ref<boolean>(false)
    const toggler = ref<boolean>(true)
    const { modelValue, options } = toRefs<any>(props)
    
    const pressToggler = () => {
      if(toggler.value) {
        picker.value = true
        toggler.value = false
      } else {
        picker.value = false
        toggler.value = true
      }
    }
    
    const pressOption = (option) => {
      picker.value = false
      emit('update:modelValue', option)
    }
    
    return {
      picker,
      modelValue,
      options,
      pressToggler
    }
  }
})
</script>
