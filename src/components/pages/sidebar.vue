<template>
    <div>   
        <div class="list-group sticky-top list-group-flush" id="list-tab" role="tablist">
            <li class="list-group-item list-group-item-action list-group-item-info" id="list-home-list" data-toggle="list"
            href="#" role="tab" aria-controls="home" @click.prevent="AllProduction" :class="{'active': Keytxt === 'all'}">全部歌手</li>
            <li class="list-group-item list-group-item-action list-group-item-info" id="list-home-list" data-toggle="list"
            href="#" role="tab" aria-controls="home" @click.prevent="Chinese" :class="{'active': Keytxt === 'Production'}">華語</li>
            <li class="list-group-item list-group-item-action list-group-item-info" id="list-profile-list" data-toggle="list"
            href="#" role="tab" aria-controls="profile" @click.prevent="Korea" :class="{'active': Keytxt === 'Korea'}">韓國</li>
            <li class="list-group-item list-group-item-action list-group-item-info" id="list-messages-list" data-toggle="list"
            href="#" role="tab" aria-controls="messages" @click.prevent="Western" :class="{'active': Keytxt === 'Western'}">西洋</li>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data() {
    return {
      Keytxt: "",
      isLoading: false,
      AllProduct: [],
    }
    },
    methods: {
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
    getAllProduct(){
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
        this.$http.get(url).then(response =>{
            const AllProduct = response.data.products;
            console.log(AllProduct);
            vm.AllProduct = response.data.products;
        })
    }
    },
}
</script>