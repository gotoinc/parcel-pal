<template>
  <el-affix>
    <el-menu router :default-active="$route.name">
      <el-menu-item :route="{name: 'requests'}" index="requests">
        Request List
      </el-menu-item>
      <el-menu-item :route="{name: 'choose-request-type'}" index="choose-request-type">
        Create request
      </el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script setup>

</script>

<style scoped>

</style>
