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
            <h3>商品管理</h3>
          </div>
          <div class="text item">
            <!-- 搜索 -->
            <div>
              <!-- 设置 inline 属性可以让表单域变为行内的表单域 -->
              <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-form-item label="所属分类">
                  <el-select v-model="formSearch.classname" placeholder="请选择分类">
                    <el-option label="日用品" value="日用品"></el-option>
                    <el-option label="零食" value="零食"></el-option>
                    <el-option label="酒水" value="酒水"></el-option>
                    <el-option label="饮料" value="饮料"></el-option>
                    <el-option label="服装" value="服装"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关键词">
                  <el-input id="keywords" v-model="formSearch.keywords" placeholder="查询商品名称、条形码"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="onSearch()" icon="el-icon-search">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div id="searchBox"></div>
            <!-- 管理列表 -->
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="商品条码">
                  <template slot-scope="scope">
                    {{ scope.row.barcode }}
                  </template>
                </el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    {{ scope.row.goodsname }}
                  </template>
                </el-table-column>

                <el-table-column label="所属分类">
                  <template slot-scope="scope">
                    {{ scope.row.classname }}
                  </template>
                </el-table-column>

                <el-table-column label="售价">
                  <template slot-scope="scope">
                    {{ scope.row.saleprice }}
                  </template>
                </el-table-column>

                <el-table-column label="市场价">
                  <template slot-scope="scope">
                    {{ scope.row.marketprice }}
                  </template>
                </el-table-column>

                <el-table-column label="成本价">
                  <template slot-scope="scope">
                    {{ scope.row.costprice }}
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.userid)">
                      <i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                      <i class="el-icon-delete"></i>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <!-- 设置background属性可以为分页按钮添加背景色。 -->
            <div id="pagerBox">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,2,3,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" background :total="total">
              </el-pagination>
            </div>
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
      currentPage: 1, //当前在那页
      pageSize: 3, //每页大小，默认值
      total: 0, //总记录数量
      // 查询的表单
      formSearch: {
        classname: "",
        keywords: ""
      },
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
    },
 
    //由于第一次全表查询，和点击搜索按钮请求的是同一个地址，所以把请求合并为一个方法，分别调用一次
    getGoods() {
      this.axios
        .get(
          this.apiHost +
            `/goods/getgoods?classname=${this.formSearch.classname}&keywords=${
              this.formSearch.keywords
            }&pagesize=${this.pageSize}&currentpage=${this.currentPage}`
        )
        .then(result => {
          //把查询到的商品信息的数组对象赋值给表格数据属性
          this.tableData = result.data.goodsArray;
          //把后端返回的total总记录数赋值给total属性
          this.total = result.data.total;
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //查询按钮执行的方法
    onSearch() {
      console.log("搜索的分类和关键词", this.formSearch);
      //1）前端——点击搜索按钮就把 商品分类和关键词 发送到后端api
      this.getGoods();
    },
    //改变每页大小的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //把改变后的值赋值给数据属性
      this.pageSize = val;
      this.getGoods();
    },
    //改变当前页的方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //把改变后的值赋值给数据属性
      this.currentPage = val;
      this.getGoods();
    }
  },
  mounted() {
    console.log("vue的视图挂载完毕!");
  },
  created() {
    //console.log("vue实例创建完毕!");
    //发起ajax获取商品信息
    this.getGoods();
  }
};
</script>

<style>
</style>
