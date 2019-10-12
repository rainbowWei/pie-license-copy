<template>
  <div class="saveSub" >
    <el-form class="clearfix">
      <el-form-item style="margin:0 auto;">
        <el-table :data="lists"  highlight-current-row border style="width: 100%" :default-sort = "{prop: 'Date', order: 'descending'}">
          <el-table-column
            prop="hardwareNo"
            label="硬件号"
            sortable>
          </el-table-column>
          <el-table-column
            prop="type"
            label="许可类别">
          </el-table-column>
          <el-table-column
            prop="system"
            label="操作系统">
          </el-table-column>
          <el-table-column
            prop="function"
            label="功能项">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index,lists)" :loading="deleting">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="info" class="saveSub_submit" @click.native.prevent="commitForm('createForm')" :loading="commitLoading">提交</el-button>
    </el-form>
  </div>
</template>

<script>
  import storage from '../storage'
  import { create} from '../api/api'
  export default {
    data() {
      return {
        lists:this.$store.state.list,
        deleting:false,
        commitLoading:false,
        licenses:[],
      }
    },
    methods: {
      //点击删除
      handleDelete: function (index, row){
        let that = this;
        this.$confirm('确认删除该记录吗？','提示',{
          type:'warning',
        }).then(() =>{
          this.deleting=true;
          that.lists.splice(index,1);
          storage.set('list',that.lists)
          that.$store.state.list = that.lists;
          console.log("that.$store.state.list",that.$store.state.list)
//          row.splice(index,1);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.deleting=false;
//          window.reload()
        })
      },
      //点击提交
      commitForm: function () {
        this.$store.state.currentIndex = 2;
        this.$router.replace('/haveCreat')
        this.$refs.createForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.commitLoading = true;
              //NProgress.start();
//              let para = Object.assign({}, this.createForm);
              console.log("createForm Data:")
              console.log(this.lists);
              let arr = [];
              for(let obj of this.lists){
                arr.push({hardwareNo: obj.hardwareNo,version:obj.version,system:obj.system,function:obj.function,type:parseInt(obj.type)})
              }
              let para ={params:arr};
//              console.log(this.createForm);
              let sessionid = JSON.parse(sessionStorage.getItem('user')).session;
              let param = {para:para,sessionid:sessionid}
              create(param).then((res) => {
                if (!res.data.result) {
                  this.commitLoading = false;
                  this.$message({
                    message: res.data.error,
                    type: 'error'
                  });
                  this.$refs['createForm'].resetFields();
                } else {
                  console.log(res.data.result);
                  console.log(res.data);
                  this.commitLoading = false;
                  this.$message({
                    message: '创建成功',
                    type: 'success',
                  });
                  this.lists=[];
//                  let data = res.data.data;
//                  for(let i=0;i<data.length;i++){
//                    let createParams = {hardwareNo: data.hardwareNo,type:data.type,activeCode:data.activeCode,license:data.license};
//                  }
                  let data = res.data.data;
                  for(let i=0;i<data.length;i++){
                    this.licenses.push(data[i]);
//                    this.$store.state.licenses.push(data[i]);
                  }
                  this.$refs['createForm'].resetFields();
                }
              });
            });
          }
        });
      },
    },
    mounted(){
      this.$store.state.currentIndex = 1;
      this.lists = storage.get('list');
//      console.log("saveSub",this.$store.state.list)
//      console.log("lists",this.lists)
    }
  }
</script>
<style lang="less">
  .saveSub{
    padding:2%;
    .el-form-item__label{text-align:left;margin-left:35px}
    .el-table .ascending .sort-caret.ascending{
      border-top-color:#fff ;
    }
    .el-table .descending .sort-caret.descending{
      border-top-color:#fff;
    }
    .el-table .ascending .sort-caret.ascending{
      border-bottom-color: #fff;
    }
    .el-button--info {
      color: #fff;
      background-color: #4977fc;
      border-color: #4977fc;
    }

    .el-table th>.cell {
      background: #5670c6;
      color: #fff;
      word-wrap: normal;
      text-overflow: ellipsis;
      line-height: 30px;
      width: 100%;
      box-sizing: border-box;
    }
    .el-table th {
      white-space: nowrap;
      overflow: hidden;
      background-color: #5670c6;
      text-align: left;
    }
    .saveSub_submit{
      margin-top:2%;
    }
  }
</style>
