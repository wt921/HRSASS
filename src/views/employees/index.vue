<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :text="`共有${total}条记录`">
        <el-button size="small" type="danger" @click="expToExcelHandler"
          >普通excel导出</el-button
        >
        <el-button
          size="small"
          type="info"
          @click="expToExcelFzHandler"
          :disabled="checkList.length === 0"
          >复杂表头excel导出</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="$router.push('/import?type=user')"
          >excel导入</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="$refs.addEmploy.showDialog = true"
          >新增员工</el-button
        >
      </page-tools>

      <!-- 表格和分页 -->
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list" @selection-change="checkList = $event">
          <el-table-column type="selection" />
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterFun"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="账户状态" sortable="" prop="workNumber" /> -->
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delHandler(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryData.page"
            :page-size="queryData.size"
            :page-sizes="[10, 8, 5]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            align="right"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <AddEmploy ref="addEmploy" @updataList="initData"></AddEmploy>
  </div>
</template>

<script>
import AddEmploy from './components/addEmply.vue'
import EmployeesConst from '@/api/constant/employees'
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
import { formatDate } from '@/filters'
export default {
  data() {
    return {
      list: [],
      checkList: [],
      queryData: {
        page: 1,
        size: 10,
      },
      total: 0,
    }
  },
  components: { AddEmploy },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { rows, total } = await getEmployeeListApi(this.queryData)
      // console.log('res', res)
      ;(this.list = rows), (this.total = total)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryData.size = val
      this.initData()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryData.page = val
      this.initData()
    },
    formatterFun(row, column, cellValue, index) {
      let res = EmployeesConst.hireType.find(
        (item) => item.id === cellValue * 1
      )
      return res ? res.value : '未知'
    },
    async delHandler(id) {
      await this.$confirm('确定删除吗？')
      await delEmployeeApi(id)
      this.$message.success('删除成功')
      if (this.queryData.page !== 1 && this.list.length === 1) {
        this.queryData.size--
      }
      this.initData()
    },
    expToExcelHandler() {
      import('@/vendor/Export2Excel').then(async (excel) => {
        console.log('excel', excel)
        const { rows } = await getEmployeeListApi({ page: 1, size: 1000000 })
        let result = this.zlsjData(rows)
        excel.export_json_to_excel({
          header: result.tableHeader, //表头 必填
          data: result.list, //具体数据 必填
          filename: '所有员工数据', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
        })
      })
    },
    // 复杂表头导出
    expToExcelFzHandler() {
      import('@/vendor/Export2Excel').then(async (excel) => {
        // console.log('excel', excel)
        // const { rows } = await getEmployeeListApi({ page: 1, size: 1000000 })
        let result = this.zlsjData(this.checkList)
        excel.export_json_to_excel({
          header: result.tableHeader, //表头 必填
          data: result.list, //具体数据 必填
          multiHeader: [['姓名', '主要信息', '', '', '', '', '部门']], //复杂表头
          merges: ['A1:A2', 'B1:F1', 'G1:G2'], //合并规则
          filename: '所有员工数据', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
        })
      })
    },
    // 处理数据
    zlsjData(rows) {
      // 现有的数据结构
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName',
      }
      let arr = []
      rows.forEach((item) => {
        let temp = []
        Object.keys(headers).forEach((key) => {
          if (headers[key] === 'formOfEmployment') {
            let findRes = EmployeesConst.hireType.find(
              (v) => v.id === item[headers[key]] * 1
            )
            temp.push(findRes ? findRes.value : '未知')
          } else if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            temp.push(formatDate(item[headers[key]]))
          } else {
            temp.push(item[headers[key]])
          }
        })
        arr.push(temp)
      })

      return { list: arr, tableHeader: Object.keys(headers) }
    },
  },
}
</script>

<style>
</style>