<template>
  <div class="container">
    <h1 class="form__heading">
      Deliver Request Creation
    </h1>
    <deliver-request-form
      :form="form"
      @update-field="updateField"
      @cancel="$router.push({name: 'choose-request-type'})"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DeliverRequestForm from '../../../components/DeliverRequestForm/DeliverRequestForm.vue'

const form = ref({
  cityFrom: '',
  cityTo: '',
  dateOfDispatch: null,
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
