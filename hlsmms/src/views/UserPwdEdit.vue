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
            <h3>密码修改</h3>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position='top'>
              <el-form-item label="原密码:" prop="userpass">
                <el-input type="password" v-model="ruleForm2.userpass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
        userpass: "",
        checkPass: ""
      },
      //验证规则
      rules2: {
        userpass: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "密码不能为空" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
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
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('登录成功!');
          //跳转到首页
          this.$router.push("/"); //使用路由对象进行跳装
        } else {
          alert("修改失败!");
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
</style>
