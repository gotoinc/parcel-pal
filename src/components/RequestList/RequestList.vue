<template>
  <el-table
    v-if="requests.length > 0"
    v-loading="isLoading"
    :data="requests"
    :default-sort="{ prop: 'createdAt', order: 'descending' }"
    @sort-change="sortRequests"
  >
    <el-table-column width="100" prop="userId" label="UserID" sortable="custom" />
    <el-table-column width="150" prop="cityFrom" label="From" sortable="custom" />
    <el-table-column width="150" prop="cityTo" label="To" sortable="custom" />
    <el-table-column width="150" prop="parcelType" label="Type" sortable="custom" />
    <el-table-column width="150" prop="dateOfDispatch" label="Dispatch Date" sortable="custom">
      <template #default="{row}">
        {{ row.dateOfDispatch ? format(new Date(row.dateOfDispatch), 'dd-MM-yyyy') : '-' }}
      </template>
    </el-table-column>
    <el-table-column width="150" prop="createdAt" label="Creation Date" sortable="custom">
      <template #default="{row}">
        {{ format(new Date(row.createdAt), 'dd-MM-yyyy') }}
      </template>
    </el-table-column>
    <el-table-column prop="parcelDescription" label="Description" sortable="custom" />
    <el-table-column v-if="hasActions" label="Actions" width="200">
      <template #default="{row}">
        <el-button
          plain
          type="warning"
          :icon="EditPen"
          @click="openAction(row, requestActionList.edit)"
        />
        <el-button
          plain
          type="danger"
          :icon="Delete"
          @click="deleteRequest(row.id, row.type)"
        />
      </template>
    </el-table-column>
    <el-table-column width="200">
      <el-button type="primary" disabled>
        Show Similar
      </el-button>
    </el-table-column>
  </el-table>
  
  <el-empty v-else description="No requests yet" />
  
  <edit-modal
    :is-displayed="selectedRequestAction === requestActionList.edit"
    @close="closeAction"
  >
    <template v-if="selectedRequest">
      <order-request-form
        v-if="selectedRequest.type === 'order'"
        :form="selectedRequest"
        @update-field="updateField"
        @save="saveRequest"
        @cancel="closeAction"
      />
      <deliver-request-form
        v-else
        :form="selectedRequest"
        @update-field="updateField"
        @save="saveRequest"
        @cancel="closeAction"
      />
    </template>
  </edit-modal>
</template>

<script setup>
import { readonly, ref } from 'vue'
import { format } from 'date-fns'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import EditModal from './components/EditModal.vue'
import { api } from '../../api/api.js'
import OrderRequestForm from '../OrderRequestForm/OrderRequestForm.vue'
import DeliverRequestForm from '../DeliverRequestForm/DeliverRequestForm.vue'
import { cloneDeep } from 'lodash'

defineProps({
  requests: {
    type: Array,
    required: true,
  },
  hasActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits({
  'splice-request': null,
  'update-request': null,
  'sort-requests': null
})

const requestActionList = readonly({
  edit: 'edit',
  showSimilar: 'showSimilar'
})

const isLoading = ref(false)

const selectedRequest = ref(null)
const selectedRequestAction = ref(null)

async function deleteRequest(requestId, requestType) {
  try {
    await ElMessageBox.confirm('Are you sure to delete this request?', 'Delete Request', {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
  
    isLoading.value = true
    
    await api.requests.deleteOne(requestId, requestType)
    
    emit('splice-request', { requestId, requestType })
    isLoading.value = false
    ElMessage.success('Request Deleted')
  } catch (e) {
    console.log('hasn\'t deleted')
    isLoading.value = false
  }
}

function sortRequests({prop, order}) {
  emit('sort-requests', {
    sortBy: prop,
    sortDirection: order
  })
}

function openAction(request, action) {
  selectedRequest.value = cloneDeep(request)
  selectedRequestAction.value = action
}

function closeAction() {
  selectedRequest.value = null
  selectedRequestAction.value = null
}

function updateField({fieldName, fieldValue}) {
  selectedRequest.value[fieldName] = fieldValue
}

async function saveRequest() {
  try {
    isLoading.value = true
    await api.requests.updateOne(selectedRequest.value.id, selectedRequest.value.type, selectedRequest.value)
    isLoading.value = false
    emit('update-request', {
      data: selectedRequest.value,
      requestId: selectedRequest.value.id
    })
    closeAction()
    ElMessage.success('Request has updated')
  } catch (e) {
    isLoading.value = false
    ElMessage.error('Error has occurred')
  }
}
</script>

<style scoped>

</style>
