<template>
  <el-container>
    <el-aside style="--el-aside-width: 200px">
      <gti-sidebar />
    </el-aside>
    <el-main>
      <router-view :key="($route.params.userId as string) || 'default'" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import GtiSidebar from './components/GtiSidebar/GtiSidebar.vue'
</script>

<style>

</style>
