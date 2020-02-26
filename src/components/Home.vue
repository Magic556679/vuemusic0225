<template>
    <div>
        <navbar/>
        <div class="banner" style="padding-top:0px">
        </div>
        <div class="jumbotron jumbotron-fluid jumbotron-bg banner" >
            <div class="row">
                <div class="col-md-5"></div>
                <div class="col-md-2 d-flex justify-content-center">
                </div>
                <div class="col-md-5">
                </div>
            </div>
        </div>
<!-- banner end -->
<!-- content -->
<!--<div class="content">
    <div class="jumbotron jumbotron-fluid jumbotron-bg-1  content square mb-0">
        <div class="container">
            <div class="logo rounded">
                <h1 class="display-4 text-white">2020年歌曲風雲榜</h1>
            </div>
        </div>
    </div>
</div>-->
 <div>
            <div class="header">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators ">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" style="padding-top:0px">
                    <div class="carousel-item header-carousel-item bg-cover1 active"
                        style="background-image: url('~@/../static/img/Blackpink.jpg') ; background-size: 100% cover">
                        <div class="carousel-caption d-none d-md-block p-5 title-bg">
                            <h1>2020年度 亞洲音樂風雲榜</h1>
                        </div>
                    </div>
                    <div class="carousel-item header-carousel-item bg-cover1"
                        style="background-image: url('~@/../static/img/BTS.jpg') ; background-size: 100% cover">
                        <div class="carousel-caption d-none d-md-block p-5 title-bg">
                            <h1>2020年度 亞洲音樂風雲榜</h1>
                        </div>
                    </div>
                    <div class="carousel-item header-carousel-item bg-cover1"
                        style="background-image: url('~@/../static/img/ikon.jpg') ; background-size: 100% cover">
                        <div class="carousel-caption d-none d-md-block p-5 title-bg">
                            <h1>2020年度 亞洲音樂風雲榜</h1>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
    </div>
    </div>


        <!-- history -->
<div class="history" id="history">
<div class="jumbtron jumbotron-fluid jumbotron-bg-2 ">
    <div class="card-image-2"
         :style="{ backgroundImage: 'url(' + require('@/../static/img/Eric.jpg') + ')' }">
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
        <div class="produce ml-5 mt-4">
        <h1>周興哲</h1>
        <h2>全新專輯  小時候的我們 </h2>
        <h3>出道僅5年，24歲的周興哲以3張專輯與1張數位EP，拿下近百個數位音樂平台的冠軍；YouTube總點閱率超過6億，平均一年創下1.2 億的驚人點擊數，並以〈怎麼了〉MV獲得YouTube 2019年度熱門音樂影片冠軍。</h3>
        </div>
        </div>
    </div>
    </div>
    </div>
</div>
</div>
<div class="kidscamp">
<div class="jumnbtron jumbtron-fluid  square2">
    <div class="card-image-3"
    :style="{ backgroundImage: 'url(' + require('@/../static/img/OSN.jpg') + ')' }">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 jumbotron-bg-3"></div>
            <div class="col-md-4 title-1 text-black">
                <h1 >OSN高爾宣</h1>
                <h2 class="h1">最佳亞洲新人獎</h2>
                <p class="py-3">一年一度的南韓盛事Mnet 亞洲音樂大獎（MAMA）12月4日在日本名古屋盛大舉行。<br>
                    除了天后蔡依林的專輯《UGLY BEAUTY》奪下「年度最佳製作人」，其中〈玫瑰少年〉贏得「年度最佳編舞」兩項大獎外，台灣饒舌新人高爾宣，也憑藉出道不到一年就累積的極高人氣和實力，奪下「最佳亞洲新人獎」！<br>
                     
                </p>
                <small class=""></small>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
<footerAll/>
    </div>
</template>

<script>
import navbar from './pages/navbar';
import footerAll from './pages/footerAll';
import product from './pages/product';
export default {
    components:{
        navbar,
        footerAll,
        product,
    }
 }
</script>

<style lang="scss" scoped>

body{
    font-family: 'Permanent Marker', cursive;
    font-family: STHupo;
    font-size: 16px;
    background: #000;
    margin: 0 auto;
}

.bg-cover1{
    background-size: 100% auto;
    min-height: 700px;
}
.bg-cover{
    background-size: cover;
    background-position: center center;
    min-height: 200px;
}
.banner{
    margin-bottom: 0;
}
.reversation a{
    text-decoration: none;
    color: #fff;
}
.content{
    margin-top: -95px;
    
}
.bg-dark{
    color: #192a56;
    background-color: #192a56;
}
.logo{
    text-align: center;
    border: 1px solid transparent;
    background-color: rgba(0,0,0,.4);
    max-width: 660px;
    padding: 40px;
    margin:0 auto;
    margin-top: 170px;
}
.logo:hover{
    transform: scale(0.96);
    transition: (0.3s);
}
.reversation{
    margin-top: 380px;
    width: 300px;
    background: orange;
    outline: none;
    color: #fff;
    font-size: 20px;
}
.reversation:hover{
    transform: scale(0.9);
    transition: 0.4s;
    cursor: pointer;
    color: #fff;
    font-size: 20px;
    text-decoration: none;
}
.jumbotron-bg-2 {
    margin-top: 30px;
    background-size: cover;
    background-position: center center;
    height: 580px;
}
.card-image-2{
    margin-top: 30px;
    background-size: cover;
    background-position: center center;
    height: 580px;

}

.square2{
    position: relative;
    background-color: #FFFFFF;
    min-height: 40vw;
}
.square2 .title-1{
    margin-top: 10%;
    margin-left: 65%;
    text-align: center;
}
// .jumbotron-bg-3::after{
//     margin-top: 30px;
//     content: "";
//     background: url("~@/../static/img/OSN.jpg") no-repeat;
//     background-size: cover;
//     background-position: center center;
//     width: 100%;
//     min-height: 40vw;
//     position: absolute;
//     top: 0;
//     left: 0;
//     clip-path: polygon(0 0, 100% 0%, 98% 100%, 0 100%);
// }
.card-image-3{
    margin-top: 30px;
    content: "";
    background-size: cover;
    background-position: center center;
    width: 100%;
    min-height: 40vw;
    position: absolute;
    top: 0;
    left: 0;
    color: #FFFFFF;
    // clip-path: polygon(0 0, 100% 0%, 98% 100%, 0 100%); 
}
.header .title-bg{
    background: rgba(0,0,0,.5);
}
.bg-none{
    background-color: rgba(0,0,0,.5);
    
}
.card:hover{
    transform: scale(1.1);
    transition: 0.3s;
}
.price{
    background-color:  rgba(255,255,255,.1);
}
.bg-company-darkblue{
        background-color: #1e272e;
} 

.header{
     margin-top: -95px;
}
.header .title-bg{
    background: rgba(0,0,0,.5);
}
.header .bg-cover1{
    background-size: cover;
    min-height: 600px;
}
.bg-none{
    background-color: rgba(0,0,0,.5);
    
}
.card:hover{
    transform: scale(1.1);
    transition: 0.3s;
}
.price{
    background-color:  rgba(255,255,255,.1);
}

</style>
