<template>
  <!-- 弹框 -->
  <el-dialog
    :title="this.formData.id ? '修改角色' : '添加角色'"
    :visible.sync="dialogShow"
    width="50%"
    @close="close"
  >
    <el-form
      v-if="dialogShow"
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="150px"
    >
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="formData.name" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="角色描述">
        <el-input v-model="formData.description" style="width: 80%"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRoleApi, editRoleApi } from '@/api/role'
export default {
  name: 'addRole',
  data() {
    return {
      formData: {
        name: '',
        description: '',
      },
      formRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      dialogShow: false,
    }
  },
  methods: {
    async btnOk() {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        console.log(error)
      }
      if (this.formData.id) {
        await editRoleApi(this.formData)
      } else {
        await addRoleApi(this.formData)
      }

      this.$message.success('操作成功')
      this.dialogShow = false
      this.$emit('upDataList')
    },
    // 关闭弹窗
    close() {
      this.formData = {
        name: '',
        description: '',
      }
    },
  },
}
</script>

<style>
</style>