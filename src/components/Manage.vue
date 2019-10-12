<template class="tem">
  <el-row id="main_top">
    <!--左边主界面-->
    <el-col id="main_left" ref="header">
      <!--侧栏菜单-->
      <el-row class="logo">Manage</el-row>
      <el-row v-for="(item,index) in headers" class="logo_text">
        <p @click="handleClick(index)" style="margin:0;padding:0;">{{item.text}}</p>
      </el-row>
    </el-col>
    <!--右边主界面-->
    <el-col id="main_right" style="height:auto">
      <el-row class="right_top" style="height:100%">
        <span style="color:#fff;font-size:20px;line-height:60px;font-weight:bold;margin-left:20px;">管理员界面</span>
        <el-button type="success" style="margin:10px 10px 0 0;" divided @click.native="logout">退出</el-button>
      </el-row>
      <el-row class="right_bottom">
        <div>
          <app_reg v-show='this.showTable.app_reg'></app_reg>
          <!--<app_agr v-show='this.showTable.app_agr'></app_agr>-->
          <!--<app_app v-show='this.showTable.app_app'></app_app>-->
          <!--<app_rep v-show='this.showTable.app_rep'></app_rep>-->
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
//  import Apply from './Apply.vue'
//  import Agree from './createSub.vue'
//  import Repeat from './Repeat.vue'
  import Registe from './Registe.vue'
  export default {
    data() {
      return {
        username: "",

        headers: [{
          name: 'home',
          text: '注册用户列表'
        }
//        ,{
//          name: 'tech',
//          text: '用户修改信息'
//        }, {
//          name: 'cases',
//          text: '注册用户列表'
//        }, {
//          name: 'detection',
//          text: '用户许可信息'
//        }
        ],
        index:0,
        showTable:{
            app_reg:true,
//            app_agr:false,
//            app_app:false,
//            app_rep:false
        }
      }
    },
    methods: {
      handleClick(index){
        this.showTable.app_reg = false;
//        this.showTable.app_agr = false;
//        this.showTable.app_app = false;
//        this.showTable.app_rep = false;
        switch(index){
          case 0:
            this.showTable.app_reg = true;
            break;
//          case 1:
//            this.showTable.app_agr = true;
//            break;
//          case 2:
//            this.showTable.app_app = true;
//            break;
//          case 3:
//            this.showTable.app_rep = true;
//            break;
        }
      },
//      dlClick(){
//        this.$router.replace('/');
//      },
      logout: function () {
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$router.replace('/');
        }).catch(() => {

        });
      },
      zcClick(){
        this.$router.replace('/uregiste');
      },
    },
    components:{
      'app_reg':Registe,
//      'app_app':Apply,
//      'app_agr':Agree,
//      'app_rep':Repeat,
    },
  }
</script>

<style>
  #main_top{width:100%;height:auto;position:absolute;left:0;bottom:0;}
  #main_left{width:260px;height:auto;background:#2c3e50;position:absolute;top:0;bottom:0;}
  .logo{width:100%;height:60px;color:#fff;font-size:45px;background:#F09B22;text-align:center;font-weight:bold;}
  .logo_text{width:100%;height:60px;line-height:60px;border-bottom:1px solid #999;color:#fff;text-align:center;}
  .logo_text p:hover{cursor:pointer;}
  #main_right{width:calc(100% - 260px);background:#EDEDED;float:right;height:auto}
  .right_top{width:100%;height:60px;background:#2c3e50;}
  .el-button{float:right;margin-right:10px;}
</style>


