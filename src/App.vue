<template>
  <el-container>
    <el-aside style="--el-aside-width: 200px">
      <gti-sidebar />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import GtiSidebar from './components/GtiSidebar/GtiSidebar.vue'
</script>

<style>

</style>
