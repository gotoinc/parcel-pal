<template>
  <el-drawer :model-value="isDisplayed" @close="close">
    <slot />
  </el-drawer>
</template>

<script setup lang="ts">
defineProps({
  isDisplayed: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits({
  close: null,
})

function close() {
  emit('close')
}
</script>

<style scoped>

</style>
