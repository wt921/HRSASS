<template>
  <el-dialog title="分配权限" :visible.sync="dialogShow" width="50%">
    <el-tree
      v-if="dialogShow"
      :data="allAuth"
      :props="{ label: 'name' }"
      ref="tree"
      :default-checked-keys="checkAuthId"
      :check-strictly="true"
      show-checkbox
      node-key="id"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermissionListApi } from '@/api/permisson'
import { tranListToTreeDate } from '@/utils'
import { assignAuthApi } from '@/api/role'
export default {
  name: 'assignAuth',
  data() {
    return {
      dialogShow: false,
      allAuth: [],
      checkAuthId: [],
      roleId: '',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await getPermissionListApi()
      this.allAuth = tranListToTreeDate(res, '0')
    },
    async btnOk() {
      const permIds = this.$refs.tree.getCheckedKeys()
      if (permIds === 0) return this.$message.error('请勾选')
      await assignAuthApi({
        id: this.roleId,
        permIds,
      })
      this.$message.success('关联角色成功')
      this.dialogShow = false
    },
  },
}
</script>

<style>
</style>