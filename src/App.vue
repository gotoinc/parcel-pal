<template>
  <el-container>
    <el-aside style="--el-aside-width: 200px">
      <el-affix>
        <el-menu router>
          <el-menu-item :route="{name: 'requests'}">
            Request List
          </el-menu-item>
        </el-menu>
      </el-affix>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>

</script>

<style>

</style>
