<template>
 <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
   <el-form-item label="学号" prop="number">
    <el-input type="number" v-model="ruleForm2.number" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="username">
    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="所属部门" prop="type">
    <el-select v-model="ruleForm2.type" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>

</el-form>   
</template>

<script>
  import store from '@/store'
  import { register } from '@/api/login'
  export default {
    data() {
      var validateNumber = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('学号不能为空'));
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('姓名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          number: '',
          username: '',
          password: '',
          checkPass:'',
          type:''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          number: [
            { validator: validateNumber, trigger: 'blur' }
          ],
          username: [
             { validator: validateName, trigger: 'blur' }
          ]
        },
         options: [{
          value: 0,
          label: 'Android / 安卓开发'
        }, {
          value: 1,
          label: 'Web / 前端开发'
        }, {
          value: 2,
          label: 'Python / python开发'
        }, {
          value: 3,
          label: 'Games / 游戏开发'
        }, {
          value: 4,
          label: 'UI / UI设计'
        }, {
          value: 5,
          label: 'Other / 其他'
        }],
      };
    },
    methods: {
      submitForm() {
            let user = store.getters.user;
            register(this.ruleForm2.username, this.ruleForm2.number, this.ruleForm2.password, user, this.ruleForm2.type).then(response => {
              if(response.success){
                this.$notify({
                  title: '成功',
                  message: '添加用户成功',
                  type: 'success',
                  duration: 2000
                })
                try {
                  this.$refs['ruleForm2'].resetFields();
                } catch (e) {}
              }else{
                  this.$notify({
                    title: '失败',
                    message: '请正确填写！',
                    type: 'error',
                    duration: 2000
                  })
                  return false;
              }  
            })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" scoped>
.demo-ruleForm{
  width: 50%;
  margin: 20px auto
}

</style>
