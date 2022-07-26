<template>
  <el-row type="flex" justify="space-between" style="width: 100%">
    <!-- 左侧区域 -->
    <div>{{ treeNode.name }}</div>
    <!-- 右侧 -->
    <el-col :span="5">
      <el-row type="flex">
        <el-col :span="12">{{ treeNode.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">修改部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style>
</style>