<template>
    <div >
        <div class="footer bg-company-darkblue text-white  ">
            <div class="container-fluid ">
                <div class="row d-flex align-items-start  ">
                    <div class="col-md-3">
                <h1>夢想音樂</h1>
               </div>
                <div class="col-md-2">
                <ul>
                    <small><li class="text-secondary mb-2 pt-3">公司簡介</li></small>
                    <li class="mb-3">
                    <router-link to="/home">關於我們</router-link></li>    
                </ul>
            </div>
            <div class="col-md-2">
                <ul>
                    <small><li class="text-secondary mb-2 pt-3">產品內容</li></small>
                    <li class="mb-3"><router-link to="/store">周邊商品</router-link></li>
                </ul>
            </div>
            <div class="col-md-2">
                
                <ul>
                    <small><li class="text-secondary mb-2 pt-3">常用連結</li></small>
                    <li class="mb-3"><a href="https://www.youtube.com" target="_blank">Youtube頻道</a></li>
                    <li class="mb-3"><a href="https://www.youtube.com/watch?v=HQDDlgGy2hg" target="_blank">音樂播放清單</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <div class="link">
                    <ul class="d-flex pt-3 justify-content-end">
                        <li><a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook fa-2x mr-4"></i></a></li>
                        <li><a href="https://www.intagram.com" target="_blank"><i class="fab fa-instagram fa-2x mr-4"></i></a></li>
                        <li><a href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter-square fa-2x "></i></a></li>
                    </ul>
                </div>
                <div class="mt-5 text-right" id="contactInfor">
                    <p>地址：台北市00街00巷00號</p>
                    <p>電話：(02)2821-0000</p>
                </div>
            </div>
        </div>
        <small><p class="text-secondary text-center mb-0">@Copyright by 夢想音樂 2020</p></small>
    </div>
</div>

    </div>
</template>

<style scoped>
.footer ul{
    list-style-type: none;
    list-style-position: outside;   
}
.footer a{
    text-decoration: none;
    color: #fff;
}
.footer a:hover{
    text-decoration: none;
    color: orangered;
    
}
.footer{
    background-color: 	#00DDDD;
    margin-top: 60px;
}
</style>