<template>
     <el-aside width="230px">
        <div id='leftTitle'>
          <h1>华联超市管理系统</h1>
          <p><span>您好,</span> admin</p>
          <p><router-link to='/'>管理首页</router-link> | <a href="javascript:void(0)" @click="loginOut()">退出系统</a></p>
        </div>
        <!-- 左侧菜单 -->         
          <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="true"
              >
              <!-- 第1个菜单 -->
              <el-submenu index="1">
                <template slot="title">                   
                  <span>分类管理</span>
                </template>                           
                <el-menu-item index="/pointslist"><router-link to="/pointslist">分类管理</router-link></el-menu-item>
                <el-menu-item index="/pointsadd"><router-link to="/pointsadd">添加分类</router-link></el-menu-item>                                            
              </el-submenu>
              <!-- 第2个菜单 -->
              <el-submenu index="2">
                <template slot="title">                  
                  <span>商品管理</span>
                </template>                           
                <el-menu-item index="/goodslist"><router-link to="/goodslist">商品管理</router-link></el-menu-item>
                <el-menu-item index="/goodsadd"><router-link to="/goodsadd">添加商品</router-link></el-menu-item>                                   
              </el-submenu>   
              <!-- 第3个菜单 -->
              <el-submenu index="3">
                <template slot="title">
                  <span>进货管理</span>
                </template>                           
                <el-menu-item index="/stocklist"><router-link to="/stocklist">库存管理</router-link></el-menu-item>
                <el-menu-item index="/stockadd"><router-link to="/stockadd">添加库存</router-link></el-menu-item>                                            
              </el-submenu>   
              <!-- 第4个菜单 -->
              <el-submenu index="4">
                <template slot="title">                  
                  <span>出货管理</span>
                </template>                           
                <el-menu-item index="/shipmentlist"><router-link to="/shipmentlist">销售列表</router-link></el-menu-item>
                <el-menu-item index="/shipmentchu"><router-link to="/shipmentchu">商品出库</router-link></el-menu-item>               
                <el-menu-item index="/shipmenttui"><router-link to="/shipmenttui">商品退货</router-link></el-menu-item>               
              </el-submenu>
              <!-- 第5个菜单 -->
              <el-submenu index="5">
                <template slot="title">                   
                  <span>统计管理</span>
                </template>                           
                <el-menu-item index="/recordsell"><router-link to='/recordsell'>销售统计</router-link></el-menu-item>
                <el-menu-item index="/recordstock"><router-link to='/recordstock'>进货统计</router-link></el-menu-item>                             
              </el-submenu>
              <!-- 第6个菜单 -->
              <el-submenu index="6">
                <template slot="title">                  
                  <span>账号管理</span>
                </template>                           
                <el-menu-item index="/userlist"><router-link to='/userlist'>账号管理</router-link></el-menu-item>
                <el-menu-item index="/useradd"><router-link to='/useradd'>添加账号</router-link></el-menu-item>               
                <el-menu-item index="/userpwdedit"><router-link to='/userpwdedit'>密码修改</router-link></el-menu-item>               
              </el-submenu>
              <!-- 第7个菜单 -->
              <el-submenu index="7">
                <template slot="title">                  
                  <span>会员管理</span>
                </template>                           
                <el-menu-item index="/memberlist"><router-link to='/memberlist'>账号管理</router-link></el-menu-item>
                <el-menu-item index="/memberadd"><router-link to='/memberadd'>添加账号</router-link></el-menu-item>                             
              </el-submenu>
              <!-- 第8个菜单 -->
              <el-submenu index="8">
                <template slot="title">                   
                  <span>系统管理</span>
                </template>                           
                <el-menu-item index="1-1">系统信息</el-menu-item>
                <el-menu-item index="1-2">系统配置</el-menu-item>               
                <el-menu-item index="1-3">权限管理</el-menu-item>               
                <el-menu-item index="1-3">添加管理组</el-menu-item>               
              </el-submenu>      
          </el-menu>        
      </el-aside>
</template>

<script>
export default {
     data(){
    return {
      isOpened:true,
      
    };
  },
  components: {},
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    loginOut(){
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios.get("http://127.0.0.1:9090/users/loginOut").then(result=>{
         //根据是否清除成功处理业务逻辑
         if(result.data.isok){
           this.$message({
             message:'退出成功！',
             type:'success'
           });
           this.$router.push("/login");
         }  
      }).catch(err=>{
        console.log(err);      
      })
    }
  }
}
</script>

<style>

</style>
