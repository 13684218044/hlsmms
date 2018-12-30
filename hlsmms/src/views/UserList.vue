<template>
  <el-container id="home">
    <!-- 左侧 -->
    <LeftMenu></LeftMenu>
    <!-- 右侧 -->
    <el-container id="mainContent">
      <!-- 顶部 -->
      <RightTop></RightTop>
      <!-- 内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>账号管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <!-- 编号 -->
              <el-table-column label="编号">
                <template slot-scope="scope">
                  {{ scope.row.userid}}
                </template>
              </el-table-column>
              <!-- 用户名称 -->
              <el-table-column label="用户名称">
                <template slot-scope="scope">
                  {{ scope.row.username}}
                </template>
              </el-table-column>
              <!-- 日期 -->
              <el-table-column label="添加日期">
                <template slot-scope="scope">
                  {{ scope.row.addDate | foramtData }}
                </template>
              </el-table-column>
              <!-- 用户组 -->
              <el-table-column label="用户组">
                <template slot-scope="scope">
                  {{ scope.row.usergroup}} 
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"></i>编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    <i class="el-icon-delete"></i>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
      <!-- 底部 -->
      <RightBottom></RightBottom>
    </el-container>
  </el-container>
</template>

<script>
//组件引用
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightBottom from "../components/rightBottom";

//引入moment.js
import moment from "moment";

export default {
  data() {
    return {
      // userid
      // username
      // userpwd
      // usergroup
      // addDate
      tableData: []
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  //组件实例化之后执行的钩子
  created() {
    this.axios
      .get("http://127.0.0.1:9090/users/getusers")
      .then(result => {
        console.log("后端返回的数据", result.data);
        this.tableData = result.data; //把返回的数据赋值给表格数据属性
      })
      .catch(err => {
        console.error(err.message);
      });
  },
  //定义过滤器
  filters: {
    foramtData(oldData) {
      return moment(oldData).format("YYYY年MM月DD日");
    }
  }
};
</script>
<style>
</style>
