<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="博文标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="博文简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="博文类别" prop="category">
        <el-select v-model="form.category" placeholder="请选择类别">
          <el-option label="android / 安卓" value="0"></el-option>
          <el-option label="web / 前端开发" value="1"></el-option>
           <el-option label="python / python开发" value="2"></el-option>
          <el-option label="games / 游戏开发" value="3"></el-option>
           <el-option label="UI / UI设计" value="4"></el-option>
           <el-option label="Other / 其他" value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布类型" prop="isOpen">
        <el-switch
          v-model="form.isOpen"
          active-text="公开"
          inactive-text="私密">
        </el-switch>

        <el-button type="primary" style="margin-left:5%" @click="onSubmit">创建</el-button>
        
      </el-form-item>
      <!-- 富文本转义问题，暂时用markdown代替，后期可两者交给用户选择 -->
      <!-- <div class="components-container">
        <div>
          <tinymce :height="500" v-model="content"></tinymce>
        </div>
        <div class="editor-content" v-html="content"></div>
      </div> -->
      <div class="editor-container">
        <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20"></markdown-editor>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MarkdownEditor from '@/components/MarkdownEditor'
import { getAuth } from '@/utils/auth' // 验权
import { addBlog } from '@/api/blog'
import store from '@/store'
const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`
const defaultForm = {
  title: '',
  intro: '',
  category: '',
  isOpen: false
}
export default {
  components: { Tinymce, MarkdownEditor },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      content:content,
      html: ''
    }
  },
  methods: {
    onSubmit() {
      if(!this.form.title){
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
        var formData = this.form;
        formData.blog = this.html;
        let userId = store.getters.user;
        let token = store.getters.token;
        addBlog(userId,token,formData).then(response => {
          const data = response;
          console.log(response)
          if(data.success == true){
            this.$message({
              message: '发表成功!',
              type: 'success'
            })
            //清空数据
            try {
                this.$refs['form'].resetFields();
                this.content = ''
            } catch (e) {

            }
          }
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.editor-content{
  margin-top: 20px;
}
/* .simplemde-container{
  overflow: auto;
} */
</style>

