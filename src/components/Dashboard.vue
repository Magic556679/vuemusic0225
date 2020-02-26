<template>
 <div>
   <Navbar/>
   <Alert></Alert>
    <div class="container-fluid">
    <div class="row">
     <Sidebar></Sidebar><!-- router-view 外區域為固定樣板 -->
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
       <router-view></router-view> <!-- products 的路由，內為每個頁面切換的內容 -->
    </main>
   </div>
  </div>
 </div>
</template>
<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Alert from './AlertMessage';//掛載

export default {//當有需要使用到 script 的元件 ，匯出元件來做編譯
   components: {
       Sidebar,
       Navbar,
       Alert,
   },
};

</script>