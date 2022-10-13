<template>
  <div class="container">
    <h1 class="form__heading">Order Request Creation</h1>
    <order-request-form
      :form="form"
      @update-field="updateField"
      @cancel="$router.push({ name: 'choose-request-type' })"
      @save="createRequest"
    />
  </div>
</template>

<script setup lang="ts">
import OrderRequestForm from '../../../components/OrderRequestForm/OrderRequestForm.vue'
import { ref } from 'vue'
import { api } from '../../../api/api.js'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import {
  IOrderRequestForm,
  IUpdateFieldEmit
} from '../../../components/OrderRequestForm/interfaces'

const router = useRouter()
const route = useRoute()

const form = ref<IOrderRequestForm>({
  cityFrom: '',
  cityTo: '',
  parcelType: '',
  dateOfDispatch: '',
  parcelDescription: ''
})

function updateField({ fieldName, fieldValue }: IUpdateFieldEmit) {
  form.value[fieldName] = fieldValue
}

async function createRequest() {
  await api.requests.create('delivery', route.params.userId, form)

  ElMessage.success('Order request is created')

  await router.push({ name: 'user-requests' })
}
</script>

<style scoped>
.form__heading {
  margin-bottom: 12px;
}
</style>
