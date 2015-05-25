var isSupportTouch = "ontouchend" in document ? true : false,
    touchEv = isSupportTouch ? 'touchstart' : 'mousedown',
    touchEndEv = isSupportTouch ? "touchend" : 'mouseup';

$(function(){
	//初始
	var imgH = $(".mation").find("img").height(),chgNum = parseInt($("#slotChg").text()),
		n1,n2,n3,
		step = (imgH/10).toFixed(2),
		posArr = [];
	//数字位置
	for(var i=0;i<=9;i++){
		posArr[i] = step*i;
	}
	//开箱按钮状态
	var enableBtn = function(){
		$("#Jopen").show();
	}
	var disableBtn = function(){
		$("#Jopen").hide();
	}
	//重置 
	var resetSlot = function(){
		disableBtn();
		$("#slotDialog").hide();
		$("#slot-chest").find("img").attr("src","images/slotBox.png");
	}
	//随机滚动
	var autoMq = function(){
		resetSlot();
		setTimeout(function(){
		//随机三个数
			n1 = Math.round(Math.random()*9);
			n2 = Math.round(Math.random()*9);
			n3 = Math.round(Math.random()*9);
			var finPos_1 = posArr[n1],
				finPos_2 = posArr[n2],
				finPos_3 = posArr[n3];
			$("#mation-1").animate({"top":"-"+finPos_1+"px"},1000);
			$("#mation-2").animate({"top":"-"+finPos_2+"px"},1000);
			$("#mation-3").animate({"top":"-"+finPos_3+"px"},1000);
			$("#mation-1").attr("date-num",n1);
			$("#mation-2").attr("date-num",n2);
			$("#mation-3").attr("date-num",n3);
		}, 300);
		setTimeout(function(){
			enableBtn();
		}, 1300);
	}
	autoMq();
	//开箱
	$("#Jopen").on(touchEv,function(){
		chgNum--;
		if(chgNum>=0){
			document.getElementById("openAudio").play();
			$("#slot-tip").hide();
			$("#slot-chest").find("img").attr("src","images/slotBoxOpen.png");
			setTimeout(function(){
				$("#slotDialog").show();
			}, 1000);
		}else{
			disableBtn();
			alert("机会已经用完");
		}
	});
	//再来一局
	$("#J_again").on(touchEv,function(){
		autoMq();
		$("#slot-tip").show();
	});
	//手指滑
	var slotSwipe =function(obj,dir){
		var dNum =parseInt(obj.attr("date-num"));
		if(dir == "down"){
				dNum--;
				if(dNum < 0){
					return false;
				}
		}else if(dir == "up"){
          		dNum++;
				if(dNum > 9){
					return false;
				}
        }
        obj.attr("date-num",dNum);
		obj.animate({"top":"-"+posArr[dNum]+"px"},100);
	}
	
	//
	$("#mation-1,#mation-2,#mation-3").swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          slotSwipe($(this),direction); 
        },
        threshold:2
      });



});