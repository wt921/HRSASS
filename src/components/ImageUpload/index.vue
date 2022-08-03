<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :auto-upload="true"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="httpRequest"
      :class="{ hidden: fileList.length === uploadMaxNum }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog title="添加图片" :visible.sync="dialogShow" width="600px">
      <img :src="imgUrl" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
// 导入腾讯的sdk (sdk就是一个JS文件里面帮助实现一些特定的功能)
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID1sUehW8WfaKq8E6kALI0Ts30iBQQBj39', // 身份识别 ID
  SecretKey: 'tvhFYcVAbnpfJl36uUqxtiKl15xc2HJH', // 身份密钥
})
export default {
  name: 'imageUpload',
  props: {
    uploadMaxNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      imgUrl: '',
      dialogShow: false,
      fileList: [],
      currentFileUid: '', //记录正在上传的这个文件的uid
      percent: 0,
      showPercent: false, // 默认不显示进度条
    }
  },
  methods: {
    onRemove(file, fileList) {
      // console.log(file)
      console.log('onRemove', fileList)
      // file是移除的文件
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    onPreview(file) {
      console.log(file)
      this.dialogShow = true
      this.imgUrl = file.url
    },
    onChange(file, fileList) {
      console.log('change', fileList)
      console.log('change', JSON.stringify(file))
      this.fileList = fileList.map((item) => item)
    },
    beforeUpload(file) {
      console.log('beforeUpload', file)
      // return Promise.reject('取消')
      const maxSize = 1024 * 1024 * 2 //图片尺寸最大不超过2m
      if (file.size > maxSize) {
        this.$message.warning('图片大小不能超过2m')
        return false
      }
      const typeArr = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
      if (!typeArr.includes(file.type)) {
        this.$message.warning('格式不正确')
        return false
      }
      // 走到这里可以实现上传操作
      this.currentFileUid = file.uid
      this.showPercent = true
      this.percent = 0
      return true
    },
    async httpRequest({ file }) {
      // let fd = new FormData()
      // fd.append('file', file)
      // const { data } = await uploadImg(fd)
      // console.log(data)

      cos.putObject(
        {
          // 配置
          Bucket: 'wenting-1313179204', // 存储桶名称
          Region: 'ap-shanghai', // 存储桶地域
          Key: file.name, // 文件名作为key
          StorageClass: 'STANDARD', // 此类写死
          Body: file, // 将本地的文件赋值给腾讯云配置
          // 进度条
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
            this.percent = progressData.percent * 100
          },
        },
        (err, data) => {
          if (err) {
            console.log(err)
            return this.$message.error('上传失败')
          }
          this.fileList = this.fileList.map((item) => {
            if (item.uid === this.currentFileUid) {
              item.url = 'http://' + data.Location
              console.log(data.Location)
              item.upload = true
            }
            return item
          })
          this.currentFileUid = ''
          // 延迟关闭
          setTimeout(() => {
            this.showPercent = false
          })
        }
        // function (err, data) {
        //   console.log(err || data)
        //   console.log(data.Location)
        // }
      )
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .hidden {
  .el-upload {
    display: none;
  }
}
</style>