<template>
  <el-dialog
    title="新增员工"
    :visible.sync="showDialog"
    width="60%"
    @close="close"
  >
    <el-form
      v-if="showDialog"
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="140px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          @focus="getDepartmentList"
          v-model="formData.departmentName"
          :options="depts"
          :props="{ label: 'name', value: 'name' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          type="date"
          placeholder="请选择转正时间"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="btnOk">确 定</el-button>
      <el-button @click="showDialog = false">取 消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import EmplyeesConst from '@/api/constant/employees'
import { getDepartmentListApi } from '@/api/department'
import { tranListToTreeDate } from '@/utils'
import { addEmployeeApi } from '@/api/employees'
export default {
  name: 'AddEmploy',
  data() {
    return {
      showDialog: false,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: [],
        timeOfEntry: '',
        correctionTime: '',
      },
      formRules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在2-4', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        workNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
        departmentName: [
          {
            validator: (rules, value, cb) => {
              value.length === 0 ? cb(new Error('请选择部门')) : cb()
            },
            required: true,
            trigger: 'change',
          },
        ],
        timeOfEntry: [{ required: true, message: '请输入', trigger: 'blur' }],
        correctionTime: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
      hireType: EmplyeesConst.hireType,
      depts: [],
    }
  },

  methods: {
    async getDepartmentList() {
      const { depts } = await getDepartmentListApi()

      this.depts = tranListToTreeDate(depts, '')
    },
    async btnOk() {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        return console.log(error)
        // 加工数据
      }
      const cloneFormData = JSON.parse(JSON.stringify(this.formData))
      const len = cloneFormData.departmentName.length - 1
      cloneFormData.departmentName = cloneFormData.departmentName[len]
      await addEmployeeApi(cloneFormData)
      this.$message.success('添加成功')
      ;(this.showDialog = false), this.$emit('updataList')
    },
    close() {
      this.formData = {}
    },
  },
}
</script>

<style>
</style>