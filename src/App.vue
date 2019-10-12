<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height:100%;
  min-width:1200px
}
body{min-width:1200px}
/*@media screen and (min-width: 1201px) {*/
  /*#app{width:1200px}*/
/*}*/
/*@media screen and (max-width: 1200px) {*/
  /*#app{width:1000px}*/
/*}*/
body{
  margin:0;
  padding:0;
}
</style>
