<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="消息名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker prop="startTime" type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11" prop="endTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
  
      <el-form-item label="活动内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
  
      <el-form-item label="现在发布" prop="status">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <!-- <el-button @click="addDomain">新增下载信息</el-button> -->
      <div class="links">
        <el-form-item class="link-title" label="下载标题" prop="linkName">
          <el-input v-model="form.linkName" placeholder="下载标题"></el-input>
        </el-form-item>
        <el-form-item label="下载链接" prop="links">
          <el-select v-model="form.links" placeholder="下载链接">
            <el-option
              v-for="item in linkArray"
              :key="item.name"
              :label="item.name"
              :value="item.url">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
  
      <el-form-item style="margin-bottom: 40px;" label-width="80px" label="封面:">
        <el-upload class="upload" ref="upload" name="file" drag :auto-upload="false" :action="upLoadImgSrc" :multiple="false" :limit=1 :on-success="imagesUpSuccsee">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button style="margin-left: 0px;" size="small" @click="removeUpload">取消</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import { addDownload } from '@/api/downLoad'
  export default {
    data() {
      return {
        form: {
          title: '',
          startTime: '',
          endTime: '',
          content: '',
          status: 0,
          linkName: '',
          links: '',
          desc: ''
        },
        upLoadImgSrc: this.GLOBAL.upImgSrc + '/public/upload',
        linkArray:[]
      }
    },
    methods: {
      onSubmit() {
        let userId = store.getters.user;
        let token = store.getters.token;
        if(this.form && this.form.status == true){
          this.form.status = 0
        }else{
          this.form.status = 1
        }
        addDownload(userId,token,this.form).then(response => {
          const data = response;
          if(data.success == true){
          this.$message({
              message: '提交下载信息成功！',
              type: 'success'
            });
            try {
                this.$refs['form'].resetFields();
                this.form.startTime = '';
                this.form.endTime = '';
            } catch (e) {}
          }
        }).catch(err => {
          console.log(err)
        })
      },
      resetForm( formName ){
          this.$refs['form'].resetFields();
          this.$refs.upload.clearFiles();
          this.form.startTime = '';
          this.form.endTime = '';
          // this.form
      },
      removeUpload(file) {
        this.$refs.upload.clearFiles();
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      //上传文件成功
      imagesUpSuccsee(response, file, fileList) {
        if(response.success == true){
          this.$notify({
              title: '成功',
              message: '文件上传成功',
              type: 'success',
              duration: 2000
            })
          this.linkArray.push(response.data);
        }
      },
      addDomain(){
        this.form.links.push({
          url: '',
          name:'',
          key: Date.now()
        });
      },
      removeDomain(item){
        var index = this.form.links.indexOf(item)
        if (index !== -1) {
          this.form.links.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped>
  .el-form {
    width: 60%;
    margin: 20px auto;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 10px;
    padding-right: 15px;
    transition: .2s;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6);
  }
  
  .el-form:hover {
    transition: .2s;
    box-shadow: 0 2px 4px 0 rgba(232, 237, 250, .5)
  }
  
  .line {
    text-align: center;
  }
  .links{
    display: flex;
  }
  .link-title{
    width: 50%;
  }
</style>
