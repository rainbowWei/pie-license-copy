<template>
  <div class="haveCreat">
    <el-form style="position:relative;">
      <el-table :data="licenses"  highlight-current-row border  :default-sort = "{prop: 'Date', order: 'descending'}">
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
      data(){
        return{
          licenses:[],
          havecreates:[],
          removeing:false,
        }
      },
    methods:{
      getTiles(){
        let para ={params:[{hardwareNo: this.createForm.hardware,version:this.createForm.versions,system:this.createForm.system,function:this.createForm.function,type:parseInt(this.createForm.kind)}]};
//              console.log(this.createForm);
        let sessionid = JSON.parse(sessionStorage.getItem('user')).session;
        let param = {para:para,sessionid:sessionid}
        create(param).then((res) => {
          if (res.data.result) {
            this.havecreates = res.data.data;
            console.log(this.havecreates);
          }
        });
      },
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
      submitDown(){

      }
    },
    mounted(){
      this.$store.state.currentIndex = 2;
      this.getTiles();
    }
  }

</script>
<style lang="less">
  .haveCreat{
    padding:2%;
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
  }
</style>



