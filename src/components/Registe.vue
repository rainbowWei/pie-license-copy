<template :model="haveForm" :rules="haveRule" ref="haveForm">
  <div style="padding:0 20px">
    <div >
      <el-table
        :data="tiles"
        border
        style="width:100%;height:auto;margin:40px auto"
        v-show="this.showTable.start">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司">
        </el-table-column>
        <el-table-column label="操作" min-width="300" max-width="300">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)":loading="deleting" style="margin-left:10px;">删除</el-button>
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)":loading="updating"  style="margin-right:10px;">更新</el-button>-->
            <el-button size="small" @click="handlesubmit(scope.$index, scope.row)":loading="submiting">已有许可</el-button>
            <el-button size="small" @click="handleAdd(scope.$index, scope.row)":loading="adding" >添加许可类型</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="添加" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" :rules="addRule" ref="addForm" label-width="80px" class="demo-ruleForm">
          <div style="width:100%;background:#fff;">
            <!--<span style="color:#323232;font-weight:bold;font-size:20px;margin-left:25px">添加许可类型</span>-->
            <el-form-item label="许可类型" prop="licensetype" style="margin-left:20px;">
              <el-select v-model="addForm.licensetype" placeholder="请选择许可类型" style="width:100%">
                <el-option label="试用" value="0"></el-option>
                <el-option label="正式" value="1"></el-option>
                <el-option label="激活码" value="2"></el-option>
                <el-option label="激活码和正式许可" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="版本信息" prop="version" style="margin-left:20px">
              <el-select v-model="addForm.version" placeholder="请选择版本信息" style="width:100%">
                <el-option label="0001" value="0001"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系统信息" prop="system" style="margin-left:20px">
              <el-select v-model="addForm.system" placeholder="请选择系统信息" style="width:100%">
                <el-option label="Windows" value="0001"></el-option>
                <el-option label="Android" value="0002"></el-option>
                <el-option label="Linux" value="0003"></el-option>
                <el-option label="Apple" value="0004"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能信息" prop="function" style="margin-left:20px">
              <el-select v-model="addForm.function" placeholder="请选择功能信息" style="width:100%">
                <el-option label="0001" value="0001"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="clearForm('addForm')" style="margin-right:10px">重置</el-button>
              <el-button type="primary" @click.native.prevent="appendForm('addForm')":loading="appending" style="margin-right:10px">添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <!--查看已有许可界面-->
    <div style="position:relative;" v-show="this.showTable.end">
      <el-button style="position:absolute;left:0;top:-60px" @click="reBack()">返回</el-button>
        <el-table
          :data="gets"
          border
          style="width:100%;margin:100px auto">
          <el-table-column
            prop="licensetype"
            label="许可类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="system"
            label="版本信息"
            width="180">
          </el-table-column>
          <el-table-column
            prop="version"
            label="系统信息">
          </el-table-column>
          <el-table-column
            prop="function"
            label="功能信息">
          </el-table-column>
          <el-table-column label="操作" min-width="200">
            <template scope="scope">
              <!--<el-button size="small" type="danger" @click="addRemove(scope.$index,gets)":loading="removing">删除</el-button>-->
              <el-button size="small" type="danger" @click="addRemove(scope.$index,scope.row)":loading="removing">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
  import { getuserinfos,remove,updateinfo,userlicenseinfo,addlicenseinfo,removelicenseinfo} from '../api/api'
  export default {
    data() {
      return {
        tiles: [],
        gets:[],
        deleting:false,
        submiting:false,
        adding:false,
        appending:false,
        removing:false,
        addFormVisible:false,
        //添加界面
        addForm: {
          licensetype: '',
          version:'',
          system:'',
          function:'',
        },
        addRule: {
          licensetype: [
            { required: true, message: '请选择许可类型', trigger: 'change' }
          ],
          version: [
            { required: true, message: '请选择版本信息', trigger: 'change' }
          ],
          system: [
            { required: true, message: '请选择系统信息', trigger: 'change' }
          ],
          function: [
            { required: true, message: '请选择功能信息', trigger: 'change' }
          ],
        },
        showTable:{
            start:true,
            end:false
        },
        currentUID:""
      }
    },
    methods:{
      //获取列表数据
      getTiles(){
        let s = JSON.parse(sessionStorage.getItem('user'));
        let getParams = {sessionid:s.session,pageindex:1,pagecount:20};
        console.log( getParams)
        getuserinfos(getParams).then((res) =>{
            if (res.data.result){
              this.tiles = res.data.data;
            }
        })
      },
      //添加许可提交按钮
      appendForm: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认添加吗？', '提示', {}).then(() => {
              this.appending = true;
              let para ={licenses:[{Uid: parseInt(this.currentUID),Version:this.addForm.version,System:this.addForm.system,Function:this.addForm.function,LicenseType:parseInt(this.addForm.licensetype)}]};
              console.log(this.createForm);
              let sessionid = JSON.parse(sessionStorage.getItem('user')).session;
              let param = {para:para,sessionid:sessionid}
              addlicenseinfo(param).then((res) => {
                if (!res.data.result) {
                  this.appending = false;
                  this.$message({
                    message: res.data.error,
                    type: 'error'
                  });
                  this.$refs['addForm'].resetFields();
                } else {
                  console.log(res.data.result);
                  console.log(res.data);
                  this.appending = false;
                  this.$message({
                    message: '添加成功',
                    type: 'success',
                  });
                  this.lists=[];
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible=false;
                }
              });
            });
          }
        });
      },
      //重置
      clearForm(formName) {
        this.$refs[formName].resetFields();
      },
      //更新
      editSubmit: function () {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.updateForm);
              console.log(this.updateForm);
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
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['updateForm'].resetFields();
                  this.updateFormVisible = false;
                  this.getTiles();
                }
              });
            });
          }
        });
      },
      //删除用户信息
      handleDelete: function (index, row){
        this.$confirm('确认删除该记录吗?','提示',{
          type: 'warning'
        }).then(() => {
          this.deleting = true;
          let sid = JSON.parse(sessionStorage.getItem('user'));
          let delParams = {sessionid:sid.session,uid:row.id};
          console.log(delParams)
          remove(delParams).then((res) => {
            this.deleting = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTiles();
          });
        }).catch(() => {

        });
      },
      //查看已有许可
      handlesubmit:function (index,row){
        this.showTable.start=false;
        this.showTable.end=true;
        this.submiting=true;
        let sid = JSON.parse(sessionStorage.getItem('user'));
        let delParams = {sessionid:sid.session,uid:row.id};
        console.log(delParams);
        userlicenseinfo(delParams).then((res) => {
          this.submiting = false;
          if(res.data.result){
              console.log(res.data)
              this.gets = res.data.data;
              console.log(this.gets);
          }
        })
      },
      //添加许可信息
      handleAdd:function(index,row){
        this.addFormVisible = true;
        this.currentUID = row.id;
      },
      //点击返回
      reBack:function(){
        this.showTable.end=false;
        this.showTable.start=true;
      },
      //移除许可
      addRemove: function (index, row){
        this.$confirm('确认删除该记录吗?','提示',{
          type: 'warning'
        }).then(() => {
          this.removing = true;
          let s = JSON.parse(sessionStorage.getItem('user'));
          let delParam = {sessionid:s.session,id:row.Id};
          console.log(delParam)
          removelicenseinfo(delParam).then(() => {
            this.removing = false;
//            row.splice(index,1);
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          });
          let delPara = {sessionid:s.session,uid:row.uid};
          userlicenseinfo(delPara).then((res) => {
            this.submiting = false;
            if(res.data.result){
              console.log(res.data)
              this.gets = res.data.data;
              console.log(this.gets);
            }
          })
        }).catch(() => {

        });
      },
    },
    mounted(){
      this.getTiles();
    }
  }
</script>
<style>
.el-message-box{padding-bottom:20px;}
.el-message-box .el-button{margin-right:10px}
</style>
