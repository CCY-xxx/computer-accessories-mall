<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span style="fontSize:25px">商品列表</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="search">
          <input type="text" v-model="keyword" id="keyword" @keyup.enter="search" />
          <button class="btn" @click="search">搜索</button>
        </div>
        <div class="cClass" style="marginTop:10px;paddingTop:20px;">
          <label>按品牌分类：</label>
          <button
            class="btn"
            v-for="(brand,index) in brands"
            :key="index"
            :style="{marginLeft:'20px',background:brandFlag==brand?'pink':''}"
            v-text="brand"
            @click="search(brand)"
          ></button>
        </div>
        <div style="marginTop:10px;" id="filter" v-bind:class="{'filterby-show':filterBy}">
          <label>按价格范围分类:</label>

          <button v-bind:class="{'cur':priceChecked==='all'}" class="btn">
            <a href="javascript:void(0)" @click="setPriceFilter('all')">全部</a>
          </button>
          <button
            v-bind:class="{'cur':priceChecked===index}"
            style="marginLeft:10px;"
            class="btn"
            v-for="(item,index) in priceFilter"
            :key="index"
          >
            <a
              href="javascript:void(0)"
              @click="setPriceFilter(index)"
            >{{item.startPrice}} - {{item.endPrice}}</a>
          </button>
        </div>
        <div class="filter-nav" style="display:flex;justifyContent:space-between">
          <div>
            <a-button type="primary" @click="pushGoods()">配件推荐</a-button>
            <a-button type="primary">优惠促销</a-button>
            <a-button type="primary">畅销配件</a-button>
            <a-button type="primary">好评配件</a-button>
          </div>
          <div style="width: 290px;display: flex;">
            <div>
              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />按价格排序（默认）
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-icon type="user" />按销量排序
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a-icon type="user" />按时间排序
                  </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                  请选择条件排序
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </div>

            <div v-if="sortType=='2'">
              <a-button
                href="javascript:void(0)"
                class="price"
                v-bind:class="{'sort-up':saleSortFlag}"
                @click="saleSortGoods()"
              >
                销量
                <!-- <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short" />
                </svg>-->
                <a-icon v-if="saleSortFlag" type="sort-descending" />
                <a-icon v-if="!saleSortFlag" type="sort-ascending" />
              </a-button>
            </div>

            <div v-if="sortType=='1'">
              <a-button
                href="javascript:void(0)"
                class="price"
                v-bind:class="{'sort-up':sortFlag}"
                @click="sortGoods()"
              >
                价格
                <!-- <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short" />
                </svg>-->
                <a-icon v-if="sortFlag" type="sort-descending" />
                <a-icon v-if="!sortFlag" type="sort-ascending" />
              </a-button>
            </div>
            <div v-if="sortType=='3'">
              <a-button
                href="javascript:void(0)"
                class="price"
                v-bind:class="{'sort-up':dateSortFlag}"
                @click="dateSortGoods()"
              >
                时间
                <!-- <svg class="icon icon-arrow-short">
                <use xlink:href="#icon-arrow-short" />
                </svg>-->
                <a-icon v-if="dateSortFlag" type="sort-descending" />
                <a-icon v-if="!dateSortFlag" type="sort-ascending" />
              </a-button>
            </div>
            
          </div>
        

          <!-- <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">筛选</a> -->
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <!-- <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价格范围分类:</dt>
                <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked==='all'}">全部</a></dd>
                <dd v-for="(item,index) in priceFilter" :key="index">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked===index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
          </div>-->

          <!-- search result accessories list -->
          <div v-if="defaultGoods" style="fontSize:30px;color:red">{{msg}}</div>
          <div v-else class="accessory-list-wrap">
            <div class="accessory-list col-5">
              <ul>
                <li
                  v-for="(item,index) in goodsList"
                  :key="index"
                  v-if="item.productImage.split('\\')[0]==='upload'"
                >
                  <div class="pic">
                    <!-- <router-link  :to="{ path: 'goodDetail', query: { id: item._id }}" @click="toGoodDetail(item._id)"> -->
                    <router-link
                      :to="{ name: 'GoodDetail', params: { id: item._id,goodInfo:item }}"
                    >
                      <img
                        width="230"
                        height="150"
                        v-lazy="`/static/${item.productImage}`"
                        :key="item.productImage"
                        alt
                      />
                    </router-link>
                  </div>
                  <div class="main">
                    <div class="name">{{item.title}}</div>
                    <div class="brand">{{item.brand}}</div>
                    <div class="price">{{item.price | currency('￥')}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn-ms" @click="addCart(item._id)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- <div
              class="view-more-normal"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="20"
            >
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading" />
            </div>-->
          </div>
        </div>
        <div class="pagnation">
          <a-pagination
            v-model="page"
            :total="total"
            :pageSize="pageSize"
            :defaultCurrent="1"
            @change="onChange"
            showQuickJumper
            :showTotal="total => `总共 ${total} 条`"
            showLessItems
            showSizeChanger
            @showSizeChange="onShowSizeChange"
            :pageSizeOptions="pageSizeOptions"
          >
            <template slot="buildOptionText" slot-scope="props">
              <span v-if="props.value!=='20'">{{props.value}}条/页</span>
              <span v-if="props.value==='20'">全部</span>
            </template>
          </a-pagination>
        </div>
      </div>
    </div>
    <div class="noticeWrap">
      <a-button
        type="danger"
        style="position:absolute;top:10px;right:20px;zIndex:99999"
        @click="isShowNotice=!isShowNotice"
      >公告</a-button>
      <div class="notice" :style="{display:isShowNotice?'none':'block'}">
        <a-card title="商城公告" style="background:#5ae7da;opacity:0.6">
          <!-- <a href="#" slot="extra" >more</a> -->
          <div v-for="(item,index) in noticeList" :key="index">{{index+1}}、{{item.info}}</div>
          <!-- <p>card content</p>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
          <p>card content</p>-->
        </a-card>
      </div>
    </div>
    <!-- 回顶部按钮为一张50*50的图片 -->
    <!-- btnFlag 控制图片显示隐藏 -->
    <!-- backTop 回顶部的方法 -->
    <img
      v-if="btnFlag"
      width="50"
      height="50"
      class="go-top"
      src="../../static/imgs/timg (1).gif"
      @click="backTop"
      title="返回顶部"
    />

    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">请先登录,否则无法加入到购物车中!</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok" />
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import Modal from "./../components/Modal";
import axios from "axios";
export default {
  data() {
    return {
      // current: 1,
      sortType: "1",
      isShowNotice: false,
      noticeList: [],
      pageSizeOptions: ["5", "10", "15", "20"],
      btnFlag: false,
      msg: "",
      defaultGoods: false,
      brands: ["联想", "华硕", "戴尔", "苹果"],
      brandFlag: "",
      keyword: "",
      goodsList: [],
      sortFlag: true,
      saleSortFlag: true,
      dateSortFlag: true,
      page: 1,
      pageSize: 10,
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      total: 0,
      priceFilter: [
        {
          startPrice: 0.0,
          endPrice: 100.0
        },
        {
          startPrice: 100.0,
          endPrice: 500.0
        },
        {
          startPrice: 500.0,
          endPrice: 1000.0
        },
        {
          startPrice: 1000.0,
          endPrice: 5000.0
        }
      ],
      priceChecked: "all",
      filterBy: false,
      overLayFlag: false
    };
  },
  mounted() {
    this.getAllGoods();
    this.getGoodsList();
    this.getNoticeList();

    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    // vue的两个生命钩子，这里不多解释。
    // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
    window.removeEventListener("scroll", this.scrollToTop);
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods: {
    handleButtonClick(e) {
      console.log("click left button", e);
    },
    handleMenuClick(e) {
      console.log("click", e);
      this.sortType = e.key;
    },
    onChange(current) {
      this.page = current;
      console.log(this.page);
      this.getGoodsList();
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.getGoodsList();
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    //推送功能
    pushGoods() {
      this.goodsList = this.goodsList.filter(item => {
        return item.isPush == true;
      });
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      //  let topBtn = document.getElementById('to-top-btn');
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },

    search(brand) {
      console.log(brand);
      this.brandFlag = brand;
      this.defaultGoods = false;
      this.priceChecked = "all";
      var param = {
        keyword: this.keyword || brand,
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        saleSortFlag: this.saleSortFlag ? 1 : -1,
        dateSort: this.dateSortFlag ? 1 : -1,
        sortType: this.sortType,
        priceLevel: this.priceChecked
      };

      axios
        .get("/api/goods/search", {
          params: param
        })
        .then(response => {
          var res = response.data;
          console.log(res);
          this.keyword = "";
          this.loading = false;
          if (res.status == "0") {
            this.goodsList = res.result.list;

            this.busy = true;
            // if(res.result.count==0){
            //     this.busy = true;
            // }else{
            //
            // }
          } else {
            if (res.result.count == 0) {
              this.defaultGoods = true;
              this.msg = "很抱歉，无此商品数据";
              setTimeout(() => {
                location.href = "/";
              }, 1000);
            }
            this.goodsList = [];
          }
          console.log(this.goodsList);
        });
    },
    getAllGoods(flag) {
      var param = {
        // page: this.page,
        // pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        saleSortFlag: this.saleSortFlag ? 1 : -1,
        dateSort: this.dateSortFlag ? 1 : -1,
        sortType: this.sortType,
        priceLevel: this.priceChecked
      };
      // this.loading = true;
      axios
        .get("/api/goods/list", {
          params: param
        })
        .then(response => {
          var res = response.data;
          console.log(res);
          if (res.status == "0") {
            this.goodsList = res.result.list;
            this.total = res.result.list.length;
          } else {
            this.goodsList = [];
          }
        });
    },
    getGoodsList(flag) {
      console.log("kkk");
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        saleSort: this.saleSortFlag ? 1 : -1,
        dateSort: this.dateSortFlag ? 1 : -1,
        sortType: this.sortType,
        priceLevel: this.priceChecked
      };
      // this.loading = true;
      axios
        .get("/api/goods/list", {
          params: param
        })
        .then(response => {
          var res = response.data;
          console.log(res);
          // this.loading = false;
          if (res.status == "0") {
            // if (flag) {
            //   this.goodsList = this.goodsList.concat(res.result.list);
            //   if (res.result.count == 0) {
            //     this.busy = true;
            //   } else {
            //     this.busy = false;
            //   }
            // } else {
            this.goodsList = res.result.list;
            // this.busy = false;
            // }
          } else {
            this.goodsList = [];
          }
          console.log(this.goodsList);
        });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    saleSortGoods() {
      this.saleSortFlag = !this.saleSortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    dateSortGoods() {
      this.dateSortFlag = !this.dateSortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.page = 1;
      this.getGoodsList();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    addCart(_id) {
      var arr = document.cookie.split(";");
      var arr1 = "";
      // console.log(arr[0].split('='))
      for (var i = 0; i < arr.length; i++) {
        arr1 += arr[i].split("=") + ",";
      }

      var arr2 = arr1.split(",").join(":");
      this.mdShow = arr2.indexOf("userId") == -1 ? true : false;

      console.log(arr2);

      axios
        .post("/api/goods/addCart", {
          _id: _id
        })
        .then(res => {
          console.log("dsdfsf");
          var res = res.data;
          if (res.status == 0) {
            console.log("dsdfsf");
            this.mdShowCart = true;
            this.$store.commit("updateCartCount", 1);
          } else {
            this.mdShow = true;
            console.log("jdkfjkd");
          }
        });
      return;
    },
    closeModal() {
      this.mdShow = false;
      this.mdShowCart = false;
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
      this.mdShowCart = false;
    },
    getNoticeList() {
      axios.get("/api/notice/noticeList").then(res => {
        console.log(res);

        if (res.data.status == "0") {
          this.noticeList = res.data.result;
          console.log(this.noticeList);
          return;
        }
        return;
      });
    }
  }
};
</script>
<style >
.cur {
  background: pink;
}
.go-top {
  position: fixed;
  right: 20px;
  bottom: 100px;
}
.pagnation {
  margin-left: 500px;
}
.noticeWrap {
  position: absolute;
  top: 72px;
  right: 11px;
  width: 230px;
  /* height: 255px; */
  /* background: yellow; */
}
.ant-card-body {
  height: 180px;
  overflow: auto;
}
</style>