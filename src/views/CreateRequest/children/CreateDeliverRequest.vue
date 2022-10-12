<template>
  <div class="container">
    <h1 class="form__heading">
      Delivery Request Creation
    </h1>
    <deliver-request-form
      :form="form"
      @update-field="updateField"
      @cancel="$router.push({name: 'choose-request-type'})"
      @save="createRequest"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeliverRequestForm from '../../../components/DeliverRequestForm/DeliverRequestForm.vue'
import { api } from '../../../api/api.js'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const form = ref({
  cityFrom: '',
  cityTo: '',
  dateOfDispatch: null,
})

function updateField({fieldName, fieldValue}) {
  form.value[fieldName] = fieldValue
}

async function createRequest() {
  await api.requests.create('delivery', route.params.userId, form)
  
  ElMessage.success('Delivery request is created')
  
  await router.push({name: 'user-requests'})
}
</script>

<style scoped>
.form__heading {
  margin-bottom: 12px;
}
</style>
