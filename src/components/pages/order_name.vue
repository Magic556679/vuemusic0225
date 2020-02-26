<template>
    <div>
        <div>
        <div class="production pt-5">
        <div class="container">
            <h2 class="text-white text-center mb-3">結帳畫面</h2>
            <div class="row text-center">
                <div class="col-12 col-sm">
                    <div class="alert alert-dark rounded-pill h5" role="alert">
                        1.購物內容
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-info rounded-pill h5" role="alert">
                        2.輸入資料
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-dark rounded-pill h5" role="alert">
                        3.結帳完成
                    </div>
                </div>
            </div>
        </div>
        <div class="py-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="createOrder">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail" :class="{'is-invalid':errors.has('email')}"
        v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'">
      <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
    </div>
  
    <div class="form-group">
      <label for="username">收件人姓名</label>
      <input type="text" class="form-control" name="name" id="username" :class="{'is-invalid':errors.has('name')}"
        v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'">
      <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址">
      <span class="text-danger">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger">送出訂單</button>
    </div>
  </form>
</div>
      </div>
    </div>
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
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
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
        $('#productModal').modal('hide');
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
    removeCartItem(id){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading = false;
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
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    console.log(this.orderId);
    this.getProducts();
    this.getCart();
  },
}
</script>

<style scoped>
    .production{
        background-color: #FFFFFF;
    }    
</style>