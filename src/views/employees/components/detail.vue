<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="formData"
              :rules="rules"
              ref="form"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password2"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="btnOk">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <userInfo @upDataUse="initData" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeInfoApi, editEmployeeApi } from '@/api/employees'
import userInfo from './user-info.vue'
import jobInfo from './job-info.vue'
export default {
  data() {
    return {
      UserId: this.$route.params.id,
      formData: {
        username: '',
        password2: '',
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' },
        ],
      },
    }
  },
  components: { userInfo, jobInfo },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await getEmployeeInfoApi(this.UserId)
      console.log(res)
      this.formData = res
    },

    async btnOk() {
      await this.$refs.form.validate()
      await editEmployeeApi({
        ...this.formData,
        password: this.formData.password2 || '',
      })
      this.$message.success('修改成功')
    },
  },
}
</script>

<style>
</style>