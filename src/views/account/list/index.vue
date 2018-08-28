<template>
<div class="app-container calendar-list-container">
  <!-- 搜索栏 -->
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="账号检索"></el-input>

    <!-- <el-select clearable class="filter-item" style="width: 130px" placeholder="状态">
      <el-option label="停用" value="停用"></el-option>
      <el-option label="启用" value="启用"></el-option>
    </el-select> -->

    <!-- <el-select style="width: 140px" class="filter-item" placeholder="类别">
      <el-option label="普通用户" value="普通用户"></el-option>
      <el-option label="管理员" value="管理员"></el-option>
      <el-option label="超级管理" value="超级管理"></el-option>
    </el-select> -->

    <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">审核人</el-checkbox> -->
  </div>
    
<el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="number" align="center" label="账号"></el-table-column>
    <el-table-column
      align="center" width="150" label="姓名">
        <template slot-scope="scope">
            <el-tag type="success">{{scope.row.username}}</el-tag>
        </template>
    </el-table-column>  
    <el-table-column align="center" prop="roles" label="类别">
      <template slot-scope="scope">
         <el-tag
         :key="tag"
         v-for="tag in scope.row.roles"
         disable-transitions
         >{{tag | category}}</el-tag>
       </template>     
    </el-table-column>
    <el-table-column width="100" align="center" label="状态">
      <template slot-scope="scope">
           <el-tag v-if="scope.row.status == 0">启用</el-tag>
           <el-tag v-else-if="scope.row.status == 1" type="danger">停用</el-tag>
      </template> 
    </el-table-column>
    <el-table-column prop="updateTime" align="center" label="日期">
      <template slot-scope="scope">
            <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="info" v-if="scope.row.status == 0" @click="statusUser(scope.row.status, scope.row._id)">停用</el-button>
            <el-button size="mini" type="success" v-else-if="scope.row.status == 1" @click="statusUser(scope.row.status, scope.row._id)">启用</el-button>     
            <el-button size="mini" type="danger" @click="deleteUser(scope.row._id)">删除</el-button>
        </el-row>
        </template>
    </el-table-column>
  </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size="limit"
  :total="count"
  @current-change="currentFun"
  >
</el-pagination>

 <el-dialog title="编辑" :visible.sync="dialogFormVisible">
  <el-form  ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 60%; margin:0 auto;'>
    <el-form-item label="账号" prop="number">
      <el-input type="number" v-model="temp.number" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input type="text" v-model="temp.username"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="temp.accountType" placeholder="账号类别">
        <el-option label="普通用户" value="normal"></el-option>
        <el-option label="管理员" value="edit"></el-option>
        <el-option label="超级管理员" value="admin"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="temp.accountState" placeholder="账号状态">
        <el-option label="启用" value="0"></el-option>
        <el-option label="停用" value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
    <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
  </div>
</el-dialog>
</div>

</template>

<script>
import {parseTime} from '@/utils/index'
import { getUserList, changeStatus, delAccount, updateAccount } from '@/api/account'
import store from '@/store'
  export default {
    data() {
      return {
        tableData: [],
        count:1,
        nextNum:2,
        preNum:1,
        limit:5,     //调整每页显示条数，可自定义
        dialogFormVisible: false,
        temp:{
          accountType:'',
          accountState:''
        }
      }
    },
    filters:{
      parseTime:parseTime,
      category:function(value){
        switch (value) {
          case 'normal':
            return '普通用户'
            break;
          case 'admin':
            return '超级管理'
            break;
          case 'edit':
            return '管理员'
            break;
          default:
            break;
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(_id) {
        let that = this;
        that.listLoading = true
        let limit = that.limit;
        let token = store.getters.token;
        let id = _id || null;
        let preNum = that.preNum;
        let nextNum = that.nextNum;
        nextNum = parseInt(that.nextNum);
        preNum = parseInt(that.preNum);
        getUserList(id, preNum, nextNum, limit, token).then(response => {
          that.tableData = response.data;
          that.count = response.count;
          that.listLoading = false;
          if(_id){
            that.preNum = nextNum;
          }
        })
      },
      currentFun(val){
        let that = this;
        that.nextNum = val;
        let _id = null;
        if(that.preNum < that.nextNum){
          _id = that.tableData[that.tableData.length-1]._id;        
        }else{
          _id = that.tableData[0]._id;
        }
        that.fetchData(_id);
      },
      statusUser(status,_id){
        let token = store.getters.token;
        let user = store.getters.user;
        changeStatus(user, token, _id, status).then(response => {
          if(response.errno == 0){
            if(response.success == true){
              for (const v of this.tableData) {
                if (v._id === response.data._id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData[index].status = response.data.status
                  break
                }
              }
            }
          }
        })
      },
      deleteUser(_id){
        let token = store.getters.token;
        let user = store.getters.user;
        delAccount(user, token, _id).then(response => {
          if(response.errno == 0){
            if(response.success == true){
              for (const v of this.tableData) {
                if (v._id === _id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData.splice(index,1);
                  break
                }
              }
            }
          }
        })
      },
      editUser(data){
        this.temp = Object.assign(this.temp, data) // copy obj
        if(data.status == 0){
          this.temp.accountState = '启用'
        }else if(data.status == 1){
          this.temp.accountState = '停用'
        }

        switch (data.roles[0]) {
          case 'normal':
            this.temp.accountType = '普通用户'
          break;
          case 'edit':
            this.temp.accountType = '管理员'
          break;
          case 'admin':
            this.temp.accountType = '超级管理员'
          break;  
          default:
            break;
        }
        this.dialogFormVisible = true;
      },
      updateData(data){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp);
            switch (tempData.accountState) {
              case '启用':
                delete tempData.status;
                break;
              case '停用':
                delete tempData.status;
                break;
              case '0':
                tempData.status = 0;
                break;
              case '1':
                tempData.status = 1;
                break;
              default:
                break;
            }

            switch (tempData.accountType) {
              case '普通用户':
                delete tempData.roles;
                break;
              case '管理员':
                delete tempData.roles;
                break;
              case '超级管理员':
                delete tempData.roles;
                break;
              case 'normal':
                tempData.roles = ['normal'];
                break;
              case 'edit':
                tempData.roles = ['edit'];
                break;
              case 'admin':
                tempData.roles = ['admin'];
                break;
              default:
                break;
            }
            let _id = tempData._id;
            delete tempData._id;
            delete tempData.token;
            delete tempData.createTime;
            delete tempData.accountState;
            delete tempData.accountType;
            tempData.number = Number(tempData.number);
            let token = store.getters.token;
            let user = store.getters.user;
            updateAccount(user, token, _id, tempData).then( response => {
              for (const v of this.tableData) {
                if (v._id === response.data._id) {
                  const index = this.tableData.indexOf(v)
                  this.tableData.splice(index, 1, response.data)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      }
    }
  }

</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
    margin-top:10px; 
  }
  .filter-container{
    margin-bottom: 20px;
  }
</style>
