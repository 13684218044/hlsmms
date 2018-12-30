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
              <h3>添加商品</h3>             
            </div>
            <div class="text item">
                
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
import LeftMenu from '../components/leftMenu';
import RightTop from '../components/rightTop';
import RightBottom from '../components/rightBottom';
export default {
  data(){
    return {
      
    };
  },
  components: {
      //注册组件
      LeftMenu,
      RightTop,
      RightBottom
  },
  
};
</script>

<style>
</style>
