<template>
  <div>
    <h1 v-if="type === 'user'">导入员工</h1>
    <h1 v-if="type === 'moeny'">导入工资</h1>
    <h1 v-if="type === 'shebao'">导入社保</h1>
    <upload-excel :on-success="success"></upload-excel>
  </div>
</template>

<script>
import { uploadEmployeeApi } from '@/api/employees'
export default {
  name: 'import',
  data() {
    return {
      type: this.$route.query.type,
    }
  },
  methods: {
    async success({ header, results }) {
      console.log(header, results)
      // 如果是导入员工
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber',
      }
      const arr = []
      //   item每行的数据
      //    Object.keys(item)中文键数组
      results.forEach((item) => {
        const userInfo = {}
        Object.keys(item).forEach((key) => {
          console.log(Object.keys(item))
          // userRelations[keys]是中文键 对应的英文  item是值

          console.log('-----------------------------------------')
          console.log(userRelations[key])

          const temp = ['timeOfEntry', 'correctionTime']
          if (temp.includes(userRelations[key])) {
            userInfo[userRelations[key]] = this.formatDate(item[key], '/')
          } else {
            userInfo[userRelations[key]] = item[key]
            console.log('item[key]', item[key])
          }
        })
        arr.push(userInfo)
      })

      console.log(arr)
      await uploadEmployeeApi(arr)
      this.$message.success('导入成功')
      this.$router.back()
    },

    formatDate(numb, format) {
      console.log(numb, format)
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    },
  },
}
</script>

<style>
</style>