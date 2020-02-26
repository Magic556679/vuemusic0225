<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="production mt-5 mb-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-none" >
                            <li class="breadcrumb-item" ><router-link to="/home" style="color:gray">首頁</router-link></li>
                            <li class="breadcrumb-item"><router-link to="/store" style="color:gray">購物</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page" style="color:orangered">{{product.title}}</li>
                        </ol>
                    </nav>
                    <img :src="product.imageUrl" alt="" style="width: 85%">
                </div>
                <div class="col-md-6 text-white">
                    <h1 class="text-white text-white">{{ product.title }}</h1>
                    <div class="price p-2 rounded d-flex">
                            <h3 class="text-warning ml-2">
                                {{ product.origin_price }} 元
                                <span class="badge badge-pill badge-danger">
                                    <small>
                                        熱賣中
                                    </small>
                                </span>
                            </h3>
                    </div>
                    <form>
                        <div class="form-group row mt-4 mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label mb-3">說明</label>
                            <div class="col-sm-10">
                                <p>
                                {{ product.content }}
                                </p>
                            </div>
                            <label for="inputEmail3" class="col-sm-2 col-form-label">運費</label>
                            <div class="col-sm-10">
                                <p><i class="fas fa-truck fa-2x mr-5"></i> ＄45~$60</p>
                            </div>
                        </div>
                        <div class="form-group row mb-3">
                            <label for="" class="col-sm-2 col-form-label">尺寸</label>
                            <div class="col-sm-10">
                                <div class="btn-group-sm">
                                    <a href="#" class="btn btn-outline-secondary disabled">S</a>
                                    <a href="#" class="btn btn-outline-secondary">M</a>
                                    <a href="#" class="btn btn-outline-secondary">L</a>
                                    <a href="#" class="btn btn-outline-secondary">XL</a>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-3">
                            <div class="col-sm-2">
                                <label for="piece">數量</label></div>
                            <div class="col-sm-10">
                                <div class="form-check p-0">
                                    <select name="" class="form-control mt-3" v-model="product.num">
                                        <option :value="num" v-for="num in 10" :key="num">
                                            選購 {{num}} {{product.unit}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-8"></div>
                            <div class="col-sm-4">
                                <button type="button" class="btn btn-danger text-right"
                                @click="addtoCart(product.id, product.num)">
                                <i class="fas fa-spinner fa-spin" v-if="status.isLoading === product.id"></i>
                                加到購物車
                                </button>
                            </div>
                        </div>
                    </form>
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
import sidebar from './sidebar';
import product from './product';
import $ from 'jquery';
export default {
    data() {
    return {
      itemId: "",
      isLoading: false,
      AllNum: 1,
      AllProduct: [],
      product: {},
      status: {
        loadingItem: "" //存放產品id的值
      },
    }
    },
    components:{
        navbar,
        footerAll,
        Productheader,
        sidebar,
        product,
    },
    methods: {
        getProduct(id) {
        const vm = this;
        vm.isLoading = true;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        this.$http.get(url).then(response => {
        console.log(response.data);
        vm.product = response.data.product;
        vm.isLoading = false;
        });
    },
    goDetail(id){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(url).then(response => {
        console.log(response.data.product.id);
        if (response.data.success) {
          vm.$router.push(`/store/detail/${response.data.product.id}`);
        }
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
    },
    created() {
        this.itemId = this.$route.params.itemId;
        this.getProduct(this.itemId);
        console.log(this.itemId);
    }
}
</script>