<template>
    <div>
        <div class="production pt-5">
        <div class="container">
            <h2 class="text-white text-center mb-3">結帳畫面</h2>
            <div class="row text-center">
                <div class="col-12 col-sm">
                    <div class="alert alert-info rounded-pill h5" role="alert">
                        1.購物內容
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-dark rounded-pill h5" role="alert">
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
        <div class="row justify-content-center">
      <div class="my-5 row ">
        <table class="table bg-light rounded">
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
         <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="ml-auto">
          <!-- <button class="btn btn-light text-dark ">
            <a href="#" style="text-decoration:none">下一步</a>
          </button> -->
          <router-link to="/checkout/order_name">
            <button class="btn btn-light text-dark ">
              下一步
            </button>
          </router-link>
        </div>
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
              vm.$router.push(`/order_checkout/${response.data.orderId}`)
            }
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
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