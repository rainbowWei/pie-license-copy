<template>
  <div class="createSub">
    <el-form :model="createForm" :rules="createRule" ref="createForm" label-width="80px" class="demo-ruleForm" >
      <div class="createSub_box">
        <span class="createSubtitle">创建许可</span>
        <el-form-item label="硬件号" prop="hardware" style="margin-top:25px;margin-left:20px">
          <el-input v-model="createForm.hardware" placeholder="请输入硬件号" class="createSub_input" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="许可类别" prop="kind" style="margin-left:20px;">
          <el-select v-model="createForm.kind" placeholder="请选择许可类别" style="width:400px">
            <el-option label="试用" value="0"></el-option>
            <el-option label="正式" value="1"></el-option>
            <el-option label="激活码" value="2"></el-option>
            <el-option label="激活码和正式许可" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作系统" prop="system" style="margin-left:20px">
          <el-select v-model="createForm.system" placeholder="请选择操作系统" style="width:400px">
            <el-option label="Windows" value="0001"></el-option>
            <el-option label="Android" value="0002"></el-option>
            <el-option label="Linux" value="0003"></el-option>
            <el-option label="Apple" value="0004"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能项" prop="function" style="margin-left:20px">
          <el-select v-model="createForm.function" placeholder="请选择功能项" style="width:400px">
            <el-option label="默认" value="0001"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本" prop="versions" style="margin-left:20px">
          <el-select v-model="createForm.versions" placeholder="请选择版本" style="width:400px">
            <el-option label="默认" value="0001"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top:3%;">
          <el-button type="primary" @click.native.prevent="saveForm('createForm')" :loading="creating" style="margin-right:14%">保存</el-button>
          <el-button @click="resetForm('createForm')" style="margin-right:6%">重置</el-button>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
  import storage from '../storage'
  export default {
    data() {
      return {
        creating:false,
        createForm: {
          hardware:'',
          system: '',
          kind:'',
          function:'',
          versions:'',
        },
        createRule: {
          hardware: [
            { required: true, message: '请输入硬件号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          kind: [
            { required: true, message: '请选择许可类别', trigger: 'change' }
          ],
          system: [
            { required: true, message: '请选择操作系统', trigger: 'change' }
          ],
          function: [
            { required: true, message: '请选择功能项', trigger: 'change' }
          ],
          versions: [
            { required: true, message: '请选择版本', trigger: 'change' }
          ],
        },
      }
    },
    methods:{
      //保存许可
      saveForm(formName) {
        this.$router.replace('/saveSub');
        this.$store.state.currentIndex = 2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.creating = true;
            let createParams = {hardwareNo: this.createForm.hardware,version:this.createForm.versions,system:this.createForm.system,function:this.createForm.function,type:parseInt(this.createForm.kind)};
            console.log(createParams);
            this.$message({
              message: "保存成功",
            });
//            this.$router.replace('/saveSub')
            this.$store.state.list.push(createParams);
            storage.set('list',this.$store.state.list);   //添加数据要缓存
            console.log("this.$store.state.list",this.$store.state.list)
            this.creating=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>
<style lang="less">
  .createSub{
      .createSub_box{
        background:url("../../static/img/creatSub.png") no-repeat;
        /*background:url("../../static/img/createSub_box.png") no-repeat;*/
        background-size: 100% 100%;
        width: 34%;
        margin: 140px auto;
        padding-top: 30px;
        padding-bottom: 30px;
        position: relative;
      }
    .createSubtitle{
      font-size:18px;
      color:#293b5a;
      font-weight:bold;
      margin-left:25px
    }
    .el-form-item__label{
      color:#858585;
    }
    .el-input__inner{
      border: none;
      background: #e5ecff;
      border-radius: 22px;
      color:#4977fc;
      font-size:12px;
    }
  }
</style>
