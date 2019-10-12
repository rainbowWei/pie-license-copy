<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="许可类别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="到期时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="共有许可">
    </el-table-column>
    <el-table-column
      prop="address"
      label="已使用许可">
    </el-table-column>
    <el-table-column
      prop="address"
      label="正式">
    </el-table-column>
    <el-table-column
      prop="address"
      label="试用">
    </el-table-column>
    <el-table-column
      prop="address"
      label="激活码">
    </el-table-column>
    <el-table-column label="操作" min-width="200">
      <template scope="scope">
        <!--<el-button size="small" @click="preview(scope.$index, scope.row)">预览</el-button>-->
        <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎4444444444444444',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
      handleDelete: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {Url: row.Url};
          removeTile(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getTiles();
          });
        }).catch(() => {

        });
      },
    },
  }
</script>
