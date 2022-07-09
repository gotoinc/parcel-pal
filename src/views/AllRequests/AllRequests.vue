<template>
  <request-list :requests="requests" />
</template>

<script setup>
import RequestList from '../../components/RequestList/RequestList.vue'
import { ref } from 'vue'

const requests = ref([
  {
    id: '123',
    from: 'Kharkiv',
    to: 'Barvinkove',
    type: 'gadget',
    dispatchDate: new Date(),
    createdAt: new Date(),
    description: 'lorem ipsum '.repeat(10)
  }
])

</script>

<style scoped>

</style>
