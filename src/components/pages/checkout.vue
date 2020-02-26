<template>
    <div>
        <navbar/>
        <Productheader/>
        <router-view/>
        <footerAll/>
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
    components:{
        navbar,
        footerAll,
        Productheader,
        sidebar,
        product,
    },
}
</script>