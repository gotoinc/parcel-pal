<template>
  <div class="container">
    <h1 class="page__heading">
      Request Type Selection
    </h1>
    <el-dropdown trigger="click">
      <el-button type="primary">
        Choose request type
      
        <el-icon class="arrow-down-icon">
          <arrow-down />
        </el-icon>
      </el-button>
    
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="link in links" :key="link.name" @click="$router.push(link.link)">
            {{ link.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const links = ref([
  {
    name: 'Order',
    link: {name: 'create-order-request'}
  },
  {
    name: 'Delivery',
    link: {name: 'create-delivery-request'}
  },
])

</script>

<style scoped>
.arrow-down-icon {
  margin-left: 8px;
}

.page__heading {
  margin-bottom: 24px;
}
</style>
