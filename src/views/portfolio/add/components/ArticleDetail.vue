<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="category" label-width="80px" label="博文类别:" class="postInfo-container-item">
                    <el-select v-model="postForm.category" placeholder="请选择类别">
                      <el-option label="android / 安卓" value="0"></el-option>
                      <el-option label="web / 前端开发" value="1"></el-option>
                      <el-option label="python / python开发" value="2"></el-option>
                      <el-option label="games / 游戏开发" value="3"></el-option>
                      <el-option label="UI / UI设计" value="4"></el-option>
                      <el-option label="Other / 其他" value="5"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
                <el-col :span="8">
                    <el-form-item label-width="50px" label="团队:" prop="team_name" class="postInfo-container-item">
                      <el-input placeholder="团队名称" style='min-width:300px;' v-model="postForm.team_name">
                      </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="多个输入请用英文状态下逗号隔开" placement="top">
                    <el-form-item label-width="80px" prop="technology" label="技术栈:" class="postInfo-container-item">
                      <el-input placeholder="技术栈" style='min-width:400px;' v-model="postForm.technology">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" prop="intro" label-width="80px" label="作品简介:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="作品简介" v-model="postForm.intro">
          </el-input>
        </el-form-item>
        <el-form-item :inline="true" style="margin-bottom: 40px;" label-width="80px" prop="links_name" label="友情链接:">
          <el-tooltip class="item" effect="dark" content="多个输入请用英文状态下逗号隔开" placement="top">
            <el-input placeholder="链接信息" style='width:400px;' autosize v-model="postForm.links_name"> </el-input>
          </el-tooltip>
            <el-input placeholder="链接网址" style='width:400px;' v-model="postForm.links_url"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="80px" prop="Testimonial_name" label="特别鸣谢:">
          <el-tooltip class="item" effect="dark" content="多个输入请用英文状态下逗号隔开" placement="top">
            <el-input placeholder="特别鸣谢名字" style='width:400px;' v-model="postForm.Testimonial_name"></el-input>
          </el-tooltip>
            <el-input placeholder="特别鸣谢链接" style='width:400px;' v-model="postForm.Testimonial_url"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="80px" prop="isOpen" label="是否公开:">
          <el-switch
            v-model="postForm.isOpen"
            active-text="公开"
            inactive-text="私密">
          </el-switch>
        </el-form-item>
        

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="封面:">
          <el-upload
            class="upload"
            ref="upload"
            name="images"
            drag
            :auto-upload="false"
            :action= "upLoadImgSrc"
            :multiple="false"
            :limit = 1
            :on-success = "imagesUpSuccsee"
            list-type="picture"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-button style="margin-left: 0px;" size="small" @click="removeUpload">取消</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-form-item>

        <!-- 确认按钮 -->
        <template v-if="fetchSuccess">
          <el-button v-loading="loading" style="margin: 10px 10px;" type="success" @click="submitForm()">发布
          </el-button>
          <!-- <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button> -->
        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>
        <el-button @click="markdown2Html" style="margin-top:0;" type="primary" icon="el-icon-document">To HTML</el-button>
        <div v-html="html"></div>
        <!-- markdown -->
        <div class="editor-container" style="min-height:300px">
          <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20"></markdown-editor>
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import MarkdownEditor from '@/components/MarkdownEditor'
import { addPortfolio } from '@/api/portfolio'
import store from '@/store'
const content = `
**this is test**
* vue
* element
* webpack
## Simplemde
`
const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  team_name: '',//团队名称
  technology: '',//所用技术栈
  intro: '', // 作品简介
  category: '',//作品类别
  links_name: '', // 文章外链
  links_url:'',
  Testimonial_name: '',//链接名
  Testimonial_url: '',
  isOpen: false
}

export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky, MarkdownEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      html:'',
      content:content,
      fileList: '',
      dialogImageUrl: '',
      dialogVisible: false,
      cover:'',
      upLoadImgSrc: this.GLOBAL.upImgSrc + '/public/portfolio/upCover'
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData() {
      fetchArticle().then(response => {
        this.postForm = response.data
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    //图片上传
      uploadCover(file,fileList){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      removeUpload(file){
        this.$refs.upload.clearFiles();
      },
      submitUpload(){
        this.$refs.upload.submit();
      },
      imagesUpSuccsee(response, file, fileList){
        this.cover = response.data;
      },
    // 发布
    submitForm() {
      if(!this.postForm.title){
        this.$message({
          message: '标题为必填项!',
          type: 'warning'
        })
        return false;
      }

      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      //保存数据库
      var formData = this.postForm;
      formData.content = this.html;
      formData.cover = this.cover;
      formData.links = {
        name:formData.links_name,
        url:formData.links_url
      }
      formData.Testimonial = {
        name:formData.links_name,
        url:formData.links_url,
      }
      let userId = store.getters.user;
        let token = store.getters.token;
      this.loading = true;
      addPortfolio(userId,token,formData).then(response => {
        const data = response;
        if(data.success == true){
         this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          try {
            this.$refs['postForm'].resetFields();
            this.content = '';
            this.links_url = '';
            this.Testimonial_url = '';
        } catch (e) {

        }
          this.postForm.status = 'published'
          this.loading = false
          //清空数据

          // formData.title = '';
          // formData.intro = '';
          // formData.category = '';
        }
      }).catch(err => {
        console.log(err)
      })
      })
    },
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      })
    }
    // 保存草稿
    // draftForm() {
    //   if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
    //     this.$message({
    //       message: '请填写必要的标题和内容',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.$message({
    //     message: '保存成功',
    //     type: 'success',
    //     showClose: true,
    //     duration: 1000
    //   })
    //   this.postForm.status = 'draft'
    // },
    // markdown2Html() {
    //   import('showdown').then(showdown => {
    //     const converter = new showdown.Converter()
    //     this.html = converter.makeHtml(this.content)
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .simplemde-container{
    overflow: auto;
    min-height: 300px;
    height: auto;
  }
</style>

