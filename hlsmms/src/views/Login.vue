<template>
   <div id="loginbox">        
        <!-- 卡片组件:登录的外框 -->
        <el-card class="box-card" id="login">
            <div slot="header" class="clearfix">
                <h2>登录页面</h2>                
            </div>
            <!-- 表单组件：登录的页面 -->
            <div  class="text item">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户名" prop="username">
                    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
                </el-form-item>           
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
                </el-form>
            </div>
        </el-card>
   </div>
</template>

<script>
// import Img from '../../assets/01.jpg'
    export default {
        data() {     
            return {
                //数据对象
                ruleForm2: {
                pass: '',
                username: '',         
                },
                 //验证规则
                rules2: {
                    username: [
                         //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息" 
                        { required: true, trigger: 'blur',message:"账号不能为空" },
                         //min: 6 最小长度   max: 18 最大长度
                        { min: 6, max: 18, message: '用户名长度在 6 到 18 个字符', trigger: 'blur'  },
                         
                    ],
                    pass: [
                        { required: true, trigger: 'blur',message:"密码不能为空" },
                         { min: 6, max: 12, message: '密码长度在 6 到 12个字符', trigger: 'blur'  },
                    ],           
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('登录成功!');
                        //跳转到首页
                        this.$router.push('/');//使用路由对象进行跳装
                    } else {
                        alert('登录失败!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
                
   #loginbox{
        /* background: url('../assets/images/loginBG.jpg') no-repeat;  */
        background-color:rgba(225, 225, 225, 0.3) 
   }
   #login{
       width: 500px;
       height: 300px;
       position: fixed;
       top:0;
       left: 0;
       right: 0;
       bottom: 0;
       margin: auto;
       background: transparent;
   }
   .el-card__header{
       padding: 0px 20px !important;
   }
</style>

