<template>
  <div class="container mgTop-2 mgBottom-2">
    <div class="gridColumns-3">
      <div class="pdX-2">
        <Picker>
          <template v-slot:default>
            <button type="button" class="button primary pdRight-5">Toggle Button</button>
          </template>
          <template v-slot:pickerMenu>
            this is menu
          </template>
        </Picker>
      </div>
      <div class="pdX-2">
        <SelectPicker />
      </div>
      <div class="pdX-2">
        <DatePicker />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Picker from '../components/picker/Picker.vue'
import SelectPicker from '../components/picker/SelectPicker.vue'
import DatePicker from '../components/picker/DatePicker.vue'

export default defineComponent({
  name: 'PickerPage',
  components: {
    Picker,
    SelectPicker,
    DatePicker
  }
})
</script>
