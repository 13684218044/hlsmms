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
            <h3>分类管理</h3>
          </div>
          <div class="text item">
            <el-table :data="tableName" style="width: 100%">
              <el-table-column label="分类名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"></i>编辑</el-button>
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
        {name: "日用品" },
        {name: "舒肤佳" },
        {name: "施华蔻" },
        {name: "海飞丝" },
        {name: "沙宣" },
        {name: "食品" },
        {name: "烟酒" },
        {name: "糖果" },
        {name: "水果" },
        {name: "干果" },        
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
