<template>
  <el-table :data="requests">
    <el-table-column width="300" prop="from" label="From" />
    <el-table-column width="300" prop="to" label="To" />
    <el-table-column width="200" prop="type" label="Type" />
    <el-table-column width="150" label="Dispatch Date">
      <template #default="{row}">
        {{ format(row.dispatchDate, 'dd-MM-yyyy') }}
      </template>
    </el-table-column>
    <el-table-column width="150" label="Creation Date">
      <template #default="{row}">
        {{ format(row.createdAt, 'dd-MM-yyyy') }}
      </template>
    </el-table-column>
    <el-table-column prop="description" label="Description" />
    <el-table-column width="200">
      <template #default="{row}">
        <el-button
          plain
          type="warning"
          :icon="EditPen"
          @click="openAction(row.id, requestActionList.edit)"
        />
        <el-button
          plain
          type="danger"
          :icon="Delete"
          @click="deleteRequest(row.id)"
        />
      </template>
    </el-table-column>
  </el-table>
  
  <edit-modal
    :request="{}"
    :is-displayed="selectedRequestAction === requestActionList.edit"
    @close="closeAction"
  />
</template>

<script setup>
import { readonly, ref } from 'vue'
import { format } from 'date-fns'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import EditModal from './components/EditModal.vue'

defineProps({
  requests: {
    type: Array,
    required: true,
  }
})

const requestActionList = readonly({
  edit: 'edit',
  showSimilar: 'showSimilar'
})

const selectedRequestId = ref(null)
const selectedRequestAction = ref(null)

function deleteRequest(requestId) {
  ElMessageBox.confirm('Are you sure to delete this request?', 'Delete Request', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    console.log('delete request', requestId)
  })
}

function openAction(requestId, action) {
  selectedRequestId.value = requestId
  selectedRequestAction.value = action
}

function closeAction() {
  selectedRequestId.value = null
  selectedRequestAction.value = null
}
</script>

<style scoped>

</style>
