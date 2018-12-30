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
            <el-table :data="tableName" style="width: 100%">
              <el-table-column label="用户名称">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户组">
                <template slot-scope="scope">
                  <div slot="reference" class="userGroups-wrapper">
                    <el-tag size="medium">{{ scope.row.userGroups }}</el-tag>
                  </div>
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
export default {
  data() {
    return {
      tableName: [
        {
          name: "张三",
          userGroups: "超级管理员"
        },
        {
          name: "王五",
          userGroups: "普通管理员"
        }
      ]
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  }
};
</script>
<style>
</style>
