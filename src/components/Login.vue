<template>
  <div class="bg_box">
    <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="center" label-width="100px"
             class="demo-ruleForm login-container">
      <h3 class="title">登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <div class="clear">
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <a href="javascript:;" @click="zcClick()" style="color:red;float:right;">没有账号，去注册</a>
      </div>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { login } from '../api/api';
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          checkPass: ''
        },
        loginRule: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin(ev){
        let _this = this;
        _this.$router.replace('/user');
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            let loginParams = {name: this.loginForm.account, passwd: this.loginForm.checkPass};
            login(loginParams).then(result => {
              this.logining = false;
              if (result.data.result !== true) {
                this.$message({
                  message: "用户名或密码输入错误",
                  type: 'error'
                });
              }
              else {
                sessionStorage.setItem('user', JSON.stringify(result.data.data));
                if (result.data.data.user.usertype === 100) {
                  _this.$router.replace('/manage');
                } else if (result.data.data.user.usertype === 200) {
                  _this.$router.replace('/user');
                } else {

                }
              }
            }).catch(error =>{

            });
          }
          else {
            console.log('error submit');
            return false;
          }
        });
      },
      zcClick(){
        this.$router.replace('/uregiste');
      },
      //键盘监听事件
      keyEvents: function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
          this.handleLogin();//具体处理函数
          return false;
        }
        return true;
      }
    },
    mounted(){
      document.onkeydown=this.keyEvents;
    }
  }

</script>

<style lang="less" scoped>
  .bg_box{
    width:970px;
    height:578px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-485px;
    margin-top:-289px;
    background: url("../../static/img/bg_box.png");
    border-radius: 35px;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position:absolute;
    top:92px;
    right:40px;
    /*margin: 180px auto;*/
    width: 400px;
    padding: 35px 35px 15px 35px;
    /*background: #fff;*/
    /*border: 1px solid #eaeaea;*/
    /*box-shadow: 0 0 25px #cac6c6;*/
    .title {
      text-align: left;
      color: #505458;
      margin: 0 0 40px 100px;
    }
    .remember {
      float:left;
      margin: 0px 0px 35px 100px;
    }
    .clear{
      clear: both;
      height:20px;
    }
  }
</style>





































//      handleLogin(ev) {
//        let _this = this;
//        this.$refs.loginForm.validate((valid) => {
//          if (valid) {
//            this.logining = true;
//            let loginParams = {username: this.loginForm.account, password: this.loginForm.checkPass};
////            if(this.loginForm.account==='admin'&&this.loginForm.checkPass==1){
////              this.logining = false;
////              sessionStorage.setItem('user', JSON.stringify(loginParams));
////              _this.$router.replace('/user');
////            }else{
////              this.$message({
////                message: "用户名或密码输入错误",
////                type: 'error'
////              });
////            }
//            login(loginParams).then(result => {
//              this.logining = false;
//              if (result.data.result !== true) {
//                this.$message({
//                  message: "用户名或密码输入错误",
//                  type: 'error'
//                });
//              } else {
//                sessionStorage.setItem('user', JSON.stringify(result.data.data));
//                _this.$router.replace('/user');
//              }
//            });
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
//      },

