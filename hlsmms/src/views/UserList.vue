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
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"></i>编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
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
     <!-- 修改用户资料的对话框 -->
        <el-dialog
        title="修改用户资料"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose" id="mydailog">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position='right'>
              <el-form-item label="用户名:" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="userpwd">
                <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选择用户组:" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择用户组">
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              </el-form-item> -->
            </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm2')">确定修改</el-button>
        </span>
      </el-dialog> 
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
      tableData: [],
      dialogVisible: false, //控制对话框的显示true和隐藏false
         //数据对象
      ruleForm2: {
        userpwd: "",
        username: "",        
        usergroup: ""
      },
      //验证规则
      rules2: {
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "账号不能为空" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 2,
            max: 18,
            message: "用户名长度在 2到 18 个字符",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  components: {
    //注册组件
    LeftMenu,
    RightTop,
    RightBottom
  },
  methods: {
    //提交表单的方法
    submitForm(formName) {
      //调用组件的验证方法提交表单是验证
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          //发起ajax请求去后端做数据库添加用户第二大步
          //1）获取用户数据
          //console.log(this.ruleForm2);
          //alert("修改验证通过!!!");
          //2)前端——收集新的数据并发起ajax请求到后端api:  
          this.axios
            .post(
              this.apiHost+"/users/usersave",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              //reslt {"isOk":true,"code":1,"msg":"用户添加成功！"}
              if (result.data.isok) {
                this.$message({
                  message: result.data.msg,
                  type: "success"
                });
                //修改完毕就关闭对话框
                this.dialogVisible = false;
                //调用获取数据的方法更新数据列表
                this.getusers();
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {
              this.$message.error("错了哦" + err.message);
            });
        } else {
          //alert("× 表单验证失败!");
          return false;
        }
      });
    },

    //获取用户数据的方法
    getusers() {
      this.axios
        .get(this.apiHost+"/users/getusers")
        .then(result => {
          //console.log("后端返回的数据",result.data);
          this.tableData = result.data; //把返回的数据赋值给表格数据属性
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //实现编辑功能 第一步：获取旧数据并回填
    handleEdit(userid) {
      // (1)前端——点击编辑按钮：绑定事件执行修改的方法，获取编辑的id
      //console.log(userid);
      // (2)前端——发起ajax请求到后端获取旧的数据
      this.axios
        .get(this.apiHost+"/users/getuserbyid?userid=" + userid)
        .then(oldUserData => {
         // console.log("服务器返回的结果", oldUserData);
          // (5)前端——把旧的数据回填的表单中
          this.ruleForm2 = oldUserData.data[0];
          //5.1准备模态框
          //5.2使用双向数据绑定回填数据
          this.dialogVisible = true; //显示对话框
        })
        .catch(err => {
          this.$message.error("出错了：" + err.message); //调用消息框给用户提示
        });
    },
    //实现删除功能
    handleDelete(userid) {
        this.$confirm("确认要删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(()=>{
        
        // 1.前端——点击删除按钮：绑定事件执行删除的方法，根据id执行删除
        console.log("删除用户的id", userid);
        // 2.前端——发起ajax请求到后端
        this.axios
          .get(this.apiHost+"/users/deluser?userid=" + userid)
          .then(result => {
           // console.log("服务器返回的结果", result);
            // 6.前端——根据返回的结果处理业务逻辑（删除成功就更新用户列表）
            result = result.data;
            //删除成功
            if (result.isok) {
              this.$message({
                message: result.msg,
                type: "success"
              });
              this.getusers(); //调用方法
            } else {
              this.$message.error("出错了：" + result.msg);
            }
          })
          .catch(err => {
            this.$message.error("出错了：" + err.message); //调用消息框给用户提示
          });
        })
        .catch(()=>{});
      },
    //关闭对话框的确认方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  //组件实例化之后执行的钩子
  created() {
    // this.axios
    //   .get(this.apiHost+"/users/getusers")
    //   .then(result => {
    //    console.log("后端返回的数据", result.data);
    //     this.tableData = result.data; //把返回的数据赋值给表格数据属性
    //   })
    //   .catch(err => {
    //     console.error(err.message);
    //   });
    this.getusers(); //调用方法
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
