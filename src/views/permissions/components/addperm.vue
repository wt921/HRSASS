<template>
  <el-dialog
    title="新增权限"
    :visible.sync="dialogShow"
    width="50%"
    @close="close"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="120px"
      v-if="dialogShow"
    >
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="formData.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="enVisible">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addPermissionApi, editPermissionApi } from '@/api/permisson'

export default {
  name: 'addPerm',
  data() {
    return {
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
  methods: {
    async btnOk() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        await editPermissionApi(this.formData)
      } else {
        await addPermissionApi(this.formData)
      }

      this.$message.success('操作成功')
      this.dialogShow = false
      this.$emit('upDataPerm')
    },
    close() {
      this.formData = {}
    },
  },
}
</script>

<style>
</style>