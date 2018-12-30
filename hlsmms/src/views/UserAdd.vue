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
            <h3>添加管理员账号</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position='top'>
              <el-form-item label="用户名:" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选择用户组:" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择用户组">
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              </el-form-item>
            </el-form>
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
    // 验证确认密码
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        username: "",
        checkPass: "",
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
        pass: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, trigger: "blur", message: "密码必须一致" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12个字符",
            trigger: "blur"
          },
          //验证两次密码是否一致
           { validator: validatePassword, trigger: 'blur' }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('添加成功!');
          //发送ajax请求去后端做数据库添加用户
          //1.获取用户数据
          console.log(this.ruleForm2);
          //2）使用axios发送请求到后端api:   http://172.16.4.254:9090/users/useradd  
          this.axios.post(
            'http://127.0.0.1:9090/users/useradd',
            this.qs.stringify(this.ruleForm2)//使用qs处理post的参数
            ).then(result=>{
              console.log('服务器成功返回的结果',result);
              //3）根据返回的结果处理业务逻辑
              if(result.data.isok){
                //添加成功
                this.$message({
                  message:result.data.msg,
                  type:'success'
                });
                setTimeout(() => {
                   this.$router.push('/userlist');
                },100);
              }else{
                //添加失败
                this.$message.error(result.data.msg);
              }
            }).catch(err=>{
              console.log('服务器返回错误信息',err);
              
            })
        } else {
          //alert("添加失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
.el-input--suffix .el-input__inner{
  width: 100%;
}
</style>
