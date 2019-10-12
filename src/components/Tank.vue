<template>
  <div style="padding:0 20px;">
    <el-form class="clearfix" v-show="this.showTable.create">
      <el-form-item style="width:320px;margin-top:30px;" >
        <el-button type="warning" style="margin-left:10px" @click.native.prevent="getHave()">已创建许可</el-button>
        <el-button type="success" style="margin-right:10px" @click="onCreate()">创建许可</el-button>
      </el-form-item>
      <el-form-item style="border:1px solid #ccc;margin:0 auto;">
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
              <el-button size="small" type="danger" @click="handleDelete(scope.$index,lists)":loading="deleting">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>


    <el-form v-show="this.showTable.havecreate" style="position:relative;">
      <el-button style="position:absolute;left:30px;top:-50px" @click="reback()">返回</el-button>
      <el-table :data="licenses"  highlight-current-row border style="width:1600px;margin:80px auto" :default-sort = "{prop: 'Date', order: 'descending'}">
        <el-table-column
          prop="hardwareNo"
          label="硬件号"
          sortable
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="type"
          label="许可类别"
          min-width="190">
        </el-table-column>
        <el-table-column
          prop="activeCode"
          label="激活码"
          min-width="170">
        </el-table-column>
        <el-table-column
          prop="license"
          label="许可路径"
          min-width="170">
        </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template scope="scope">
            <!--<el-button size="small" type="danger" @click="removeDelete(scope.$index,scope.row)":loading="removeing">删除</el-button>-->
            <el-button size="small" type="danger" @click="removeDelete(scope.$index,licenses)":loading="removeing">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  import { create} from '../api/api'
  export default {
    data() {
      return {
        lists:[],
        havecreates:[],
        deleting:false,
        removeing:false,
        gethaving:false,

        showTable:{
            create:true,
            save:false,
            havecreate:false,
        }
      }
    },
    methods: {
      getHave:function(){
          this.showTable.havecreate=true;
          this.showTable.create=false;
      },
      //创建许可
      onCreate(){
        this.showTable.save=true;
        this.showTable.create=false;
        this.showTable.havecreate=false;
        this.createForm.hardware='';
        this.createForm.system='';
        this.createForm.kind='';
        this.createForm.function='';
        this.createForm.versions='';
        this.$refs['createForm'].resetFields();
      },
      //点击删除
      handleDelete: function (index, row){
        this.$confirm('确认删除该记录吗？','提示',{
          type:'warning',
        }).then(() =>{
          this.deleting=true;
          row.splice(index,1);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.deleting=false;
        })
      },
      //删除许可
      removeDelete: function (index, row){
        this.$confirm('确认删除该记录吗？','提示',{
          type:'warning',
        }).then(() =>{
          this.removeing=true;
          row.splice(index,1);
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.removeing=false;
        })
      },
      //点击返回
      reback(){
        this.showTable.havecreate=false;
        this.showTable.create=true;
      }
    },
  }
</script>
<style>
  .el-form-item__label{text-align:left;margin-left:35px}
</style>
