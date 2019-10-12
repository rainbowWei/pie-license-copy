<template>
  <el-form :model="signupForm" :rules="signupRule" ref="signupForm" label-position="center"  label-width="100px"
           class="demo-ruleForm login-container">
    <h3 class="title">注册</h3>

    <el-form-item prop="account" label="姓名">
      <el-input type="text" v-model="signupForm.account" auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>

    <el-form-item prop="nickname" label="昵称">
      <el-input type="text" v-model="signupForm.nickname" auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="Pass">
      <el-input type="password" v-model="signupForm.Pass" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="signupForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item
      prop="email"
      label="邮箱"
      placeholder="邮箱">
      <el-input v-model="signupForm.email"></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSignup" :loading="signing" >注册</el-button>
    </el-form-item>
    <a href="javascript:;" style="color:red;" @click="dlClick">已有账号，去登录</a>
  </el-form>
</template>

<script>
  import { signup,checksamename } from '../api/api';
  export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.signupForm.checkPass !== '') {
            this.$refs.signupForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signupForm.Pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        signing: false,
        signupForm: {
          domains: [{
            value: ''
          }],
          email: '',
          account: '',
          nickname:'',
          checkPass: '',
          phone:"",
          Pass:"",
        },
        signupRule: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          nickname: [
            {required:true, message:'请输入昵称', trigger: 'blur'},
          ],
          Pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          checkPass:[
//            {required: true, message:'请再次输入密码', trigger: 'blur'},
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
        },
        checked: true
      };
    },
    methods: {
      handleSignup(ev){
        this.$refs.signupForm.validate((valid) => {
          if (valid) {
            this.signing = true;
            let signupParams = {name: this.signupForm.account,passwd: this.signupForm.checkPass,mail: this.signupForm.email,usertype:200,nickname: this.signupForm.nickname};
            console.log(signupParams);
            signup(signupParams).then(result =>{
              this.signing = false;
              if (result.data.result !== true) {
                this.$message({
                  message: "用户名不能为空",
                  type: 'error'
                });
              }
              else{
                sessionStorage.setItem('user', JSON.stringify(result.data.data));
//                _this.$router.replace('/user');
                this.$message({
                  message: "注册成功",
                });
                this.$router.replace('/');
              }
            });
          }
          else{
            console.log('error submit');
            return false;
          }
        });
      },
      dlClick(){
          this.$router.replace('/');
      },
      keyEvents: function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
          this.handleSignup();//具体处理函数
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
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>


