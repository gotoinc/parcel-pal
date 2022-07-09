<template>
  <div class="container">
    <h1 class="form__heading">
      Order Request Creation
    </h1>
    <order-request-form
      :form="form"
      @update-field="updateField"
      @cancel="$router.push({name: 'choose-request-type'})"
    />
  </div>
</template>

<script setup>
import OrderRequestForm from '../../../components/OrderRequestForm/OrderRequestForm.vue'
import { ref } from 'vue'

const form = ref({
  cityFrom: '',
  cityTo: '',
  parcelType: '',
  dateOfDispatch: null,
  parcelDescription: ''
})

function updateField({fieldName, fieldValue}) {
  form.value[fieldName] = fieldValue
}
</script>

<style scoped>
.form__heading {
  margin-bottom: 12px;
}
</style>
