var isSupportTouch = "ontouchend" in document ? true : false,
    touchEv = isSupportTouch ? 'touchstart' : 'mousedown',
    touchEndEv = isSupportTouch ? "touchend" : 'mouseup';
$(function(){
    /*返回顶部*/
    $("#toTop").click(function(){ $('html,body').animate({scrollTop: '0px'}, 500); });
    /*寻宝页面*/
    (function(){
        var $findList = $("#findList");
        //首次打开显示帮助提示
        var storage = window.localStorage,
            $findTip = $('#findTip');
        if (!storage.getItem("woFindJewel")) {
            $findTip.show();
        }
        $findTip.on(touchEv,function(){
            $findTip.hide();
            storage.setItem("woFindJewel",1);
        })
        //抽奖
        var $lastNum = $("#lastNum"),
            lastNum = Number($.trim($lastNum.val())),
            $magicNum = $("#magicNum"),
            magicNum = Number($.trim($magicNum.val())),
            $noJewelDialog = $('#noJewelDialog'),
            $getJewelDialog = $('#getJewelDialog');
        function openDialog(id){
            $('.popup-wrap').hide();
            var $dialogWrap= $(id),
                $dialog= $('.J_Popup',$dialogWrap),
                $close= $('.J_Close',$dialogWrap);
            $dialogWrap.show();
            $close.on(touchEv,function(e){
                e.preventDefault();
                e.stopPropagation(); 
                $findList.children('li').removeClass('on');
                $dialogWrap.hide(); 
            });
        }
        //寻宝
        function findJewel($li){
            var $this = $li,
                $loading = $this.children('.loading');
            $.ajax({
                url:'./data/find.json',
                type:'get',
                dataType:'json',
                beforeSend:function(){
                    $this.addClass('on');
                    $loading.show();
                },
                success:function(data){
                    if(data.status == 'fail'){ alert(data.msg); return; }
                    var result = data.data;
                    lastNum = result.lastNum;
                    $lastNum.val(lastNum);
                    magicNum = result.magicNum;
                    $magicNum.val(magicNum);
                    if(lastNum<=0){
                        $("#findTip").html('今日免费机会已用完，寻宝一次扣除<span>10魔法币</span>');
                    }
                    //如果魔法币不足 data.status='noMagic'
                    if(data.status=='noMagic'){
                        openDialog('#noMagicDialog');
                        return;
                    }
                    if(result.jewelNum>0){
                        $("#jewelNum").text(result.jewelNum);
                        openDialog('#getJewelDialog');
                    }else{
                        openDialog('#noJewelDialog');
                    }
                    $loading.hide();
                }
            });
        }
        $findList.on(touchEv,'li',function(){
            var $this = $(this);
            if(lastNum<=0){
                openDialog('#noFreeNumDialog');
                $("#noFreeNumDialog").on(touchEv,'.J_Find',function(){
                    $("#noFreeNumDialog").hide();
                    findJewel($this);
                })
                return;
            }
            if(lastNum<=0 && magicNum<10){
                openDialog('#noMagicDialog');
                return;
            }
            findJewel($this);
        });

        //分享
        var $shareBtn = $('.J_ShareBtn'),
            $shareBlk = $("#shareBlk");
        $shareBlk.on(touchEv,function(){ $(this).hide(); });
        $shareBtn.on(touchEv,function(){
            $shareBlk.show();
        });
//*********************辩宝石
        var eleBack = null, eleFront = null,eleList = $(".stone"),flip=false;//flip是否可以翻牌
        var $s1 = $("#stoneArea1"),$s2=$("#stoneArea2"),$s3=$("#stoneArea3"),
            posBox = $(".stone-list").offset().left,
            pos1 = $s1.offset().left-posBox,
            pos2 = $s2.offset().left-posBox,
            pos3 = $s3.offset().left-posBox;
        var chgNum = $("#chgNum").val();
        console.log(pos1);
        //确定坑位
        var rePos = function(){
            $(".identify-stone").css({"position":"absolute"});
            $s1.css({"left":pos1});
            $s2.css({"left":pos2});
            $s3.css({"left":pos3});

          //  $(".stone-list").height($(".identify-stone img").height()+60);
           // $(".identify-stone").height($(".identify-stone img").height()+40);

                            
       
            
        }
        rePos();
        //确定正面和背面
        var funBackOrFront = function() {
            eleList.each(function() {
                if ($(this).hasClass("out")) {
                    eleBack = $(this);
                } else {
                    eleFront = $(this);
                }
            });
        };
        funBackOrFront();
        //定义动画
        var funAnimate = {
            funMove_1:function(){
                setTimeout(function(){
                    $s1.animate({left:pos1},800);
                    $s2.animate({left:pos3},800);
                    $s3.animate({left:pos2},800);
                }, 1000);
                setTimeout(function(){
                        $s1.animate({left:pos2},700);
                        $s2.animate({left:pos3},700);
                        $s3.animate({left:pos1},700);
                }, 2000);
                setTimeout(function(){
                        $s1.animate({left:pos2},600);
                        $s2.animate({left:pos1},600);
                        $s3.animate({left:pos3},600);
                }, 2700);
                setTimeout(function(){
                        $s1.animate({left:pos3},500);
                        $s2.animate({left:pos2},500);
                        $s3.animate({left:pos1},500);
                }, 3300);
                setTimeout(function(){
                        $s1.animate({left:pos2},400);
                        $s2.animate({left:pos3},400);
                        $s3.animate({left:pos1},400);
                }, 3800);
                setTimeout(function(){
                        $s1.animate({left:pos1},300);
                        $s2.animate({left:pos3},300);
                        $s3.animate({left:pos2},300);
                }, 4200);
                setTimeout(function(){
                        $s1.animate({left:pos3},200);
                        $s2.animate({left:pos1},200);
                        $s3.animate({left:pos2},200);
                }, 4500);    
            },
            funMove_2:function(){
                setTimeout(function(){
                    $s1.animate({left:pos2},800);
                    $s2.animate({left:pos1},800);
                    $s3.animate({left:pos3},800);
                }, 1000);
                setTimeout(function(){
                        $s1.animate({left:pos2},800);
                        $s2.animate({left:pos3},800);
                        $s3.animate({left:pos1},800);
                }, 2000);
                setTimeout(function(){
                        $s1.animate({left:pos1},600);
                        $s2.animate({left:pos3},600);
                        $s3.animate({left:pos2},600);
                }, 2700);
                setTimeout(function(){
                        $s1.animate({left:pos1},400);
                        $s2.animate({left:pos3},400);
                        $s3.animate({left:pos2},400);
                }, 3300);
                setTimeout(function(){
                        $s1.animate({left:pos1},300);
                        $s2.animate({left:pos2},300);
                        $s3.animate({left:pos3},300);
                },3600);
                setTimeout(function(){
                        $s1.animate({left:pos3},300);
                        $s2.animate({left:pos2},300);
                        $s3.animate({left:pos1},300);
                }, 4000);
                setTimeout(function(){
                        $s1.animate({left:pos2},100);
                        $s2.animate({left:pos3},100);
                        $s3.animate({left:pos1},100);
                }, 4200); 
            },
            funMove_3:function(){
                setTimeout(function(){
                    $s1.animate({left:pos2},800);
                    $s2.animate({left:pos1},800);
                    $s3.animate({left:pos3},800);
                }, 1000);
                setTimeout(function(){
                        $s1.animate({left:pos2},700);
                        $s2.animate({left:pos3},700);
                        $s3.animate({left:pos1},700);
                }, 2000);
                setTimeout(function(){
                        $s1.animate({left:pos1},600);
                        $s2.animate({left:pos3},600);
                        $s3.animate({left:pos2},600);
                }, 2700);
                setTimeout(function(){
                        $s1.animate({left:pos1},500);
                        $s2.animate({left:pos3},500);
                        $s3.animate({left:pos2},500);
                }, 3300);
                setTimeout(function(){
                        $s1.animate({left:pos2},400);
                        $s2.animate({left:pos3},400);
                        $s3.animate({left:pos1},400);
                }, 3800);
                setTimeout(function(){
                        $s1.animate({left:pos3},300);
                        $s2.animate({left:pos2},300);
                        $s3.animate({left:pos1},300);
                }, 4100);
                setTimeout(function(){
                        $s1.animate({left:pos3},100);
                        $s2.animate({left:pos1},100);
                        $s3.animate({left:pos2},100);
                },4200);  
            }
        }
        //翻开是否有宝
        var isJewel =function($stone){
            //
            $.ajax({
                url:'./data/identify.json',
                type:'get',
                dataType:'json',
                success:function(data){
                    if(data.status == 'fail'){ alert(data.msg); return; }
                    var result = data.data;
                   // chgNum = result.chgNum;
                   // $("#chgNum").val(chgNum);
                    magicNum = result.magicNum;
                    if(result.jewelNum>0){
                       //中奖
                        $stone.eq(1).find("img").attr('src','images/stone-win.jpg');
                        openDialog('#getJewelDialog');
                    }else{
                        $stone.eq(1).find("img").attr('src','images/stone-lose.jpg');
                        openDialog('#noJewelDialog');
                    }
                }
            });

        };
        //设置牌面
        var setFlip =function(){
            $(".stone").each(function() {
                if ($(this).hasClass("out")) {
                    $(this).addClass("in").removeClass("out");
                }else{
                    $(this).addClass("out").removeClass("in");
                }
            }); 
            $("#JidentifyTip").hide();
            $("#identify-start").show();
        };
        //再来一局 重置
        var resetFlip =function(){
            $(".stone").each(function() {
                var i=$(this).index();
                if(i%2==0){
                     $(this).addClass("out").removeClass("in");
                    
                }else{
                    $(this).addClass("in").removeClass("out");
                } 
            }); 
            $(".stone").eq(3).find("img").attr('src','images/stone-win.jpg');
                var leftPos = [
                    $("#stoneArea1").css("left"),
                    $("#stoneArea2").css("left"),
                    $("#stoneArea3").css("left")];
                leftPos.sort();
                $("#stoneArea1").css("left",leftPos[0]);
                $("#stoneArea2").css("left",leftPos[1]);
                $("#stoneArea3").css("left",leftPos[2]);
            $("#JidentifyTip").hide();
            $("#identify-start").show();

        };
        //翻牌
        $(".identify-stone").on(touchEv, function() {
            if(flip){
                eleList = $(this).find(".stone");
                funBackOrFront();
                eleFront.addClass("out").removeClass("in");
                setTimeout(function() {
                    eleBack.addClass("in").removeClass("out");
                    funBackOrFront();
                }, 225);
                isJewel(eleList);
                return false;
            }
        });
        //再来一局
        $(".J_again").on(touchEv,function(e){
            e.preventDefault();
            e.stopPropagation(); 
            $(".icon-hand").remove();
            flip=false;
            resetFlip();
        });
        //开始
         $("#identify-start").on(touchEv, function() {
            //机会次数
            chgNum = $("#chgNum").val();
            if(chgNum<=0){
                openDialog('#noFreeNumDialog');
                return false;
            }else{
                chgNum--;
                $("#chgNum").val(chgNum);
                setFlip();
            setTimeout(function(){
                var n=Math.ceil(Math.random()*3);
                if(n>0){
                    var func = 'funMove_' + n;  
                }else{
                    n=Math.ceil(Math.random()*3);
                }
               funAnimate[func]();
            }, 100);
            //按钮隐藏 
            $(this).hide();
            $("#JidentifyTip").show();
            //手指出现
           setTimeout(function() {
               $(".identify-stone").append('<i class="icon-hand"></i>'); 

            }, 4500);
           setTimeout(function() {
                flip=true;
            }, 4800);
            }            
        });
    })();
});