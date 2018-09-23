<template>
<div class="app-container calendar-list-container">
      <el-table
    :data="tableData"
    border
    v-loading.body="listLoading" element-loading-text="Loading"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="50"
      align="center"
    ></el-table-column>
    <el-table-column prop="updateTime" align="center" label="日期">
      <template slot-scope="scope">
            <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
    </el-table-column>

    <!-- <el-table-column prop="number" align="center" label="账号"></el-table-column> -->
    <el-table-column
      align="center" width="150" label="发布者">
        <template slot-scope="scope">
            <el-tag type="success">{{scope.row.user && scope.row.user.username || '未知'}}</el-tag>
        </template>
    </el-table-column>

    <el-table-column width="100" align="center" label="状态">
      <template slot-scope="scope">
           <el-tag v-if="scope.row.status == 0">启用</el-tag>
           <el-tag v-else-if="scope.row.status == 1" type="danger">停用</el-tag>
      </template> 
    </el-table-column>

    <el-table-column align="center" prop="roles" label="名称">
        <template slot-scope="scope">
            <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
                <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span v-else>{{ scope.row.title }}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" prop="roles" label="内容">  
        <template slot-scope="scope">
            <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.content"></el-input>
                <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span v-else>{{ scope.row.content }}</span>
        </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">完成</el-button>
            <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="info" v-if="scope.row.status == 0" @click="changeStatus(scope.row.status, scope.row._id)" >停用</el-button>
            <el-button size="mini" type="success" v-else-if="scope.row.status == 1" @click="changeStatus(scope.row.status, scope.row._id)">启用</el-button>     
            <el-button size="mini" type="danger" @click="delDownload(scope.row._id)">删除</el-button>
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
</div>

</template>

<script>
import { parseTime } from '@/utils/index'
import { addDownload, getList, changeStatus, delDownload, modDownload } from '@/api/downLoad'
import store from '@/store'
  export default {
    data() {
      return {
        tableData: [],
        count:1,
        nextNum:2,
        preNum:1,
        limit:5,     //调整每页显示条数，可自定义
        listLoading:false
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
        getList(id, preNum, nextNum, limit, token).then(response => {
          that.count = response.count;
          const items = response.data;
          that.tableData = items.map(v => {
          that.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          return v
        })
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

      cancelEdit(row) {
        row.edit = false
        this.$message({
          message: '取消修改',
          type: 'warning'
        })
      },
    confirmEdit(row) {
        let token = store.getters.token;
        let user = store.getters.user;
        console.log(row)
        modDownload(user, token, row).then(response => {
            console.log('修改返回', response)
            if(response.errno==0 && response.success==true){
              row.edit = false
              //修改提交
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
            }else{
              this.$message({
                message: '修改失败！',
                type: 'warning'
              })
            }
        })    
    },
    changeStatus(status, _id){
      let token = store.getters.token;
      let user = store.getters.user;
      changeStatus(user, token, _id, status).then(response => {
        if(response.errno == 0 && response.success == true){
            for (const v of this.tableData) {
              if (v._id === response.data._id) {
                const index = this.tableData.indexOf(v)
                this.tableData[index].status = response.data.status
                break
              }
            }
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
        }else{
          this.$message({
            message: '修改失败！',
            type: 'warning'
          })
        }
      })
    },
    delDownload(_id){
      let token = store.getters.token;
      let user = store.getters.user;
      delDownload(user, token, _id).then(response => {
        if(response.errno == 0 && response.success==true){
            for (const v of this.tableData) {
              if (v._id === _id) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index,1);
                break
              }
            }
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
        }else{
          this.$message({
            message: '删除失败！',
            type: 'warning'
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
  .filter-container {
    margin-bottom: 20px;
  }
  .edit-input {
      width: 80%;
  }
</style>
