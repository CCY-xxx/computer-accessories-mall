<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>订单详情</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">
          <span>订单详情</span>
        </h2>
      </div>
      <!-- 进度条 -->
      <!-- <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span> 地址</li>
            <li class="cur"><span>查看</span> 订单</li>
            <li class="cur"><span>确认</span> 付款</li>
            <li class="cur"><span>订单</span> 成功</li>
          </ul>
      </div>-->

      <!-- order list -->
      <div class="page-title-normal checkout-title">
        <h2>
          <span>订单内容</span>
        </h2>
      </div>
      <div class="item-list-wrap confirm-item-list-wrap">
        <div class="cart-item order-item">
          <div class="cart-item-head">
            <ul>
              <li>商品图片</li>
              <li>商品名称</li>
              <li>单价</li>
              <li>数量</li>
              <li>总价</li>
              <li v-if="status=='0'">操作</li>
            </ul>
          </div>
          <!-- <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-lazy="`/static/${item.productImage}`"  v-bind:alt="item.title">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.title}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.price|currency('￥')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="editCart('minu',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.productNum*item.price)|currency('￥')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                      
                    </a>
                  </div>
                </div>
              </li>
          </ul>-->
          <ul class="cart-item-list">
            <li v-for="item in goodsList" v-if="item.checked=='1'">
              <div class="cart-tab-3" style="paddingTop:30px;width:300px;">
                <div class="cart-item-pic" style="marginLeft:110px;">
                  <img v-lazy="'/static/'+item.productImage" :alt="item.title" />
                </div>
              </div>
              <div class="cart-tab-3">
                <!-- <div class="cart-item-title"> -->
                <div class="item-name">{{item.title}}</div>

                <!-- </div> -->
              </div>

              <div class="cart-tab-3">
                <div class="item-price">{{item.price|currency('$')}}</div>
              </div>
              <div class="cart-tab-3" >
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" v-if="status=='0'" @click="editCart('minu',item)">-</a>
                      <span class="select-ipt">{{item.productNum}}</span>
                      <a class="input-add" v-if="status=='0'" @click="editCart('add',item)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-3">
                <div class="item-price-total">{{(item.price*item.productNum)|currency('$')}}</div>
              </div>
              <div class="cart-tab-3" v-if="status=='0'">
                <div>
                  <button>
                    <a href="javascrip:;" @click="delProduct(item.productId)">删除</a>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Price count -->
      
      <div class="price-count-wrap">
        <div class="price-count" style="position:absolute">
          <ul>
            <li>
              <span>用户名:</span>
              <span >{{addressInfo.userName}}</span>
            </li>
            <li>
              <span>用户号码:</span>
              <span>{{addressInfo.tel}}</span>
            </li>
            <li>
              <span>收货地址:</span>
              <span>{{addressInfo.province}} {{addressInfo.city}} {{addressInfo.area}}</span>
            </li>
          </ul>
        </div>
        <div class="price-count">
          <ul>
            <li>
              <span>商品总价:</span>
              <span>{{subTotal|currency('￥')}}</span>
            </li>
            <li>
              <span>购物费:</span>
              <span>{{shipping|currency('￥')}}</span>
            </li>
            <li>
              <span>折扣:</span>
              <span>{{discount|currency('￥')}}</span>
            </li>
            <li>
              <span>邮费:</span>
              <span>{{tax|currency('￥')}}</span>
            </li>
            <li class="order-total-price">
              <span>订单总价:</span>
              <span>{{orderTotal|currency('￥')}}</span>
            </li>
            <li  v-if="status=='1'">
              <span></span>
              <button :style="{width:'100px'}" class="btn btn--m btn--red" @click="aginOrder">再来一单</button>
            </li>
            <li class="order-total-price" v-if="status=='0'">
              <span></span>
              <button :style="{width:'100px'}" class="btn btn--m btn--red" @click="pay">付款</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">你确认要删除订单吗?</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="delOrder">确认</a>
        <a class="btn btn--m btn--red" href="javascript:;" @click="modalConfirm = false">关闭</a>
      </div>
    </Modal>
    <!-- <div>
      <button class="btn" @click="queryOrder">查询订单</button>
    </div> -->
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import Modal from "./../components/Modal";
import { currency } from "./../util/currency";
import axios from "axios";
export default {
  data() {
    return {
      status: "",
      orderId: "",
      orderTotal: 0,
      order: {},
      goodsList: [],
      shipping: 2,
      discount: 1,
      tax: 2,
      subTotal: 0,
      addressInfo:{},
      modalConfirm: false
    };
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  filters: {
    currency: currency
  },
  mounted() {
    this.queryOrder();
    this.init();
  },
  methods: {
    pay() {
      var orderId = this.$route.query.orderId;
      // if (orderStatus == "1") {
      //   return;
      // }
      axios
        .post("/api/users/pay", {
          orderId: orderId,
          orderTotal: this.orderTotal
        })
        .then(response => {
          let res = response.data;
          console.log(res.result);

          location.href = res.result;
        });
    },
    queryOrder() {
      var orderId = this.$route.query.orderId;
      axios.get("/api/users/tradeNo/" + orderId).then(response => {
        var res = response.data;
        console.log(location.href.length);
        if(location.href.length>100){
   this.$router.push("/order");
   location.reload()
        }
               
        // location.reload()
      });
    },
    init() {
      var orderId = this.$route.query.orderId;
      console.log("orderId:" + orderId);
      if (!orderId) {
        return;
      }
      axios
        .get("/api/users/orderDetail", {
          params: {
            orderId: orderId
          }
        })
        .then(response => {
          let res = response.data;
          console.log(res);
          this.order = res.result;
          this.status = res.result.orderStatus;
          this.goodsList = res.result.goodsList;
          this.addressInfo=res.result.addressInfo
          this.orderId = res.result.orderId;
          this.goodsList.forEach(item => {
            this.subTotal += item.price * item.productNum;
          });

          this.orderTotal =
            this.subTotal + this.shipping - this.discount + this.tax;
        });
    },
    uptateTotal() {
      var orderId = this.$route.query.orderId;
      console.log("orderId:" + orderId);
      if (!orderId) {
        return;
      }
      axios
        .post("/api/users/uptateTotal", {
          orderId,
          orderTotal: this.orderTotal
        })
        .then(response => {
          var res = response.data;
          console.log(res);
        });
    },

    closeModal() {
      this.modalConfirm = false;
    },
    delOrder() {
      var orderId = this.$route.query.orderId;
      axios
        .post("/api/users/orderDel", {
          orderId: orderId
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.modalConfirm = false;
            // var delCount = this.delItem.productNum;
            // this.$store.commit("updateCartCount",-delCount);
            this.$router.push("/order");
          }
        });
    },
    editCart(flag, item) {
     
      var orderId = this.$route.query.orderId;
      if (flag == "add") {
        item.productNum++;
      } else if (flag == "minu") {
        if (item.productNum <= 1) {
          return;
        }
        item.productNum--;
      }
       this.subTotal = 0;
      //
      axios
        .post("/api/users/orderEdit", {
          orderId,
          productId: item.productId,
          productNum: item.productNum
        })
        .then(response => {
          let res = response.data;
          console.log(res.result);
        });

      this.init();
      setTimeout(() => {
        this.uptateTotal();
      }, 1000);
    },
    delProduct(productId) {
      this.subTotal = 0;
      var orderId = this.$route.query.orderId;
      console.log(this.goodsList);
      console.log(this.goodsList.length);
      if (this.goodsList.length == 1) {
        this.modalConfirm = true;
        return;
      }
      axios
        .post("/api/users/delProduct", {
          orderId: orderId,
          productId: productId
        })
        .then(response => {
          let res = response.data;
          console.log(res);
          if (res.status == "0") {
            // this.modalConfirm = false;

            this.init();
            setTimeout(() => {
              this.uptateTotal();
            }, 100);
          }
        });
    },
    aginOrder() {
      var orderId = this.$route.query.orderId;
      axios
        .post("/api/users/aginOrder", { orderId, orderTotal: this.orderTotal })
        .then(response => {
          var res = response.data;
          console.log(res);
          location.href = res.result;
        });
    }
  }
};
</script>
