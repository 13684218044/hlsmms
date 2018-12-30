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
              <h3>系统信息</h3>             
            </div>
            <div class="text item">
                <el-alert
                  title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82"
                  type="success"
                  show-icon>
                </el-alert>
                <el-alert
                  title="导入数据"
                  type="info"
                  show-icon>
                </el-alert>
                <!-- 一行两列 -->
                <el-row :gutter="40">
                    <!-- 左边 -->
                    <el-col :span="12">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <h3>销售排行</h3>    
                        </div>
                        <div class="text item">
                            <el-table :data="tableData" stripe style="width: 100%">                             
                               <el-table-column  prop="goodsname" label="商品名称"></el-table-column>                                                  
                               <el-table-column  prop="salenum" label="销售"></el-table-column>                                                  
                            </el-table>
                        </div>
                      </el-card>
                    </el-col>
                    <!-- 右边 -->
                    <el-col :span="12"> 
                       <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <h3>缺货的商品</h3>                          
                        </div>
                        <div class="text item">
                            <el-table :data="operation" style="width: 100%">                             
                               <el-table-column  prop="trade" label="商品名称"></el-table-column>                                                  
                               <el-table-column  prop="inventory" label="库存"></el-table-column>                                                  
                               <el-table-column  prop="operation" label="操作"></el-table-column>                                                  
                             </el-table>
                        </div>
                      </el-card>
                    </el-col>
                </el-row>
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
      tableData:[
        {goodsname:'海飞丝去屑洗发水',salenum:8},
        {goodsname:'茅台酒',salenum:3},
        {goodsname:'龙凤呈祥',salenum:6},
        {goodsname:'龙凤呈祥2',salenum:5}
      ],
      operation:[
         {trade:'我的优乐美',inventory:0,operation:'入库'},
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
