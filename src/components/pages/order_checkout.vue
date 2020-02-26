<template>
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
                    <div class="alert alert-dark rounded-pill h5" role="alert">
                        2.輸入資料
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-info rounded-pill h5" role="alert">
                        3.結帳
                    </div>
                </div>
            </div>
        </div>

    <div class="py-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table bg-light">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table bg-light">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-light">確認付款</button>
      </div>
      
    </form>
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
    data(){
        return{
            order: {
                user: {},
            },
            orderId: '',
        }
        },
    methods: {
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
    created(){
        this.orderId = this.$route.params.orderId;
        this.getOrder();
        console.log(this.orderId);
    },
}
</script>

<style scoped>
    .production{
        background-color: #FFFFFF;
    }    
</style>