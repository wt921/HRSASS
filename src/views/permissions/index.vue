<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button type="primary" size="small" @click="addHandler('0', 1)"
          >添加权限</el-button
        >
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="addHandler(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text" @click="editHandler(row.id)">编辑</el-button>
            <el-button type="text" @click="delHandler(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addPerm ref="addPerm" @upDataPerm="initData" />
  </div>
</template>

<script>
import {
  getPermissionListApi,
  getPermissionInfoApi,
  delPermissionApi,
} from '@/api/permisson'
import { tranListToTreeDate } from '@/utils'
import addPerm from './components/addperm.vue'
export default {
  name: 'permission',
  data() {
    return {
      list: [],
      formData: {
        enVisible: '',
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        id: '',
      },
      dialogShow: false,
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入' }],
        code: [{ required: true, trigger: 'blur', message: '请输入' }],
      },
    }
  },
  components: { addPerm },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      let res = await getPermissionListApi()
      console.log('treeres', res)
      this.list = tranListToTreeDate(res, '0')
    },
    addHandler(val, type) {
      this.$refs.addPerm.formData.pid = val
      this.$refs.addPerm.formData.type = type
      this.$refs.addPerm.dialogShow = true
    },
    async editHandler(id) {
      const res = await getPermissionInfoApi(id)
      this.$refs.addPerm.formData = res
      this.$refs.addPerm.dialogShow = true
    },
    // 删除
    async delHandler(id) {
      await this.$confirm('确定删除吗？')
      await delPermissionApi(id)
      this.$message.success('删除成功')
      this.initData()
    },
  },
}
</script>

<style>
</style>