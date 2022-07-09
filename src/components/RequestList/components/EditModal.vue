<template>
  <el-drawer :model-value="isDisplayed" @close="close">
    ...form
    <template #footer>
      <el-button type="info" @click="close">
        Cancel
      </el-button>
      <el-button type="primary" @click="close">
        Save
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup>
defineProps({
  request: {
    type: Object,
    required: true,
  },
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
