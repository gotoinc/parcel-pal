<template>
  <el-form
    ref="requestForm"
    :model="form"
    :rules="formRules"
    label-width="auto"
    label-position="top"
  >
    <el-form-item label="City - From" prop="cityFrom">
      <el-select
        :model-value="form.cityFrom"
        filterable
        placeholder="Select city"
        @change="updateField({ fieldName: 'cityFrom', fieldValue: $event })"
      >
        <el-option
          v-for="city in cityChoices"
          :key="city.id"
          :label="city.name"
          :value="city.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="City - To" prop="cityTo">
      <el-select
        :model-value="form.cityTo"
        filterable
        placeholder="Select city"
        @change="updateField({ fieldName: 'cityTo', fieldValue: $event })"
      >
        <el-option
          v-for="city in cityChoices"
          :key="city.id"
          :label="city.name"
          :value="city.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Parcel type">
      <el-select
        :model-value="form.parcelType"
        filterable
        placeholder="Select parcel type"
        @change="updateField({ fieldName: 'parcelType', fieldValue: $event })"
      >
        <el-option
          v-for="parcel in parcelTypeChoices"
          :key="parcel.id"
          :label="parcel.name"
          :value="parcel.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Date of dispatch">
      <el-date-picker
        v-model="dateOfDispatch"
        type="date"
        placeholder="Pick a date"
      />
    </el-form-item>

    <el-form-item label="Parcel description">
      <el-input
        :model-value="form.parcelDescription"
        type="textarea"
        placeholder="Enter parcel description"
        @input="
          updateField({ fieldName: 'parcelDescription', fieldValue: $event })
        "
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm"> Save </el-button>

      <el-button type="info" @click="$emit('cancel')"> Cancel </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { computed, readonly, ref } from 'vue'
import { constants } from '../../constants.js'
import { IOrderRequestForm, IUpdateFieldEmit } from './interfaces'

const props = defineProps<{
  form: IOrderRequestForm
}>()

const emit = defineEmits<{
  (e: 'update-field', { fieldName, fieldValue }: IUpdateFieldEmit): void
  (e: 'save'): void
  (e: 'cancel'): void
}>()

function updateField({ fieldName, fieldValue }: IUpdateFieldEmit) {
  emit('update-field', { fieldName, fieldValue })
}

const formRules = readonly({
  cityFrom: {
    required: true,
    message: 'This field is required',
    trigger: 'blur'
  },
  cityTo: { required: true, message: 'This field is required', trigger: 'blur' }
})

const requestForm = ref<FormInstance>()

async function submitForm() {
  if (!requestForm.value) {
    return
  }

  await requestForm.value.validate((valid) => {
    if (valid) {
      emit('save')
    }
  })
}

// Temporary solution for el-date-picker due to issue
// Issue link - https://github.com/element-plus/element-plus/issues/8523
const dateOfDispatch = computed({
  get() {
    return props.form.dateOfDispatch
  },
  set(newValue) {
    updateField({ fieldName: 'dateOfDispatch', fieldValue: newValue })
  }
})

const cityChoices = readonly(
  constants.CITIES.map((cityName, index) => ({
    name: cityName,
    id: index
  }))
)

const parcelTypeChoices = readonly(
  constants.PARCEL_TYPES.map((gadgetName, index) => ({
    name: gadgetName,
    id: index
  }))
)
</script>

<style scoped></style>
