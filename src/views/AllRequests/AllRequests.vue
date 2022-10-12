<template>
  <div v-loading="isLoading">
    <request-list
      :requests="requests"
      :has-actions="false"
      @sort-requests="sortRequests"
    />
  </div>
</template>

<script setup lang="ts">
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

</script>

<style scoped>

</style>
