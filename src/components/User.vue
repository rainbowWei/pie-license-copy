<template class="tem">
  <el-row id="main_top">
    <!--左边主界面-->
    <el-col id="main_left" ref="header">
      <!--侧栏菜单-->
      <el-row class="logo">Submit</el-row>
      <el-row v-for="(item,index) in headers" >
        <p class="logo_text" :class="{logo_textActive: index == currentIndex}" @click="handleClick(index)">
          <router-link :to="item.link">{{item.text}}</router-link>
        </p>
      </el-row>
    </el-col>
    <!--右边主界面-->
    <el-col id="main_right">
      <el-row class="right_top">
        <div class="main_right_height">
          <el-col>
            <el-dropdown v-show="userVisible" style="position:absolute;right:40px;top:34px">
              <span class="el-dropdown-link userinfo-inner" style="color:#fff;">{{username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="personClick">个人中心</el-dropdown-item>
                <el-dropdown-item divided @click.native="logoutClick">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="color:#fff;font-size:20px;line-height:80px;font-weight:bold;margin-left:20px;">用户界面</span>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="main_righbody">
          <router-view></router-view>
          <!--<app_agr v-show='this.showTable.app_agr'></app_agr>-->
          <!--<app_app v-show='this.showTable.app_app'></app_app>-->
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import Tank from './Tank.vue'
  import Havecreat from './haveCreat.vue'
//  import Creat from './saveSub.vue'
  export default {
    data() {
      return {
        userVisible: true,
        username: "",
        headers: [
          {
            text: '创建许可',
            link:'/Createsub'
          },
          {
            text: '待提交许可',
            link:'/saveSub'
          },
          {
            text: '已创建许可',
            link:'/haveCreat'
          },
        ],
        index:0,
        showTable:{
//          app_agr:true,
          app_app:true,
        },
        currentIndex:this.$store.state.currentIndex,
      }
    },
    methods: {
      personClick(){
          this.$router.replace('/per');
      },
      logoutClick(){
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          this.loginVisible = true;
          this.userVisible = false;
          this.$router.replace('/');
        }).catch(() => {

        });
      },
      handleClick(index){
          this.currentIndex = index;
      },
      zcClick(){
        this.$router.replace('/uregiste');
      },
    },
    computed:{
      listencurrentIndex(){
        return this.$store.state.currentIndex;
      }
    },
    watch:{
      listencurrentIndex(){
        this.handleClick(this.$store.state.currentIndex)
      }
    },
    components:{
      'app_agr':Havecreat,
      'app_app':Tank,
    },
    mounted(){
      let data = sessionStorage.getItem('user');
      if (data) {
        data = JSON.parse(data);
        this.username =data.user.Name || '';
        this.userVisible = true;
      }
      this.handleClick(this.$store.state.currentIndex)
    }
  }
</script>

<style>
  #main_top {
    width: 100%;
    height: 100%;
  }

  #main_left {
    width: 240px;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .logo {
    width: 100%;
    height: 60px;
    color: #fdfdfd;
    font-size: 32px;
    background: #2b282d;
    text-align: center;
    font-weight: bold;
    line-height:60px;
  }

  .logo_text {
    margin:0;
    padding:0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #4977fc;
    text-align: center;
    margin-top:32px;
    border-bottom:none;
    cursor:pointer;
  }
  .logo_text a{
    display: block;
    text-decoration: none;
    color: #4977fc;
  }
  .logo_textActive{
    background: url("../../static/img/tab_bg.png") no-repeat;
    background-position: right;
    cursor:pointer;
  }
  .logo_text p:hover {
    cursor: pointer;
  }

  #main_right {
    width: calc(100% - 240px);
    background: #eaeff3;
    height: 100%;
    float: right;
    position:relative;
  }

  .right_top {
    width: 100%;
    height: 351px;
    /*background: #2c3e50;*/
    background:url("../../static/img/layout_top.png") no-repeat;
    background-size: 100%;
  }
  .main_right_height{
    height:80px;
    border-bottom:1px solid #6b82cc;
  }
  .main_righbody{
    height: 900px;
    background: #feffff;
    position: absolute;
    border-radius: 14px;
    width: 97%;
    margin-left: 30px;
    /*top: -157px;*/
    top: -218px;
  }
</style>
