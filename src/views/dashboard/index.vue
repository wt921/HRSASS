<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->

    <el-upload
      action="#"
      :auto-upload="true"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      list-type="picture-card"
      :class="{ hidden: fileList.length === 3 }"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="添加图片" :visible.sync="dialogShow" width="600px">
      <img :src="imgUrl" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import axios from 'axios'
const uploadImg = (data) => {
  return axios({
    url: 'http://124.223.14.236:8060/admin/common/upload?type=images',
    method: 'post',

    data,
    headers: {
      'x-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJpZCI6IjEiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6Ijk2ZTc5MjE4OTY1ZWI3MmM5MmE1NDlkZDVhMzMwMTEyIiwibmFtZSI6IlRoaW5rSlPkuIDlk6UiLCJlbWFpbCI6Imhld3UxMTIyQDE2My5jb20iLCJwaG9uZSI6IjE3MzQyMDY1OTA5IiwibG9naW5faXAiOiI6OjEiLCJsb2dpbl9kYXRlIjoiMjAxOC0wMS0wOCAxNjoyMjo1MSIsImNyZWF0ZV9kYXRlIjoiMjAxNy0xMi0xNCAxMTo1Mjo0NiIsInVwZGF0ZV9kYXRlIjoiMjAyMi0wOC0wMiAxNToxNDoxNiIsImRlbF9mbGFnIjoiMCIsInJvbGVfaWQiOlsiMWM1NGUwMDNjMWZjNGRjZDliMDg3ZWY4ZDQ4YWJhYzMiXSwic3RhdHVzIjoxLCJkZWZhdWx0X2RhdGEiOiIxIiwicm9sZW5hbWUiOlsi6LaF57qn566h55CG5ZGYIl19LCJpYXQiOjE2NTk0MjUwMDV9.vqPDZ8pPPp6n0D1JqgLktNU_97PVE-sAT1PHzXKAMBY',
    },
  })
}

export default {
  name: 'Dashboard',
  computed: {
    // ...mapGetters(['name']),
  },
  data() {
    return {
      imgUrl: '',
      dialogShow: false,
      fileList: [
        {
          name: '1111',
          url: 'http://yun.itheima.com/Upload/Images/20220722/62da600e97fcf.jpg',
        },
        {
          name: '222',
          url: 'https://www.itheima.com/2020gw/images/indeximg/mapxmt.png',
        },
      ],
    }
  },
  methods: {
    onRemove(file, fileList) {
      // console.log(file)
      console.log('onRemove', fileList)
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.dialogShow = true
      this.imgUrl = file.url
    },
    onChange(file, fileList) {
      console.log('change', JSON.stringify(file))
      this.fileList = fileList
      console.log('change', fileList)
    },
    beforeUpload(file) {
      // console.log('beforeUpload', file)
      // return Promise.reject('取消')
    },
    async httpRequest({ file }) {
      let fd = new FormData()
      fd.append('file', file)
      const { data } = await uploadImg(fd)
      console.log(data)
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
::v-deep .hidden {
  div.el-upload {
    display: none;
  }
}
</style>
