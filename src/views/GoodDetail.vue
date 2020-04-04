 <template>
  <div>
    <!-- <nav-header></nav-header> -->
    <nav-bread>
      <span style="fontSize:25px">配件详情</span>
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
            <span>配件详情</span>
          </h2>
        </div>
        <div
          class="item-list-wrap"
         
        >
          <div class="cart-item">
            <!-- <img
              width="430"
              height="300"
              v-lazy="`/static/${item.productImage}`"
              :key="item.productImage"
              alt
            />-->
            <!-- <Magnifier></Magnifier>   -->
            <!-- <my-magnify :previewImg="`/static/${item.productImage}`" :zoomImg="`/static/${item.productImage}`"></my-magnify> -->
            <!-- <pic-zoom :previewImg="imgurl" :zoomImg="imgurl"></pic-zoom>
            <div class="list">
              <ul>
                <li
                  v-for="(item,index) in imagesList"
                  :key="index"
                  @mouseenter="changeImage(index)"
                >
                  <img width="20" height="20" :src="item" />
                </li>
              </ul>
            </div>-->
            <div class="productLeft">
              <!-- 左侧中图 -->
              <div class="mdImg">
                <img :src="mdImgUrl" alt />
              </div>
              <!-- 遮罩层 -->
              <div v-show="isShow" class="marks" :style="{top:top+'px',left:left+'px'}"></div>
              <!-- 遮罩层 玻璃板 superMarks-->
              <div @mouseenter="enter" @mouseleave="leave" @mousemove="marks" class="superMarks"></div>
              <!--左侧小图 -->
              <div class="smImg">
                <!--左按钮 -->
                <div @click="next" class="button-prev">
                  <!-- <img src="../assets/icon/prev.png" > -->
                </div>
                <div class="smImgUl">
                  <ul :style="{'margin-left':marginLeft+'px'}">
                    <li @mouseenter="enterLi(index)" v-for="(item,index) of list" :key="index">
                      <img :class="selectIndex==index?'img':''" :src="`http:${item}`" alt />
                    </li>
                  </ul>
                </div>
                <!-- 右按钮 -->
                <div @click="prev" class="button-next">
                  <!-- <img src="../assets/icon/next.png" > -->
                </div>
              </div>
              <!-- 左侧大图 -->
              <div v-show="isShow" class="lgImg">
                <img :src="lgImgUrl" alt :style="{top:topLgImg+'px',left:leftLgImg+'px'}" />
              </div>
            </div>
          </div>
       <div style="marginLeft:100px;display:flex">
            <div class="goodInfo1">
            <div>
             <label for="">配件名称：</label> 
              <span>{{goodInfo.title}}</span>
            </div>
            <div>
              <label for="">配件分类：</label> 
              <span>{{goodInfo.brand}}</span>
            </div>
            <div>
              <label for="">配件价格：</label> 
              <span>{{goodInfo.price | currency('￥')}}</span>
            </div>
            <div>
              <label for="">配件描述：</label> 
              <span>{{goodInfo.productDec}}</span>
            </div>
            <div>
              <label for="">配件发货地址：</label> 
              <span>{{goodInfo.from}}</span>
            </div>
            <!-- <div class="btn-area addCart">
              <a href="javascript:;" class="btn btn-ms" @click="addCart(goodInfo._id)">加入购物车</a>
            </div> -->
          </div>
          <div class="goodInfo2">
            <div>
             <label for="">配件销量：</label> 
              <span>{{goodInfo.saleNum}}</span>
            </div>
            <div>
              <label for="">配件货存：</label> 
              <span>{{goodInfo.overstock}}</span>
            </div>
            <div>
              <label for="">配件上架时间：</label> 
              <span>{{goodInfo.createTime}}</span>
            </div>
            <div>
              <a-button href="javascript:;" type="primary" @click="addCart(goodInfo._id)"><a-icon type="shopping-cart" />加入购物车</a-button>
            </div>
          </div>
       </div>
        </div>
      </div>
      <div style="marginLeft:500px;marginBottom:10px">
        <a-button type="primary">
          <a-icon type="like" />好评
          <span>{{goodInfo.goodEvaluate}}</span>
        </a-button>
        <a-button>
          <a-icon type="dislike" />差评
          <span>{{goodInfo.badEvaluate}}</span>
        </a-button>
      </div>
      <a-collapse defaultActiveKey="1" :bordered="false">
        <!-- <a-button type="primary" style="position:absolute;left:250px">{{goodInfo.evaluate.length}}条评价</a-button> -->

        <template v-slot:expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel :header="goodInfo.evaluate.length +'条评价'" key="1">
          <!-- <div
        v-for="(item,index) in goodInfo.evaluate"
        class="comment"
        style="background:white"
        :key="index"
      >
          -->
          <!-- <a-comment>
          <template slot="actions">
            <span key="comment-basic-like">
              <a-tooltip title="Like">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like"
                />
              </a-tooltip>
              <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="Dislike">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
                />
              </a-tooltip>
              <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
            </span>
            <span key="comment-basic-reply-to">评论</span>
          </template>
          <a slot="author">{{item.userName}}</a>
          <a-avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
            slot="avatar"
          />
          <p slot="content">{{ item.infoStr}}</p>
          <a-tooltip slot="datetime" :title="item.createTime">
        
            <span>{{item.createTime}}</span>
          </a-tooltip>
          </a-comment>-->
          <a-list
            style="background:#d2c5c5"
            class="comment-list"
            :header="`评价列表`"
            itemLayout="horizontal"
            :dataSource="goodInfo.evaluate"
          >
            <a-list-item style="background:#697b96" slot="renderItem" slot-scope="item,index">
              <a-comment
                :author="item.userName"
                avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              >
                <template slot="actions">
                  <span key="comment-basic-like" v-if="!upFlag">
                    <a-tooltip title="Like">
                      <a-icon
                        type="like"
                        :theme="action === 'liked' ? 'filled' : 'outlined'"
                        @click="like"
                      />
                    </a-tooltip>
                    <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
                  </span>
                  <span key="comment-basic-dislike" v-if="!upFlag">
                    <a-tooltip title="Dislike">
                      <a-icon
                        type="dislike"
                        :theme="action === 'disliked' ? 'filled' : 'outlined'"
                        @click="dislike"
                      />
                    </a-tooltip>
                    <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
                  </span>
                  <span>评论</span>
                </template> 
                <p slot="content">{{item.infoStr}}</p>
                  <a-button v-if="item.orther=='1'" type="primary">
                    <a-icon type="like" />好评
                  </a-button>
                <a-tooltip slot="datetime" :title="item.createTime">
                  <span>{{item.createTime}}</span>
                </a-tooltip>
              </a-comment>
            </a-list-item>
          </a-list>
          <a-divider></a-divider>
        </a-collapse-panel>
      </a-collapse>

      <div class="order-create">
        <!-- <div class="order-create-pic"><img src="/static/imgs/ok-2.png" alt=""></div> -->
        <div class="order-create-main">
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">我的购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">配件列表</router-link>
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
import Magnifier from "./../components/magnifier";
import MyMagnify from "./../components/Magnify";
// import PicZoom from "./../components/PicZoom";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
// import $ from "jquery";
import imgList from "../assets/imgList.js";
import Modal from "./../components/Modal";
import moment from "moment";
import { currency } from "./../util/currency";
import axios from "axios";
export default {
  data() {
    return {
      // upFlag:false,
      //   item: {},
      mdShow: false,
      //   imgurl: "",
      //   imagesList: [],
      goodInfo: {},
      list: [],
      mdImgUrl: "",
      lgImgUrl: "",
      ulIndex: 0, //向左移动几个li
      marginLeft: 0, //向左向右移动的距离
      isShow: false, //控制遮罩层marks和大图片是否显示"
      left: 0, //marks左移位置
      top: 0, //marks下移位置
      leftLgImg: 0, //大图lgImg移动的位置
      topLgImg: 0, //大图lgImg移动的位置
      selectIndex: 0,
      likes: 0,
      dislikes: 0,
      action: null,
      moment
    };
  },
  created() {
    this.goodInfo = this.$route.params.goodInfo;
    this.goodInfo = this.$route.params.goodInfo;
    this.mdImgUrl = `/static/${this.goodInfo.productImage}`;
    this.lgImgUrl = `/static/${this.goodInfo.productImage}`;
    // console.log(this.$route.params);
    // if (this.$route.params.item) {
    //   this.item = this.$route.params.item;
    //   this.imgurl = `/static/${this.item.productImage}`;
    //   this.imagesList = [
    //     `/static/${this.item.productImage}`,
    //     `/static/${this.item.productImage}`,
    //     `/static/${this.item.productImage}`,
    //     `/static/upload/z9KX7FpYxP_c_aCC8LrSvgnK.jpg`
    //   ];
    // }
  },
  mounted() {
    console.log(this.$route.params);
    console.log(this.goodInfo.brand);
    Object.keys(imgList).forEach(key => {
      if (key == this.goodInfo.productId) {
        this.list = imgList[key];
      }
    });
    console.log(this.list);
  },
  //   methods: {
  //     changeImage: function(index) {
  //       console.log(index);
  //       this.imgurl = this.imagesList[index];
  //     },

  //   },
  methods: {
    // upFlagShow(index){
    //   // console.log(index)
    //   this.upFlag=!this.upFlag
    // },
    like(index) {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike(index) {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
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
      if (this.mdShow) {
        this.$message.success("加入购物车失败,请先登录");
      }
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
            // this.mdShowCart = true;
            this.$message.success("加入购物车成功");
            this.$store.commit("updateCartCount", 1);
          } else {
            this.$message.success("加入购物车失败");
            // this.mdShow = true;
            console.log("jdkfjkd");
          }
        });
      return;
    },
    //鼠标进入小图时事件，显示对应的中图
    enterLi(e) {
      //e是对应的下标
      //console.log(e);
      this.selectIndex = e;
      this.mdImgUrl = this.list[e];
      this.lgImgUrl = this.list[e];
    },

    //点击左右按钮事件ul的li移动,每个li宽74px，ul宽370显示5个li
    prev() {
      //向左移动-
      if (this.ulIndex > -(this.list.length - 4)) {
        this.ulIndex--;
        this.marginLeft = this.ulIndex * 75;
        //console.log(this.ulIndex)
      }
    },
    next() {
      //向右移动++
      if (this.ulIndex < 0) {
        this.ulIndex++;
        this.marginLeft = this.ulIndex * 75;
        //console.log(this.ulIndex)
      }
    },

    //鼠标进入和离开
    enter() {
      this.isShow = true;
    },
    leave() {
      this.isShow = false;
    },
    //遮罩层放大镜
    marks(e) {
      //console.log(e.offsetX,e.offsetY)   //鼠标移入时的位置·
      var marksWidth = 200; //marks的宽
      var marksHeight = 200; //marks的高

      this.left = e.offsetX - marksWidth / 2;
      this.top = e.offsetY - marksHeight / 2;
      //console.log(this.left,this.top)
      if (this.left < 0) {
        this.left = 0;
      } else if (this.left > 250) {
        this.left = 250;
      }
      if (this.top < 0) {
        this.top = 0;
      } else if (this.top > 250) {
        this.top = 250;
      }
      //console.log(this.left,this.top)

      //中图片div宽高450，大图片div宽高800
      this.leftLgImg = (-this.left * 800) / 350;
      this.topLgImg = (-this.top * 800) / 350;
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
    // MyMagnify,
    // PicZoom
    // Magnifier
  }
};
</script>
 <style lang="less" scoped>
.goodInfo1 {
  width: 500px;
  padding: 20px;
  background: blanchedalmond;
  font-size: 20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  div {
 
    flex: 1;
   
    label{
      // flex: 2;
      color: #7f7b98;;
      font-weight: 700;
    }
    span{
      // flex: 2;
      color: #36866b;
    }
  }
}
.goodInfo2 {
  width: 500px;
  padding: 20px;
  background: blanchedalmond;
  font-size: 20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  div {
 
    flex: 1;
   
    label{
      // flex: 2;
      color: #7f7b98;;
      font-weight: 700;
    }
    span{
      // flex: 2;
      color: #36866b;
    }
  }
}
.addCart {
  //   margin-left: 800px;
  //   margin-top: -30px;
}

.content {
  width: 1200px;
  margin: 0 auto;
 background:#96b5da;
}
.content > .product {
  display: flex;
  justify-content: space-between;
}
/* 左侧大小图样式 */
.productLeft {
  width: 450px;
  position: relative;
  margin-left: 200px;
}
/* 左侧中图 */
.mdImg,
.mdImg > img {
  width: 350px;
  height: 350px;
}
/*遮罩层superMarks */
.superMarks {
  width: 350px;
  height: 350px;
  background-color: rgba(220, 220, 220, 0);
  position: absolute;
  top: 0px;
  left: 0px;
}
/* 遮罩层 */
.marks {
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: rgba(220, 220, 220, 0.5);
  /*top:0px;  //内联设置了动态的top，left
        left:0px;*/
}
/* 左侧小图 */
.smImg {
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
.smImgUl {
  overflow: hidden;
  width: 370px;
}
.smImg ul {
  display: flex;
  width: 370px;
  margin: 0;
  padding: 0;
}
.smImg ul > li {
  padding: 0 3px;
}
.smImg ul > li > .img {
  /* padding:0 3px; */
  border: 2px solid red;
}
.smImg img {
  width: 60px;
  height: 60px;
  margin: 4px;
}
/* 左侧隐藏大图 */
.lgImg {
  width: 400px;
  height: 400px;
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 450px;
  border: 2px solid #aaa;
  background-color: #fff;
}
.lgImg img {
  width: 800px;
  height: 800px;
  position: absolute;
  /* top:100px;
        left:100px;*/
}

/* product右侧 */
.productRight {
  width: 700px;
}
/* 左右按钮 */
.button-prev,
.button-next {
  width: 35px;
  height: 35px;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 50%;
  text-align: center;
}
.button-prev:hover,
.button-next:hover {
  background-color: #eee;
}
.button-prev > img,
.button-next > img {
  width: 20px;
  height: 20px;
}
</style>

