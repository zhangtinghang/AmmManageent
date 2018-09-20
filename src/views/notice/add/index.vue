<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公告名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="公告时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
  
      <el-form-item label="公告内容" prop="content">
        <el-input class="textarea-inner" type="textarea" v-model="form.content"></el-input>
      </el-form-item>
  
      <el-form-item label="公告类型" prop="category">
        <el-select v-model="form.category" placeholder="请选择类别">
          <el-option label="android / 安卓" value="0"></el-option>
          <el-option label="web / 前端开发" value="1"></el-option>
          <el-option label="python / python开发" value="2"></el-option>
          <el-option label="games / 游戏开发" value="3"></el-option>
          <el-option label="UI / UI设计" value="4"></el-option>
          <el-option label="Other / 其他" value="5"></el-option>
        </el-select>
      </el-form-item>
  
      <el-form-item label="发布类型" prop="status">
        <el-switch v-model="form.isOpen" active-text="公开" inactive-text="私密"></el-switch>
      </el-form-item>

      <el-form-item label="现在发布" prop="status">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import store from '@/store'
  import {
    addNotice
  } from '@/api/notice'
  export default {
    data() {
      return {
        form: {
          title: '',
          startTime: '',
          endTime: '',
          content: '',
          status: 1,
          isOpen: false,
          category:''
        }
      }
    },
    methods: {
      onSubmit() {
        let userId = store.getters.user;
        let token = store.getters.token;
        if (this.form && this.form.status == true) {
          this.form.status = 0
        } else {
          this.form.status = 1
        }
        addNotice(userId, token, this.form).then(response => {
          const data = response;
          if (data.success == true && data.errno == 0) {
            this.$message({
              message: '发布公告成功！',
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
      resetForm() {
        this.$refs['form'].resetFields();
        this.form.startTime = '';
        this.form.endTime = '';
        // this.form
      },
      submitUpload() {
        this.$refs.upload.submit();
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
  
  .textarea-inner>textarea {
    min-height: 300px !important;
  }
</style>
