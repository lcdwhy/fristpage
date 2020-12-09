//导航条点击事件
let slider = document.getElementById('slider')
slider.children[0].className = "active"

let currentIndex = 0
slider.onclick = function(e){
    let index = e.target.id
    currentIndex = parseInt(index)
    for(let i =0; i<this.children.length;i++){
        this.children[i].className ="gradient"
    }
    let btn = document.getElementById(index)
    btn.className = 'active'
}


//小图标随着图片变化
let index = 0;
let dots = document.getElementsByClassName('buttons')[0].children

dots[0].className = 'on'
function showCurrentDot () {
    for(let i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = "on";
    
}


//轮播图往左往右滚动
let wrap = document.querySelector(".wrap");
let next = document.querySelector(".arrow_right");
let prev = document.querySelector(".arrow_left");
next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
function next_pic () {
    let newLeft;
    if(wrap.style.left === "-4320px"){
        newLeft = -1440;
    }else{
        newLeft = parseInt(wrap.style.left)-720;
    }
    wrap.style.left = newLeft + "px";
    
    
    index++;
    if(index > 4){
        index = 0;
    }
    showCurrentDot();
}
function prev_pic () {
    let newLeft;
    if(wrap.style.left === "0px"){
        newLeft = -2880;
    }else{
        newLeft = parseInt(wrap.style.left)+720;
    }
    wrap.style.left = newLeft + "px";
    index--;
    if(index < 0){
        index = 4;
    }
    showCurrentDot();
}

for (var i = 0, len = dots.length; i < len; i++){
    (function(i){
        dots[i].onclick = function () {
            var dis = index - i;
            if(index == 4 && parseInt(wrap.style.left)!==-3600){
                dis = dis - 5;     
            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
            if(index == 0 && parseInt(wrap.style.left)!== -720){
                dis = 5 + dis;
            }
            wrap.style.left = (parseInt(wrap.style.left) +  dis * 720)+"px";
            index = i;
            showCurrentDot();
        }
    })(i);            
}


//设置定时器，轮播图播放
let timer = null;
function autoPlay () {
    timer = setInterval(function () {
        next_pic();
    },2000);
}
autoPlay();


//当鼠标停留在轮播图上的时候，停止定时器
let container = document.querySelector(".slide-container");
container.onmouseenter = function () {
    clearInterval(timer);
}
container.onmouseleave = function () {
    autoPlay();    
}

