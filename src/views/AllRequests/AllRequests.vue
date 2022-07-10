<template>
  <div v-loading="isLoading">
    <request-list
      :requests="requests"
      @splice-request="spliceRequest"
      @update-request="updateRequest"
      @sort-requests="sortRequests"
    />
  </div>
</template>

<script setup>
import RequestList from '../../components/RequestList/RequestList.vue'
import { onMounted, ref, watch } from 'vue'
import { api } from '../../api/api.js'

const requests = ref([])
const isLoading = ref(true)

async function loadRequests() {
  isLoading.value = true
  const { data } = await api.requests.getAll({
    ...sortData.value
  })
  
  requests.value = data
  
  isLoading.value = false
}

onMounted(() => {
  loadRequests()
})

const sortData = ref({
  sortBy: null,
  sortDirection: null
})

watch(sortData, () => loadRequests(), {
  deep: true
})

function sortRequests(data) {
  sortData.value = data
}

function updateRequest(requestData) {
  const {data, requestId} = requestData
  
  const requestIndex = requests.value.findIndex(request => request.id === requestId)
  
  requests.value[requestIndex] = data
}

function spliceRequest(requestId) {
  requests.value = requests.value.filter(request => request.id !== requestId)
}

</script>

<style scoped>

</style>
