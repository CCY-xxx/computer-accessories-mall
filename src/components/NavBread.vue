<template>
    <section class="bread">
        <div class="breadreal">
 <div class="bread-wrap">
            <nav class="nav">
                <router-link style="fontSize:20px;" to="/goods">
                首页 &nbsp;&nbsp;&nbsp;|
                </router-link> 
                <slot></slot>
            </nav>
        </div>
        </div>
       
    </section>
</template>
<style>
  .bread{
      width:100%;
      height: 45px;
      line-height: 45px;
      /* background: url('../../static/imgs/q8.jpg'); */
      background-size: 100% 100%;
  }
  .breadreal{
      width:100%;
        display: flex;
  justify-content: space-between;
  align-content: center;
      height: 45px;
      line-height: 45px;
      background: url('../../static/imgs/q8.jpg');
      background-size: 100% 100%;
      max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px 20px;
  }
  .bread-wrap{
      margin-left:60px;
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
      margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>
<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
