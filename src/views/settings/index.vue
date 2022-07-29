<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 标签切换 -->
        <el-tabs v-model="activeName">
          <!-- 角色管理 -->
          <el-tab-pane label="角色管理" name="first">
            <el-button
              size="small"
              type="primary"
              @click="$refs.addRole.dialogShow = true"
              >新增角色</el-button
            >
            <!-- 表格 -->

            <el-table :data="tableData" style="width: 100%" border>
              <el-table-column
                prop="date"
                label="序号"
                type="index"
                width="80"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="角色"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                width="580"
                align="center"
              >
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary" @click="editHandler(row.id)"
                    >编辑</el-button
                  >
                  <el-button type="danger" @click="delHandler(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <br />
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryData.page"
              :page-size="queryData.pagesize"
              :page-sizes="[10, 8, 5]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              align="right"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹框 -->
    <add-role @upDataList="initData" ref="addRole"></add-role>
  </div>
</template>

<script>
import addRole from '@/views/settings/components/add-role.vue'
import {
  getRoleListApi,
  getCompanyInfoApi,
  getRoleInfoApi,
  delRoleApi,
} from '@/api/role'
export default {
  name: 'setting',
  data() {
    return {
      tableData: [],
      queryData: {
        page: 1,
        pagesize: 10,
      },
      activeName: 'first',
      total: 0,
      companyInfo: {},
    }
  },
  components: {
    addRole,
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      let { total, rows } = await getRoleListApi(this.queryData)
      let res = await getCompanyInfoApi(this.$store.getters.companyId)
      console.log('res', res)
      this.companyInfo = res
      this.tableData = rows
      this.total = total
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryData.pageSize = val
      this.initData()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryData.page = val
      this.initData()
    },

    async editHandler(id) {
      let res = await getRoleInfoApi(id)
      this.$refs.addRole.formData = res
      this.$refs.addRole.dialogShow = true
    },

    async delHandler(id) {
      await this.$confirm('确定删除吗？')
      await delRoleApi(id)
      this.$message.success('删除成功')
      if (this.queryData.page !== 1 && this.tableData.length === 1) {
        this.queryData.page--
      }
      this.initData()
    },
  },
}
</script>

<style>
</style>