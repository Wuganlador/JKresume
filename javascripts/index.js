// jquery.fullPage 全屏滚动插件设置
$(function(){
    $('#dowebok').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#febc59', '#6cced6','#FF6666','#FFF'],
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90','#FF6666','#FFF'],
        //#7BAABE  #f90 橘黄色  #C2C7CA  #6cced6 febc59
        'navigation': true,

        afterLoad: function(anchorLink, index){
            if(index == 2){
                $('.section2').find('#about_list_content').delay(500).animate({
                    left: '0'
                }, 1500, 'easeOutExpo');         
                // 改变英文标题的 透明度动画
                $("#about_content .title_en").animate({opacity:"1"},2000);
            }
            if(index == 3){
                $('.section3').find('#skill_list').delay(500).animate({
                    left: '0'
                }, 1500, 'easeOutExpo');
                

                $("#skill_content .title_en").animate({opacity:"1"},2000);
            }
            if(index == 4){
                $("#exp_content .title_en").animate({opacity:"1"},2000);
            }
            if(index == 5){
                $('.section5').find('#demo_content_list').fadeIn(3000);
                $("#demo_content .title_en").animate({opacity:"1"},2000);
            }
            if(index == 6){
                 $('.section3').find('#contact_content_list').delay(500).animate({
                    bottom: '0'
                }, 1500, 'easeOutExpo');
                $("#contact_content .title_en").animate({opacity:"1"},2000);
            }
        },
        onLeave: function(index, direction){
            if(index == '2'){
                $('.section2').find('#about_list_content').delay(50).animate({
                    left: '-120%'
                }, 1500, 'easeOutExpo');
                $("#about_content .title_en").animate({opacity:"0"},10);
            }
            if(index == '3'){
                $('.section3').find('#skill_list').delay(50).animate({
                    left: '+120%'
                }, 1500, 'easeOutExpo');
                
                $("#skill_content  .title_en").animate({opacity:"0"},10);
            }
            if(index == '4'){
                $("#exp_content .title_en").animate({opacity:"0"},10);
            }
            if(index == '5'){
                $('.section5').find('#demo_content_list').fadeOut(30);
                $("#demo_content .title_en").animate({opacity:"0"},10);
            }
            if(index == '6'){
                $('.section3').find('#contact_content_list').delay(50).animate({
                    bottom: '-120%'
                }, 1500, 'easeOutExpo');
                $("#contact_content .title_en").animate({opacity:"0"},10);
            }
        }

    });
});


$(document).ready(function(){
    //顶部标题文字切换
	$("#header_p").mouseover(function(){
		$("#header_p1").html("Resume");
		$("#header_p2").html("前端工程师");
	}).mouseout(function(){
		$("#header_p1").html("F2E");
		$("#header_p2").html("个人简历");	
	});
    //顶部导航取消
	$("header nav a:not(':first')").click(function(){
		alert("正在努力建设中...请稍等");
		return false;
	});

    // page1 头像切换
	$("#home_photo2").hover(function(){
		$(this).fadeTo(800,1);
		},function(){
			$(this).stop(true,false).fadeTo(800,0);
	});

    // page5
    $(".md-trigger").click(function(){
        alert("正在努力建设中...请稍等");
        return false;
    });

})






//page4 图片轮播
window.onload = function () {
    var container = document.getElementById('exp_list_slider_content');
    var list = document.getElementById('exp_list_content');
    var buttons = document.getElementById('exp_list_buttons').getElementsByTagName('span');
    var prev = document.getElementById('exp_list_toleft');
    var next = document.getElementById('exp_list_toright');

    var index = 1; 

    // 添加一个优化的标记，检测是否执行动画,避免无论任何情况下一直执行动画，消耗内存
    var animated = false;
    
    function animate(offset){

        animated = true;

        var newLeft = parseInt(list.style.left) + offset;     
        var time = 300; //位移总周期
        var interval = 10; //每次位移间隔时间
        var speed = offset/(time/interval); //每次位移长度 = 位移长度 / 位移次数 

        // go函数是animate内的一个函数，这里是运动过度动画效果
        // 递归函数，递归就是本身调用自己。
        function go(){
            // 检测
            //  1.如果speed > 0 && parseInt(list.style.left) < left ，向左运动
            //  2.speed < 0 && parseInt(list.style.left) > left     ，向右运动
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            }
            // 运动动画达到目标值后，停止
            else {
                animated = false;
                list.style.left = newLeft + 'px';
                if (newLeft > 0) {
                    list.style.left = -1800 + 'px';
                }
                if (newLeft < -1800) {
                  list.style.left = 0 + 'px';
                }
            }
        }
        go();
    }
    //图片下标圆点提醒和图片位置对应。
    function showButton() {
        // 清除之前留下的小圆点样式
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        // buttons数组的on对应样式，哪个图片的提示小圆点变橙色
        // buttons是数组下标从0开始所以这里减一
        buttons[index - 1].className = 'on';
    }
    for (var i = 0; i < buttons.length; i++) {
        //哪个提示小圆点被单击了 
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if(this.className == 'on') {
                return;
            }
            // 获取当前提示小圆点的index属性值
            var myIndex = parseInt(this.getAttribute('index'));

            // 当前提示小圆点的index属性值 减去 正在显示的index属性值
            var offset = -900 * (myIndex - index);

             animate(offset);
            
            // 更新index
            index = myIndex;
            // 显示提示圆点样式
            showButton();
        }
    }

    //单击 > 右滚动图标
    next.onclick = function () {

        if (animated) {
            return;
        }
        //优化，如果是单击本图片对应的提示小圆点就不做任何操作
        if (index == 3) {
            index = 1;
        }
        else {
            index += 1;
        }        
        animate(-900);  
        showButton();
    }
    //单击 < 左滚动图标
    prev.onclick = function () {
        if (animated) {
            return;
        }       
        if (index == 1) {
            index = 3;
        }
        else {
            index -= 1;
        }   
        animate(900);       
        showButton();
    }
    // 自动播放图片
    function play(){
        // 上面已经用了一个定时器setTimeout
        // 这里我们另外用一个定时器setInterval
        timer = setInterval(function(){
            next.onclick();
        },3000);
    }
    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();
}
