<template>
  <el-dialog
    title="关联角色"
    :visible.sync="showRoleDialog"
    @close="checkRoleList = []"
  >
    <el-checkbox-group v-model="checkRoleList">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <br />
    <el-row type="flex" justify="center">
      <el-button size="small" @click="showRoleDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="btnOk"> 确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleListApi } from '@/api/role'
import { assignRoleApi } from '@/api/employees'
export default {
  name: 'AssignRole',
  data() {
    return {
      showRoleDialog: false,
      checkRoleList: [],
      roleList: [],
      userId: '',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      let { rows } = await getRoleListApi({ page: 1, pagesize: 1000 })
      console.log('rows', rows)
      this.roleList = rows
    },
    async btnOk() {
      await assignRoleApi({
        id: this.userId,
        roleIds: this.checkRoleList,
      })
      this.$message.success('关联角色成功')
      this.showRoleDialog = false
    },
  },
}
</script>

<style>
</style>