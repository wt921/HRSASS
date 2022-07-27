<template>
  <!-- 弹框 -->
  <el-dialog
    @close="closeHandler"
    :title="title"
    :visible.sync="dialogShow"
    v-if="dialogShow"
  >
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
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getMangerList"
        >
          <el-option
            v-for="item in mangerList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
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
        <el-button @click="dialogShow = false">取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getEmployeeSimpleApi } from '@/api/employees'
import {
  getDepartmentListApi,
  addDepartmentApi,
  editDepartmentApi,
} from '@/api/department'
export default {
  name: 'addDept',
  data() {
    const checkNameRepeat = async (rule, value, cb) => {
      console.log(value)
      // 所有部门的数据
      const { depts } = await getDepartmentListApi()
      let isRepeat = false
      if (this.formData.id) {
        // 修改
        isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name === value)
      } else {
        //添加
        isRepeat = depts
          .filter((item) => item.pid === this.formData.pid)
          .some((item) => item.name === value)
      }
      // let isRepeat = depts
      //   .filter((item) => item.pid === this.formData.pid)
      //   .some((item) => item.name === value)
      // 返回结果
      isRepeat ? cb(new Error(`同级存在${value}这个部门名称`)) : cb()
    }
    const checkCodeRepeat = async (rule, value, cb) => {
      console.log(value)
      // 所有部门的数据
      const { depts } = await getDepartmentListApi()
      // 找到兄弟 判断是否同名
      let isRepeat = false
      depts.some((item) => item.code === value)
      if (this.formData.id) {
        // 修改
        isRepeat = depts.some(
          (item) => item.id !== this.formData.id && item.code === value
        )
      } else {
        // 增加
        isRepeat = depts.some((item) => item.code === value)
      }
      // 返回结果
      isRepeat ? cb(new Error(`同级存在${value}这个编码`)) : cb()
    }

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
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' },
        ],
        manager: [{ required: true, message: '请输入', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      mangerList: [],
    }
  },
  computed: {
    title() {
      return this.formData.id ? '修改部门' : '添加子部门'
    },
  },
  methods: {
    async getMangerList() {
      this.mangerList = await getEmployeeSimpleApi()
    },
    async btnOk() {
      try {
        this.$refs.form.validate()
      } catch (error) {
        return console.log(error)
      }
      // 发生请求
      if (this.formData.id) {
        // 修改
        await editDepartmentApi(this.formData)
        this.$message.success('修改成功')
      } else {
        // 新增
        await addDepartmentApi(this.formData)
        this.$message.success('添加成功')
      }

      this.dialogShow = false
      // 通知父亲更新数据
      this.$emit('updateList')
    },
    closeHandler() {
      this.formData = {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: '',
      }
    },
  },
}
</script>

<style>
</style>