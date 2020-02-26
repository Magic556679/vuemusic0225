<template>
    <div class="customerCart">
        <div class="container-fluid">
        <navbar/>
        <div style="padding-top:100px">
        <!--<Productheader/>-->
        </div>
        <div class="container">
              <router-view/>
        </div>
        <footerAll/>
        </div>
    </div>
</template>

<script>
import navbar from './pages/navbar';
import footerAll from './pages/footerAll'
// import Productheader from './pages/Productheader';
import sidebar from './pages/sidebar';
import product from './pages/product';
import $ from 'jquery';
export default {
    components:{
        navbar,
        footerAll,
        // Productheader,
        sidebar,
        product,
    },
    
};
</script>

<style scoped lang="scss">
    
.customerCart{
    background-color: white;
}
   
.container-fluid{
      padding: 0px;
   }


</style>