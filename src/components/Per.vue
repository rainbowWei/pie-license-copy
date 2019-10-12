<template scope="scope">
  <div style="width:800px;height:400px;margin:100px auto;background:#fff;position:relative;">
    <div>
      <el-row style="padding:20px 0 20px 20px"><span style="font-size:26px;">个人信息修改</span></el-row>
      <el-row class="clearfix">
          <el-row style="width:180px;float:left;border:1px solid #ccc;margin-left:20px">
            <el-col v-for="(item,index) in kind":label='item.label' style="border-bottom:1px solid #ccc;height:40px;line-height:40px;text-align:center;">{{item.label}}</el-col>
          </el-row>
          <el-row style="width:580px;border:1px solid #ccc;float:left" >
            <el-col v-for="(item,index) in kind":label='item.message' style="border-bottom:1px solid #ccc;height:40px;line-height:40px;text-align:left;padding-left:20px">{{item.message}}</el-col>
          </el-row>
      </el-row>
      <el-row style="position:absolute;bottom:20px;right:10px" scope="scope">
          <el-button style="margin-left:10px" type="info" @click="handleRepeat()">修改密码</el-button>
          <el-button type="success" @click="handleEdit()":loading="updating">更新个人信息</el-button>
      </el-row>
    </div>
    <!--更新个人信息界面-->
    <div>
      <el-dialog title="更新" v-model="updateFormVisible" :close-on-click-modal="false">
        <el-form :model="updateForm" label-width="80px" :rules="updateFormRules" ref="updateForm">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="updateForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company">
            <el-input v-model="updateForm.company" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="updateForm.mail" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="updateForm.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="updateFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading" style="margin:0 10px 20px 0">更新</el-button>
        </div>
      </el-dialog>
    </div>

    <!--更新密码界面-->
    <el-dialog title="更新密码" v-model="passFormVisible" :close-on-click-modal="false">
      <el-form :model="passForm" label-width="80px" :rules="passFormRules" ref="passForm">
        <el-form-item label="旧密码" prop="oldpasswd">
          <el-input v-model="passForm.oldpasswd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpasswd">
          <el-input v-model="passForm.newpasswd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="passFormVisible = false" >取消</el-button>
        <el-button type="primary" @click.native="passSubmit" :loading="passLoading" style="margin:0 10px 20px 0">修改</el-button>
      </div>
    </el-dialog>
    <div style="position:absolute;top:10px;right:10px;cursor:pointer;" @click="closeClick()"><img src="../assets/delete.png" alt=""></div>
  </div>
</template>
<script>
  import { remove,updateinfo,updatepasswd,getuserinfo} from '../api/api'
  export default{
      data() {
        return {
          kind: [{
            label: "姓名",
            message: "姓名"
          }, {
            label: "昵称",
            message: "昵称"
          }, {
            label: "电话",
            message: "电话"
          }, {
            label: "邮箱",
            message: "邮箱"
          }, {
            label: "公司",
            message: "公司"
          }],
          tiles: [],
          updating:false,
          updateFormVisible: false,//编辑界面是否显示
          editLoading: false,
          updateFormRules: {
            nickname: [
              {required: true, message: '请输入昵称', trigger: 'blur'}
            ],
            company: [
              {required: true, message: '请输入公司名称', trigger: 'blur'}
            ],
            mail: [
              {required: true, message: '请输入邮箱', trigger: 'blur'},
              {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
            phone: [
              {required: true, message: '请输入电话号码', trigger: 'blur'},
              {
                validator: (rule, value, callback) => {
                  if (/1[3-578][0-9]{9}/.test(value) == false) {
                    callback(new Error("请输入正确的电话号码"));
                  } else {
                    callback();
                  }
                }, trigger: 'blur'
              }
            ]
          },
          //编辑界面数据
          updateForm: {
            nickname: '',
            company: '',
            mail: '',
            phone: ''
          },
          passFormVisible:false,//更新密码界面是否显示
          passLoading:false,
          passFormRules:{
              oldpasswd:[
                {required:true,message:'请输入旧密码',trigger:'blur'}
              ],
              newpasswd:[
                {required:true,message:'请输入新密码',trigger:'blur'}
              ]
          },
          //更新密码界面数据
          passForm:{
              oldpasswd:'',
              newpasswd:''
          }
        }
      },
    methods:{
      //显示更新界面
      handleEdit: function (index, row) {
        this.updateFormVisible = true;
      },
      handleRepeat:function(index,row) {
        this.passFormVisible = true;
      },
      //更新信息
      editSubmit: function () {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认更新吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.updateForm);
//              console.log(this.updateForm);
              let sessionid = JSON.parse(sessionStorage.getItem('user')).session;
              let param = {para:para,sessionid:sessionid}
              updateinfo(param).then((res) => {
                if (!res.data.result) {
                  this.editLoading = false;
                  this.$message({
                    message: res.data.error,
                    type: 'error'
                  });
                  this.$refs['updateForm'].resetFields();
                } else {
                  this.editLoading = false;
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  let s = JSON.parse(sessionStorage.getItem('user'));
                  s.user.Nickname=this.updateForm.nickname;
                  s.user.Company=this.updateForm.company;
                  s.user.Mail=this.updateForm.mail;
                  s.user.Phone=this.updateForm.phone;
                  sessionStorage.removeItem('user');
                  sessionStorage.setItem('user', JSON.stringify(s));
                  this.getuserinfo();
                  this.updateForm.nickname='';
                  this.updateForm.company='';
                  this.updateForm.mail='';
                  this.updateForm.phone='';
                  this.$refs['updateForm'].resetFields();
                  this.updateFormVisible = false;
                }
              });
            });
          }
        });
      },
      //修改密码
      passSubmit: function () {
        this.$refs.passForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认修改吗？', '提示', {}).then(() => {
              this.passLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.passForm);
              let sessionid = JSON.parse(sessionStorage.getItem('user')).session;
              para.sessionid=sessionid
//              console.log(this.passForm);
              updatepasswd(para).then((res) => {
                if (!res.data.result) {
                  this.passLoading = false;
                  this.$message({
                    message: res.data.error,
                    type: 'error'
                  });
                  this.$refs['passForm'].resetFields();
                } else {
                  this.passLoading = false;
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.passLoading = true;
                  this.$refs['passForm'].resetFields();
                  this.passFormVisible = false;
                  sessionStorage.removeItem('user');
                  this.$router.replace('/');
                }
              });
            });
          }
        });
      },
      getuserinfo:function(){
          console.log("start");
        let s = JSON.parse(sessionStorage.getItem('user'));
        console.log(s);
        this.kind[0].message=s.user.Name;
        this.kind[1].message=s.user.Nickname;
        this.kind[2].message=s.user.Phone;
        this.kind[3].message=s.user.Mail;
        this.kind[4].message=s.user.Company;
        console.log(this.kind);
      },
      closeClick(){
        this.$confirm('确认退出个人中心吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$router.replace('/user');
        }).catch(() => {});
      },

    },
    mounted(){
      this.getuserinfo();
    }
  }
</script>






























































































































































<!--<template :model="haveForm" :rules="haveRule" ref="haveForm">-->
  <!--<div style="position:relative;">-->
    <!--<div style="padding-top:100px">-->
      <!--<el-table-->
        <!--:data="tiles"-->
        <!--border-->
        <!--style="width:1400px;margin:40px auto">-->
        <!--<el-table-column-->
          <!--prop="id"-->
          <!--label="序号"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="nickname"-->
          <!--label="昵称">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="mail"-->
          <!--label="邮箱">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="company"-->
          <!--label="公司">-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作" min-width="200">-->
          <!--<template scope="scope">-->
            <!--<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)":loading="deleting">删除</el-button>-->
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)":loading="updating"  style="margin-right:10px;">更新</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <!--&lt;!&ndash;编辑界面&ndash;&gt;-->
    <!--<div>-->
      <!--<el-dialog title="更新" v-model="updateFormVisible" :close-on-click-modal="false">-->
        <!--<el-form :model="updateForm" label-width="80px" :rules="updateFormRules" ref="updateForm">-->
          <!--<el-form-item label="昵称" prop="nickname">-->
            <!--<el-input v-model="updateForm.nickname" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="公司" prop="company">-->
            <!--<el-input v-model="updateForm.company" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="邮箱" prop="mail">-->
            <!--<el-input v-model="updateForm.mail" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="电话" prop="phone">-->
            <!--<el-input v-model="updateForm.phone" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click.native="updateFormVisible = false">取消</el-button>-->
          <!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading" style="margin:0 10px 20px 0">提交</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->
    <!--</div>-->
    <!--<div style="position:absolute;right:260px;top:60px">-->
      <!--<el-button @click="back()">返回</el-button>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import {remove,updateinfo} from '../api/api'-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--tiles: [],-->
        <!--deleting:false,-->
        <!--updating:false,-->
        <!--updateFormVisible: false,//编辑界面是否显示-->
        <!--editLoading: false,-->
        <!--updateFormRules: {-->
          <!--nickname: [-->
            <!--{required: true, message: '请输入昵称', trigger: 'blur'}-->
          <!--],-->
          <!--company: [-->
            <!--{required: true, message: '请输入公司名称', trigger: 'blur'}-->
          <!--],-->
          <!--mail: [-->
            <!--{required: true, message: '请输入邮箱', trigger: 'blur'}-->
          <!--],-->
          <!--phone: [-->
            <!--{required: true, message: '请输入电话号码', trigger: 'blur'}-->
          <!--]-->
        <!--},-->
        <!--//编辑界面数据-->
        <!--updateForm: {-->
          <!--nickname: '',-->
          <!--company: '',-->
          <!--mail: '',-->
          <!--phone: ''-->
        <!--},-->
      <!--}-->
    <!--},-->
    <!--methods:{-->
      <!--//获取列表数据-->
      <!--getTiles(){-->
        <!--let s = JSON.parse(sessionStorage.getItem('user'));-->
        <!--console.log(s);-->
<!--//        let getParams = {sessionid:s.session,uid:s.user.Id};-->
        <!--let getParams = {Company:s.user.Company,Mail:s.user.Mail,Name:s.user.Name,Nickname:s.user.Nickname,Passwd:s.user.Passwd,Phone:s.user.Phone};-->

        <!--console.log( getParams)-->
<!--//        getuserinfo(getParams).then((res) =>{-->
<!--//          if (res.data.result){-->
<!--//            this.tiles = res.data.data;-->
<!--//          }-->
<!--//        })-->
      <!--},-->
      <!--//显示更新界面-->
      <!--handleEdit: function (index, row) {-->
        <!--this.updateFormVisible = true;-->
        <!--this.updateForm.nickname = row.nickname-->
        <!--this.updateForm.company = row.company-->
        <!--this.updateForm.mail = row.mail-->
        <!--this.updateForm.phone = row.phone-->
      <!--},-->
      <!--//更新-->
      <!--editSubmit: function () {-->
        <!--this.$refs.updateForm.validate((valid) => {-->
          <!--if (valid) {-->
            <!--this.$confirm('确认提交吗？', '提示', {}).then(() => {-->
              <!--this.editLoading = true;-->
              <!--//NProgress.start();-->
              <!--let para = Object.assign({}, this.updateForm);-->
              <!--console.log(this.updateForm);-->
              <!--let sessionid = JSON.parse(sessionStorage.getItem('user')).session;-->
              <!--let param = {para:para,sessionid:sessionid}-->
              <!--updateinfo(param).then((res) => {-->
                <!--if (!res.data.result) {-->
                  <!--this.editLoading = false;-->
                  <!--this.$message({-->
                    <!--message: res.data.error,-->
                    <!--type: 'error'-->
                  <!--});-->
                  <!--this.$refs['updateForm'].resetFields();-->
                <!--} else {-->
                  <!--this.editLoading = false;-->
                  <!--this.$message({-->
                    <!--message: '提交成功',-->
                    <!--type: 'success'-->
                  <!--});-->
                  <!--this.$refs['updateForm'].resetFields();-->
                  <!--this.updateFormVisible = false;-->
                  <!--this.getTiles();-->
                <!--}-->
              <!--});-->
            <!--});-->
          <!--}-->
        <!--});-->
      <!--},-->
      <!--//删除-->
      <!--handleDelete: function (index, row){-->
        <!--this.$confirm('确认删除该记录吗?','提示',{-->
          <!--type: 'warning'-->
        <!--}).then(() => {-->
          <!--this.deleting = true;-->
          <!--let sid = JSON.parse(sessionStorage.getItem('user'));-->
          <!--let delParams = {sessionid:sid.session,uid:row.id};-->
          <!--console.log(delParams)-->
          <!--remove(delParams).then((res) => {-->
            <!--this.deleting = false;-->
            <!--this.$message({-->
              <!--message: '删除成功',-->
              <!--type: 'success'-->
            <!--});-->
            <!--this.getTiles();-->
          <!--});-->
        <!--}).catch(() => {-->

        <!--});-->
      <!--},-->
      <!--back(){-->
          <!--this.$router.replace('/user');-->
      <!--},-->
    <!--},-->
    <!--mounted(){-->
      <!--this.getTiles();-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--.el-message-box{padding-bottom:20px;}-->
  <!--.el-message-box .el-button{margin-right:10px}-->
<!--</style>-->
