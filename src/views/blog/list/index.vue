<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | timeString}}</span>
        </template>
      </el-table-column>
      <el-table-column label="博文标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="博文简介" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.intro}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user">{{scope.row.user.username}}</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini" type="info" v-if="scope.row.status == 0" @click="statusBlog(scope.row.status, scope.row._id)">停用</el-button>
            <el-button size="mini" type="success" v-else-if="scope.row.status == 1" @click="statusBlog(scope.row.status, scope.row._id)">启用</el-button>     
            <el-button size="mini" type="danger" @click="deleteBlog(scope.row._id)">删除</el-button>
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
import { getList, changeStatus, delBlog } from '@/api/blog'
import store from '@/store'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      count:1,
      nextNum:2,
      preNum:1,
      limit:20     //调整每页显示条数，可自定义
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    timeString(time) {
      const date2 = new Date(time);
      return date2.toLocaleString();
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(_id) {
      let that = this;
      this.listLoading = true
      let limit = that.limit;
      let token = store.getters.token;
      let id = _id || null;
      let preNum = that.preNum;
      let nextNum = that.nextNum;
      nextNum = parseInt(that.nextNum);
      preNum = parseInt(that.preNum);
      getList(id, preNum, nextNum, limit, token).then(response => {
        that.list = response.data;
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
        _id = that.list[that.list.length-1]._id;        
      }else{
        _id = that.list[0]._id;
      }
      that.fetchData(_id);
    },
    statusBlog(status, _id) {
      let token = store.getters.token;
      let user = store.getters.user;
      changeStatus(user, token, _id, status).then(response => {
        if(response.errno == 0){
          if(response.success == true){
            for (const v of this.list) {
              if (v._id === response.data._id) {
                const index = this.list.indexOf(v)
                this.list[index].status = response.data.status
                break
              }
            }
          }
        }
      })
    },
    deleteBlog(_id){
      let token = store.getters.token;
      let user = store.getters.user;
      delBlog(user, token, _id).then(response => {
        if(response.errno == 0){
          if(response.success == true){
            for (const v of this.list) {
              if (v._id === _id) {
                const index = this.list.indexOf(v)
                this.list.splice(index,1);
                break
              }
            }
          }
        }
      })
    }
  }
}
</script>
