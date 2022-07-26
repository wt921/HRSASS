<template>
  <!-- 弹框 -->
  <el-dialog title="新增部门" :visible.sync="dialogShow">
    <!-- 表单 -->
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="140px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-input v-model="formData.manager" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'addDept',
  data() {
    return {
      dialogShow: false,
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: '',
      },
      formRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        code: [{ required: true, message: '请输入', trigger: 'blur' }],
        manager: [{ required: true, message: '请输入', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
    }
  },
}
</script>

<style>
</style>