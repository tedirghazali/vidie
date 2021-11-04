<script lang="ts" setup>

</script>

<template>
  <div class="monthGrid" style="height: 800px;">
    <div v-for="num in 42" class="monthItem">
      <div class="monthHeader">{{ num }}</div>
      <div class="monthBody"></div>
      <div class="monthFooter"></div>
    </div>
  </div>
</template>

<style scoped>
.monthGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(16.666666667%, 1fr);
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}

.monthItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.monthHeader {
  text-align: right;
}

.monthBody {
  flex-grow: 1;
}
</style>
