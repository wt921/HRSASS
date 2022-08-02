<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>

    <el-upload
      action="http://124.223.14.236:8060/admin/common/upload?type=images"
      name="file"
      :headers="{ 'x-token': token }"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :on-change="onChange"
      :before-upload="beforeUpload"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="添加图片" :visible.sync="dialogShow">
      <img :src="imgUrl" alt="" width="300px" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJpZCI6IjEiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ijk2ZTc5MjE4OTY1ZWI3MmM5MmE1NDlkZDVhMzMwMTEyIiwibmFtZSI6IlRoaW5rSlPkuIDlk6UiLCJlbWFpbCI6Imhld3UxMTIyQDE2My5jb20iLCJwaG9uZSI6IjE3MzQyMDY1OTA5IiwibG9naW5faXAiOiI6OjEiLCJsb2dpbl9kYXRlIjoiMjAxOC0wMS0wOCAxNjoyMjo1MSIsImNyZWF0ZV9kYXRlIjoiMjAxNy0xMi0xNCAxMTo1Mjo0NiIsInVwZGF0ZV9kYXRlIjoiMjAyMS0wOS0wOCAxOTo0MzowMyIsImRlbF9mbGFnIjoiMCIsInJvbGVfaWQiOlsiMWM1NGUwMDNjMWZjNGRjZDliMDg3ZWY4ZDQ4YWJhYzMiXSwic3RhdHVzIjoxLCJkZWZhdWx0X2RhdGEiOiIxIiwicm9sZW5hbWUiOlsi6LaF57qn566h55CG5ZGYIl19LCJpYXQiOjE2NTgyODgxOTZ9.50cDi__hwpvPX9rLUbrHop0U6zrJBdrlphk4ywU43_E',
      imgUrl: '',
      dialogShow: false,
    }
  },
  methods: {
    onSuccess(val) {
      console.log(val)
    },
    onRemove(file) {
      // console.log(file)
      console.log('onRemove')
    },
    onPreview(file) {
      console.log(file)
      this.dialogShow = true
      this.imgUrl = file.url
    },
    onChange(file, fileList) {
      console.log('change', JSON.stringify(file))
    },
    beforeUpload(file) {
      console.log('beforeUpload', file)
      return Promise.reject('取消')
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
