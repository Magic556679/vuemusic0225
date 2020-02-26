<template>
    <div class="row">
      <div class="col-md-3 mt-4">
        <div>   
        <div class="list-group list-group-flush" id="list-tab" role="tablist">
            <li class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list"
            href="#" role="tab" aria-controls="home" @click.prevent="AllProduction" :class="{'active': Keytxt === 'all'}">全部歌手</li>
            <li class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list"
            href="#" role="tab" aria-controls="home" @click.prevent="Chinese" :class="{'active': Keytxt === 'Chinese'}">華語</li>
            <li class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
            href="#" role="tab" aria-controls="profile" @click.prevent="Korea" :class="{'active': Keytxt === 'Korea'}">韓國</li>
            <li class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
            href="#" role="tab" aria-controls="messages" @click.prevent="Western" :class="{'active': Keytxt === 'Western'}">西洋</li>
        </div>
    </div>
      </div>
    <loading :active.sync="isLoading"></loading>
    <div class="col-md-9 mt-2">
      <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in AllProduct" :key="item.id">
          <div class="card border-0 shadow-sm">
          <button @click="goDetail(item.id)" class="btn btn-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body p-2">
            <h5 class="card-title text-left">
              <a href="#" class="text-dark" style="text-decoration : none">{{ item.title }}</a>
            </h5>
            <p class="card-text text-left">{{ item.description }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h6" v-if="item.price" style="color:orangered;">${{ item.price }} 元</div>
            </div>
            <div class="d-flex mt-3 ">
              <small>評分：</small>
              <small><p style="color: #fbc531">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> 
              </p></small>
              <small class="ml-auto"><p>台北市東區</p></small>
            </div>
          </div>
          </button>
          <div class="card-footer d-flex justify-content-center">
            <!-- <button type="button" class="btn btn-outline-secondary btn-sm" 
            @click="goDetail(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              商品細節
            </button> -->
             <button type="button" class="btn btn-outline-danger btn-sm"
              @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>  
    </div>
    </div>
</template>

<script>
import $ from 'jquery';
import navbar from './navbar';
import footerAll from './footerAll'
export default {
    navbar,
    footerAll,
    data() {
    return {
      AllProduct: [],
      isLoading: false,
      Keytxt: 'all',
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
    updateProduct() {
      this.$emit("updateproduct_emit");
    },
    
    AllProduction(){
      const vm = this;
      vm.Keytxt = 'all';
      vm.getAllProduct();
    },
    Chinese(){
      const vm = this;
      vm.Keytxt = 'Chinese';
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(url).then(response =>{
        const newproduct = response.data.products;
        vm.AllProduct = newproduct.filter(item =>{
          return item.category == "Chinese";
        });
        console.log(vm.AllProduct);
      });
    },
    Korea(){
      const vm = this;
      vm.Keytxt = 'Korea';
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(url).then(response =>{
        const newproduct = response.data.products;
        vm.AllProduct = newproduct.filter(item =>{
          return item.category == "Korea";
        });
        console.log(vm.AllProduct);
      });
    },
    Western(){
      const vm = this;
      vm.Keytxt = 'Western';
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(url).then(response =>{
        const newproduct = response.data.products;
        vm.AllProduct = newproduct.filter(item =>{
          return item.category == "Western";
        });
        console.log(vm.AllProduct);
      });
    },
    getAllProduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        const AllProduct = response.data.products;
        vm.AllProduct = response.data.products;
        vm.isLoading = false;
      });
    },
    goDetail(id){
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(url).then(response => {
        // console.log(response.data.product.id);
        if (response.data.success) {
          vm.$router.push(`/store/detail/${response.data.product.id}`);
        }
      });
    },
    uploadFile(){
        console.log(this);
        const uploadedFile = this.$refs.files.files[0];
        const vm = this;
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile);
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
        vm.status.fileUploading = true;
        this.$http.post(url, formData,{
            headers: {
               'Content-Type' : 'multipart/form-data'
            }
        }).then((response) => {
        console.log(response.data);
        vm.status.fileUploading = true;
    if (response.data.success){
         // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
    }else{
      this.$bus.$emit('message:push' , 'response.data.message' , 'danger');
    }
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
        console.log("購物車編號數量", response.data.data); //不像get(api)回傳一[]就可以計算length
        if (response.data.success) {
          vm.$bus.$emit("cart:push");
          vm.getCartProduct();
          vm.$bus.$emit("message:push", response.data.data, "info");
        }
        vm.getCart();
        
      });
    },
    getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        // console.log(response);
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
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
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
    this.getAllProduct();
    this.getCart();
  },
};
</script>

<style scoped>
.bg-none{
    background-color: #2f3640;
    
}
.card:hover{
    transform: scale(0.96);
    transition: 0.2s;
}
.price{
    background-color:  rgba(255,255,255,.1);
}
.bg-cover{
    background-position: center center;
    background-size: cover;
    min-height: 200px;
}
</style>