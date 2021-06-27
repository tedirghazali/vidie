<template>
  <div>
    <Picker :open="picker">
      <template v-slot:default>
        <div class="inlineBlock pd-3 pdRight-6 bd-1 bdOpactiy-3 bdDarker wd-100 selectionNone dark" @click="pressToggler">{{ modelValue }}</div>
      </template>
      <template v-slot:pickerMenu>
        <div v-for="option in options" class="pickerItem cursorPointer selectionNone" @click="pressOption(option)">{{ option }}</div>
      </template>
    </Picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue'
import Picker from './Picker.vue'

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
    Picker
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
