<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-company-darkblue fixed-top">
        <h1>
        <router-link to="/home" class="navbar-brand MainLogo">
        夢想音樂
        </router-link>
        </h1>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mr-3">
                    <router-link to="/home" class="nav-link" >首頁</router-link>
                </li>
                <li class="nav-item mr-3">
                    <a class="nav-link" href="#contactInfor">聯絡資訊</a>
                </li>
                <li class="nav-item dropdown mr-3">
                    <router-link to="/store" class="nav-link" href="#" 
                    id="navbarDropdownMenuLink" role="button">購物</router-link>                  
                </li>
                <li class="nav-item dropdown mr-1">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-shopping-cart text-white"></i>
                    <span class="badge badge-danger cartNum">{{ CartNumber }}</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink"
                    >
                    <table class="table bg-light rounded" style="width:600px"
                    >
          <thead>
            <th></th>
            <th style="width: 80px"></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle" style="width:40px">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                <div style="height: 30px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.product.imageUrl})`}">
          </div>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            
            <tr>
              <td colspan="4" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex justify-content-end mr-2">
          <button class="btn btn-warning rounded" @click="goCart">前往結帳</button>
        </div>
                    </div>
                </li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
import navbar from './navbar';
import footerAll from './footerAll'
import Productheader from './Productheader';
import $ from 'jquery';
export default {
    components:{
        navbar,
        footerAll,
        Productheader,
    },
     data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      status:{
      loadingItem: '',
      },
      CartNumber: '',
      cartProduct: [],
      cartLength: "",
      cartTotal: "",
      form: {
          user:{
             name: '',
             email: '',
             tel: '',
             address: '', 
          },
          message: '',
      },
      cart: {},
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
         vm.cartProduct = response.data.data.carts;
        vm.cartTotal = response.data.data.total;
        console.log(response.data.data);
        vm.$bus.$emit("cartnum:push", response.data.data.carts.length);
        vm.$bus.$emit("cartfinish:push", response.data.data.carts);
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id , qty = 1){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
          product_id: id,
          qty,
      };
      this.$http.post(url , { data:cart }).then((response) => {
        console.log(response);
        vm.status.loadingItem = '';
        vm.getCart();
      });
    },
    getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getCartProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data.data.carts.length);
        vm.$bus.$emit("cartnum:push", response.data.data.carts.length);
      });
    },
    removeCartItem(id){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading = false;
        console.log("購物車編號數量", response.data.data); //不像get(api)回傳一[]就可以計算length
        if (response.data.success) {
          vm.$bus.$emit("cart:push");
          vm.getCartProduct();
          vm.$bus.$emit("message:push", response.data.data, "info");
        }
      });
    },
    addCouponCode(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
          code: vm.coupon_code
      }
      vm.isLoading = true;
      this.$http.post(url , {data : coupon}).then((response) => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response);
            // vm.getCart();
            if(response.data.success){
              vm.$router.push(`/checkout/order_checkout/${response.data.orderId}`)
            }
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
    getOrder(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
            vm.order = response.data.order;
            console.log(response);
            vm.isLoading = false;
        });
        },
    payOrder(){
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
        vm.isLoading = true;
        this.$http.post(url).then((response) => {
        console.log(response);
        if (response.data.success) {
            vm.getOrder();
        }
        vm.isLoading = false;
        });
        },
    goCart(){
      const vm = this;
      vm.$router.push(`/checkout`);
    },
    getCartNum(cartNum) {
      console.log(cartNum);
      this.CartNumber = cartNum;
    }
  },
  created() {
    const vm = this;
    vm.$bus.$on("cartnum:push", cartNum => {
      vm.getCartNum(cartNum);
    });
    vm.getCartNum();//測試用
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
    this.getProducts();
    this.getCart();
  },
}
</script>

<style scoped>
    .MainLogo{
        background: transparent;
        margin-right: 0;
        box-shadow: none;
    }
    .bg-company-darkblue{
        background-color: 		#00DDDD;
    }
    .dropdown-item.active, .dropdown-item:active {
    color: black;
    background: #fff;
    }
    .dropdown-item.active:hover{
      background: #dcdde1;
    }
    .cartNum{
      position: absolute;
      top: 5px;
      right: 8px;
      background-color: red;
      color: #fff;
      border-radius: 50% 50%;
    }
</style>