 <template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span style="fontSize:25px">我的个人资料</span>
    </nav-bread>
    <svg
      style="position: absolute; width: 0; height: 0; overflow: hidden;"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path
            class="path1"
            d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"
          />
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 32 32">
          <title>ok</title>
          <path
            class="path1"
            d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"
          />
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            class="path1"
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
          />
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            class="path1"
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
          />
          <path
            class="path2"
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
          />
          <path
            class="path3"
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
          />
          <path
            class="path4"
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
          />
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path
            class="path1"
            fill="#605f5f"
            d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"
          />
          <path
            class="path2"
            fill="#605f5f"
            d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"
          />
        </symbol>
      </defs>
    </svg>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2">
            <span>修改个人资料</span>
          </h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div style="width:900px;margin:auto">
              <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 10 }"
                @submit="handleSubmit"
              >
                <!-- <a-form-item label="用户名">
                  <a-input
                  size="small"
                    v-decorator="[
                    'userName',
                     { 
                      rules: [{ required: true, message: 'Please input your note!' }],
                      initialValue:userName
                      }]"
                  />
                </a-form-item>-->
                <!-- <a-form-item label="邮箱">
                  <a-input
                    v-decorator="[
                    'userId',
                     { 
                     /* rules: [{ required: true, message: 'Please input your note!' }],*/
                      initialValue:userId

                      }]"
                  />
                </a-form-item> -->
                    <a-form-item label="昵称">
                  <a-input
                    v-decorator="[
                    'nickName',
                     { 
                     /* rules: [{ required: true, message: 'Please input your note!' }],*/
                      initialValue:nickName

                      }]"
                  />
                </a-form-item>
                <a-form-item label="邮箱">
                  <a-input
                    v-decorator="[
                          'userId',
                          {
                            rules: [
                              {
                                type: 'email',
                                message: '邮箱格式错误',
                              },
                              /*{
                                required: true,
                                message: 'Please input your E-mail!',
                              },*/
                            ],
                             initialValue:userId
                          },
                         
                        ]"
                  />
                </a-form-item>
                <a-form-item label="年龄">
                  <a-input
                    v-decorator="[
                    'age',
                     { 
                     /* rules: [{ required: true, message: 'Please input your note!' }],*/
                      initialValue:age

                      }]"
                  />
                </a-form-item>
                <a-form-item label="性别">
                  <a-radio-group
                    v-decorator="[
                       'sex',
                       { 
                         /*rules: [{ required: true, message: 'Please select your gender!' }],*/
                        initialValue:sex

                          },
                       ]"
                    placeholder="Select a option and change input text above"
                    @change="handleSelectChange"
                  >
                    <a-radio value="男">男</a-radio>
                    <a-radio value="女">女</a-radio>
                  </a-radio-group>
                </a-form-item>

                <a-form-item label="手机号">
                  <a-input
                    v-decorator="[
                    'phone',
                     { 
                      initialValue:phone
                      }]"
                  />
                </a-form-item>
                <!-- <a-form-item label="生日">
                  <a-input
                    v-decorator="[
                    'birth',
                     { 
                      initialValue:birth
                      }]"
                  />
                </a-form-item>-->
                <a-form-item label="生日">
                  <a-date-picker
                    v-decorator="[
                    'birth',
                     { 
                      initialValue:birth?moment(birth,'YYYY-MM-DD hh:mm:ss'):moment(new Date())
                      }]"
                  />
                </a-form-item>
                <!-- <a-form-item label="头像">
                  <a-input
                    v-decorator="[
                    'headUrl',
                     { 
                      initialValue:headUrl
                      }]"
                  />
                </a-form-item> -->
                <!-- <a-form-item label="头像">
                  <a-upload
                    name="avatar"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    action="http://localhost:3005/upload"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                  >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                </a-form-item> -->
                <a-form-item label="备注">
                  <a-textarea
                    autoSize
                    :rows="4"
                    v-decorator="[
                    'remark',
                     { 
                      initialValue:remark

                      }]"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 15 }">
                  <a-button type="primary" html-type="submit">提交个人资料</a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2">
            <span>修改密码</span>
          </h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div style="width:900px;margin:auto">
              <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 6 }"
                @submit="pwdSubmit"
              >
                <a-form-item label="原密码" :label-col="{ span: 7 }" :wrapper-col="{ span: 10 }">
                  <a-input
                    type="password"
                    v-decorator="[
                    'oldPwd',
                      {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入原密码',
                                  },
                                ],
                              },
                              ]"
                  />
                </a-form-item>
                <!-- <a-form-item label="新密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 14 }">
                  <a-input
                    type="password"
                    v-decorator="[
                    'newPwd',
                     { 
                      /*initialValue:newPwd*/
                      }]"
                  />
                </a-form-item>-->
                <a-form-item
                  label="新密码"
                  :label-col="{ span: 7 }"
                  :wrapper-col="{ span: 10 }"
                  has-feedback
                >
                  <a-input
                    v-decorator="[
                              'newPwd',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入新密码',
                                  },
                                  {
                                    validator: validateToNextPassword,
                                  },
                                ],
                              },
                            ]"
                    type="password"
                  />
                </a-form-item>
                <a-form-item
                  label="确认密码"
                  :label-col="{ span: 7 }"
                  :wrapper-col="{ span: 10 }"
                  has-feedback
                >
                  <a-input
                    v-decorator="[
                              'confirm',
                              {
                                rules: [
                                  {
                                    required: true,
                                    message: '请确认密码',
                                  },
                                  {
                                    validator: compareToFirstPassword,
                                  },
                                ],
                              },
                            ]"
                    type="password"
                    @blur="handleConfirmBlur"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 15 }">
                  <a-button type="primary" html-type="submit">确认修改密码</a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </div>

      <div class="order-create">
        <!-- <div class="order-create-pic"><img src="/static/imgs/ok-2.png" alt=""></div> -->
        <div class="order-create-main">
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">我的购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">商品列表</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
 <script>
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import Modal from "./../components/Modal";
import { currency } from "./../util/currency";
import axios from "axios";
export default {
  data() {
    return {
      confirmDirty: false,
      oldPwd: "",
      newPwd: "",
      userInfo: {},
      age: "",
      birth: "",
      phone: "",
      remark: "",
      sex: "",
      headUrl: "",
      userId: "",
      userName: "",
      nickName: "",
      formLayout: "inline",
      form: this.$form.createForm(this, { name: "coordinated" }),
      loading: false,
      imageUrl: ""
    };
  },
  mounted() {
    this.initUserInfo();
  },
  methods: {
    moment,
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("newPwd")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(err);
        // if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("/api/users/updateUserInfo", {
            age: values.age,
            birth: values.birth,
            phone: values.phone,
            remark: values.remark,
            sex: values.sex,
            headUrl: values.headUrl,
            userId: values.userId,
            nickName: values.nickName,
          })
          .then(res => {
            console.log(res);
             this.$store.commit("updateNickName", values.nickName);
            this.$message.success("个人资料提交成功");
          });
        // }
      });
    },
    pwdSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);

          this.submit(values.oldPwd, values.newPwd);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === "male" ? "man" : "lady"}!`
      // });
    },
    initUserInfo() {
      axios.get("/api/users/findUserInfo").then(response => {
        console.log(response);
        this.userInfo = response.data.result;
        this.birth = this.userInfo.birth;
        this.age = this.userInfo.age;
        this.phone = this.userInfo.phone;
        this.sex = this.userInfo.sex;
        this.remark = this.userInfo.remark;
        this.headUrl = this.userInfo.headUrl;
        this.userId = this.userInfo.userId;
        this.userName = this.userInfo.userName;
        this.nickName = this.userInfo.nickName;
        console.log(this.userInfo);
      });
    },
    submit(oldPwd, newPwd) {
      axios
        .post("/api/users/updatePwd", {
          oldPwd: oldPwd,
          newPwd: newPwd
        })
        .then(response => {
          console.log(response.data);
          var res = response.data;
          if (res.status == "0") {
            // alert("密码修改成功，请重新登录");
            this.$message.success("密码修改成功，下次登录请用新密码");
            // this.logOut();
          } else {
            // alert("原密码错误，请重新输入");
            this.$message.error("原密码错误，请重新输入");
          }
        });
    },
    logOut() {
      axios.post("/api/users/logout").then(response => {
        let res = response.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result.userName);
          this.$router.push("/");
          location.reload();
        }
      });
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  }
};
</script>
 <style>
.input-sub,
.input-add {
  min-width: 40px;
  height: 100%;
  border: 0;
  color: #605f5f;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
  background: #f0f0f0;
}
.item-quantity .select-self-area {
  background: none;
  border: 1px solid #f0f0f0;
}
.item-quantity .select-self-area .select-ipt {
  display: inline-block;
  padding: 0 3px;
  width: 30px;
  min-width: 30px;
  text-align: center;
}
.cart-item-head li:nth-child(2),
.cart-item-head li:nth-child(3) {
  /*width: 11%;*/
  padding: 0 10px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>