<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <tree-tools :is-root="true" :tree-node="company"> </tree-tools>
        <!-- data属性是树的数据   props属性是展示的规则   label展示的文字字段  默认是label  children是子级数据    show-checkbox是否显示勾选框-->
        <el-tree :data="departs" :props="{ label: 'name' }">
          <tree-tools slot-scope="{ data }" :tree-node="data"></tree-tools>
          <!-- slot-scope作用域插槽的数据信息：slot-scope 就是组件内部将数据提供给外部
          slot-scope="scope"  就是组件内部提供给外部的数据-->
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import treeTools from '@/views/departments/components/tree-tools.vue'
import { getDepartmentListApi } from '@/api/department'
export default {
  name: 'Departments',
  data() {
    return {
      company: {
        name: '传智教育',
        manager: '负责人',
      },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }],
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' },
      ],
      detps: [],
    }
  },
  components: { treeTools },
  created() {
    this.initDate()
  },
  methods: {
    async initDate() {
      const { companyName, depts } = await getDepartmentListApi()
      console.log(companyName, depts)
    },
  },
}
</script>

<style  scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>>

