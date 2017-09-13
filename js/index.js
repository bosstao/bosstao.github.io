window.onload = function () {
	headerScroll();
	cutDownTime();
	banner();
}
function headerScroll() {
	var navDom = document.querySelector('.jd_nav');
	var maxDistance = navDom.offsetTop + navDom.offsetHeight;
	var headerDom = document.querySelector('.jd_header');
	headerDom.style.backgroundColor = 'rgba(201,21,35,0)';
	window.onscroll = function () {
		var scrollDistance = window.document.body.scrollTop;
		var percent = scrollDistance / maxDistance;
		if (percent>1) {
			percent=1;
		}
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
	}
}


// 倒计时方法
function cutDownTime() {
	var totalHour = 3 ;
	var totalSec = 3*60*60;
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	var timeId = setInterval(function () {
		if (totalSec<=0) {
			clearInterval(timeId);
			return;
		}
		totalSec--;
		var hour = Math.floor(totalSec / 3600);
		var minute = Math.floor(totalSec % 3600 /60);
		var sec =totalSec % 60;
		liArr[0].innerHTML =Math.floor(hour/10) ; 
		liArr[1].innerHTML =hour%10 ; 
		liArr[3].innerHTML = Math.floor(minute/10);
		liArr[4].innerHTML = minute%10;
		liArr[6].innerHTML = Math.floor(sec/10); 
		liArr[7].innerHTML = sec%10; 
	},1000)
}
//轮播图
function banner() {
	var width = document.body.offsetWidth;
	var moveUl = document.querySelector('.banner_images');
	var indexLiArr = document.querySelectorAll('.banner_index li');
	var index = 1;
	var startTransition = function () {
		moveUl.style.transition = 'all .3s';
	}
	var endTransition = function () {
		moveUl.style.transition = '';
	}
	var setTransform = function (distance) {
		moveUl.style.transform = 'translateX('+distance+'px)';
	}
	var timeId = setInterval(function () {
		index++;
		startTransition();
		setTransform(index*width*-1);
	},1000);
	moveUl.addEventListener('webkitTransitionEnd',function () {
		if (index>8) {
			index = 1;
			endTransition();
			setTransform(index*width*-1);
		}else if(index<1){
			index= 8;
			endTransition();
			setTransform(index*width*-1);
		}
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		}
		indexLiArr[index-1].className = 'current';
	})
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	moveUl.addEventListener('touchstart',function (event) {
		clearInterval(timeId);
		endTransition();
		startX = event.touches[0].clientX;
	})
	moveUl.addEventListener('touchmove',function (event) {
		moveX = event.touches[0].clientX - startX;
		setTransform(moveX+index*-1*width);
	})
	moveUl.addEventListener('touchend',function (event) {
		var maxDistance = width/3;
		if (Math.abs(moveX)>maxDistance) {
			if (moveX>0) {
				index--;
			}else{
				index++;
			}
			startTransition();
			setTransform(index*-1*width);
		}else{
			startTransition();
			setTransform(index*-1*width);
		}
		timeId = setInterval(function () {
			index++;
			startTransition();
			setTransform(index*width*-1);
		},1000)
	})
}