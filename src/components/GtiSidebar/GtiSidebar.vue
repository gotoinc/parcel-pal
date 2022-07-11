<template>
  <el-affix>
    <el-menu :default-active="$route.name">
      <el-menu-item index="requests" @click="$router.push({name: 'requests'})">
        All requests
      </el-menu-item>
      <el-menu-item index="user-requests" @click="$router.push({name: 'user-requests', params: {userId}})">
        User Requests
      </el-menu-item>
      <el-menu-item index="choose-request-type" @click="$router.push({name: 'choose-request-type', params: {userId}})">
        Create request
      </el-menu-item>
      <el-menu-item index="user-id" @click="() => {}">
        <el-form>
          <el-form-item label="User Id" style="margin-bottom: 0;">
            <el-input
              v-model="userIdValue"
            />
          </el-form-item>
        </el-form>
      </el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = ref('1')

watch(userId, () => {
  if (route.params.userId && route.params.userId !== userId.value) {
    router.replace({params: {userId: userId.value}})
  }
})

watch(() => route.params.userId, newId => {
  if (newId) {
    userId.value = newId
  }
})

const userIdValue = computed({
  get() {
    return userId.value
  },
  set(newId) {
    if (isNaN(newId) || !newId) {
      return
    }
  
    userId.value = newId
  }
})

</script>

<style scoped>

</style>
