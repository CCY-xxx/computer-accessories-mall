<template>
  <header class="header">
    <svg
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path
            class="path1"
            d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"
          />
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path
            class="path1"
            d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"
          />
          <path
            class="path2"
            d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"
          />
        </symbol>
        <symbol  id="icon-cart" viewBox="0 0 38 32">
          <title >cart</title>
          <path
            class="path1"
            d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"
          />
          <path
            class="path2"
            d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"
          />
          <path
            class="path3"
            d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
          />
          <path
            class="path4"
            d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
          />
        </symbol>
      </defs>
    </svg>
    <div class="navbar">
      <div class="navbar-left-container">
        <span style="color:yellow;fontSize:30px">欢迎您！</span>
        <span v-if="!nickName" class="navbar-link" style="color:black;fontSize:20px">请先登录</span>
        <span class="navbar-link" v-text="nickName" v-if="nickName"></span>
        <!-- <a href="/">
          <img
            class="navbar-brand-logo"
            src="/static/imgs/q9.jpg"
            width="700px"
            height="80px"
          />
        </a> -->
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <a v-if="nickName" class="navbar-link navbar-cart-link"  href="/#/updatePwd">修改密码</a>
           <!-- <router-link v-if="nickName" to="/order">查看订单</router-link> -->
            <a v-if="nickName" class="navbar-link navbar-cart-link" href="/#/order">
            查看历史订单
              <!-- <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart" />
              </svg> -->
            </a>
          <a href="javascript:void(0)" @click="reModalFlag=true, errorTip=false" v-if="!nickName">注册</a>
          <a
            href="javascript:void(0)"
            class="navbar-link"
            @click="loginModalFlag=true, errorTip=false,userPwd='',user=''"
            v-if="!nickName"
          >用户登录</a>
         
          <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-else>安全退出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-text="cartCount" v-if="cartCount!==0"></span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo" >
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">请登录</div>
          <button class="md-close" @click="loginModalFlag=false">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input
                  type="text"
                  tabindex="1"
                  name="loginname"
                  v-model="user"
                  class="regi_login_input regi_login_input_left"
                  placeholder="请输入用户名或邮箱"
                  data-type="loginname"
                />
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input
                  type="password"
                  tabindex="2"
                  name="password"
                  v-model="userPwd"
                  class="regi_login_input regi_login_input_left login-input-no input_text"
                  placeholder="请输入密码"
                  @keyup.enter="login"
                />
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input
                  type="text"
                  tabindex="2"
                  name="text"
                  v-model="sCode"
                  class="regi_login_input regi_login_input_left login-input-no input_text"
                  placeholder="请输入验证码"
                  @keyup.enter="login"
                />
              </li>
               <span class="checkCode" @click="createCode">{{ checkCode}}</span>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':reModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">请注册</div>
          <button class="md-close" @click="reModalFlag=false">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input
                  type="text"
                  v-model="id"
                  class="regi_login_input regi_login_input_left"
                  placeholder="请输入用户邮箱"
                />
              </li>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input
                  type="text"
                  v-model="name"
                  class="regi_login_input regi_login_input_left"
                  placeholder="请输入用户名"
                  data-type="loginname"
                />
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input
                  type="password"
                  v-model="pwd"
                  class="regi_login_input regi_login_input_left login-input-no input_text"
                  placeholder="请输入密码"
                />
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input
                  type="password"
                  v-model="twopwd"
                  class="regi_login_input regi_login_input_left login-input-no input_text"
                  placeholder="请确认密码"
                  @keyup.enter="register"
                />
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="register">注 册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
    <div class="md-overlay" v-if="reModalFlag" @click="reModalFlag=false"></div>
  </header>
</template>

<script>
import "./../assets/css/login.css";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      id: "",
      pwd: "",
      twopwd: "",
      user: "",
      userPwd: "",
      errorTip: false,
      loginModalFlag: false,
      reModalFlag: false,
      sCode:'',
      checkCode:''
    };
  },
  computed: {
    ...mapState(["nickName", "cartCount"])
  },
  /*nickName(){
          return this.$store.state.nickName;
        },
        cartCount(){
          return this.$store.state.cartCount;
        }*/
  mounted() {
    this.checkLogin();
       this.createCode();
  },
  methods: {
     createCode() {
		var code = "";
		const codeLength = 4; //验证码的长度  
		const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
		for(let i = 0; i < codeLength; i++) { //循环操作  
			let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
			code += random[index]; //根据索引取得随机数加到code上  
		}
    this.checkCode = code; //把code值赋给验证码  
   
	},

    checkLogin() {
      axios.get("/api/users/checkLogin").then(response => {
        var res = response.data;
        var path = this.$route.pathname;
        if (res.status == "0") {
          //                      this.nickName = res.result;
          this.$store.commit("updateUserInfo", res.result);
          this.loginModalFlag = false;
        } else {
           console.log(this.$route.path)
          if (this.$route.path != "/") {
            this.$router.push("/");
          }
        }
      });
    },
    login() {
      if (!this.user || !this.userPwd) {
        this.errorTip = true;
        return;
      }
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!reg.test(this.user)) {
        var userName = this.user;
      } else {
        var userId = this.user;
      }
     if(this.sCode != this.checkCode) {
        //  this.$message({
        //       message: "验证码错误，注意大写字母",
        //       type: "warning"
        // });
        alert('验证码错误，注意大写字母')
        this.createCode();
        return false;
      };

      axios
        .post("/api/users/login", {
          userId,
          userName,
          userPwd: this.userPwd
        })
        .then(response => {
          alert('登录成功')
          let res = response.data;

          console.log(res);
          this.errorTip = false;
          this.loginModalFlag = false;
          this.$store.commit("updateUserInfo", res.result.userName);
          this.getCartCount();
        });
      setTimeout(() => {
        this.errorTip = true;
      }, 1000);
    },
    register() {
      if (!this.name || !this.pwd) {
        this.errorTip = true;
        return;
      }
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!reg.test(this.id)) {
        alert("请输入正确的邮箱格式!");
        return;
      }
      
      
      if (this.pwd !== this.twopwd) {
        alert("两次输入密码不一致，请重新输入");
        return;
      }
       var registerCheck='1'
       axios.post("/api/users/userCheck", {
          userName: this.name
        })
        .then((response) => {
          var result = response.data;
          console.log(response);
          // console.log(err);
          if (result.status == "0") {
            alert(result.msg);
          registerCheck='0'
          }
 
        })
        setTimeout(()=>{
             if(registerCheck=='1'){
          alert('注册成功，点击确定直接登陆')
  axios.post("/api/users/register", {
          userId: this.id,
          userName: this.name,
          userPwd: this.pwd
        })
        .then(response => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "0") {
            this.errorTip = false;
            this.reModalFlag = false;
            this.$store.commit("updateUserInfo", res.result.userName);
            this.getCartCount();
          } else {
            this.errorTip = true;
          }
        });

        }
        },1000)
   
         
    },
    logOut() {
      axios.post("/api/users/logout").then(response => {
        let res = response.data;
        if (res.status == "0") {
          //                        this.nickName = '';
          this.$store.commit("updateUserInfo", res.result.userName);
          this.$router.push("/");
          location.reload();
        }
      });
    },
    getCartCount() {
      axios.get("/api/users/getCartCount").then(res => {
        var res = res.data;
        this.$store.commit("updateCartCount", res.result);
      });
    }
  }
};
</script>
<style>
.header { 
  width: 100%;
 
  font-family: "moderat", sans-serif;
  font-size: 16px;
}
.navbar {
  background:url('../../static/imgs/q9.jpg');
  font-family:'Times New Roman', Times, serif;
  font-size: 20px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 70px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 20px 10px 20px;
}
.navbar-left-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: -20px;
}
.header a,
.footer a {
  color: rgb(22, 10, 10);
  text-decoration: none;
}
a {
  -webkit-transition: color 0.3s ease-out;
  transition: color 0.3s ease-out;
}
.navbar-right-container {
  display: none;
  justify-content: flex-start;
  align-items: center;
}
.navbar-menu-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
}
.navbar-link {
  padding-left: 15px;
}
.navbar-cart-container {
  position: relative;
}
.navbar-cart-count {
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -9px;
  right: -11px;
  width: 20px;
  border-radius: 10px;
  color: white;
  background-color: #eb767d;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
.navbar-cart-logo {
  width: 25px;
  height: 25px;
  transform: scaleX(-1);
}
.checkCode{
  width: 100px;
  height: 50px;
background: pink;
}
</style>