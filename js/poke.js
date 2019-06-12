$(function () {
   let poke=[];
   let colorArr = ['s','h','d','c'];
   let box = $('.box');
   let flag ={};

   // for(let i= 0 ;i<52 ; i++){
   //     let index = Math.floor(Math.random() * colorArr.length);
   //     let color =colorArr[index];
   //     let number =Math.round(Math.random() *12+1);
   //
   //     while (flag[color+'_'+number]){
   //         index = Math.floor(Math.random()*colorArr.length);
   //         color =colorArr[index];
   //         number = Math.round(Math.random()*12+1);
   //
   //     }
   //     poke.push({color,number});
   //     flag[color+'_'+number]=true;
   // }

    while (poke.length<52){
        let index =Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number =Math.round(Math.random()*12+1);
        if(!flag[color+'_'+number]){
            poke.push({color,number});
            flag[color+'_'+number]=true;
        }
    }
/*
* 发牌
* （i,j）
* left : 350 -50*i +100*j
* top:100*i
* */
    let index=-1;
    for (let i=0;i<7;i++) {
        for(let j=0;j<=i;j++){
            index++;
            let obj =poke[index];
            let lefts=350-50*i+100*j , tops=50*i;
            $('<div>')
                .addClass('poke')
                .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*30)
                .animate({left:lefts,top:tops,opacity:0.95})
        }
    }

    for(;index<52;index++){
        let obj =poke[index];
        $('<div>')
            .addClass('poke')
            .addClass('left')
            .addClass('right')
            .css({backgroundImage:`url(./image/${obj.number}${obj.color}.jpg)`})
            .attr('id','-2_-2')
            .data('number',obj.number)
            .appendTo('.box')
            .delay(index*30)
            .animate({left:0,top:480,opacity:1})
    }

    $('.box').on('click','poke',function () {
        $(this).animate({top:'-=30px'})
    });


    /*
    * 选牌
    * */
    let first =null;
    box.on('click','.poke',function f() {
        let _this = $(this);
        let [i,j] = _this.attr('id').split("_");

        let id1 = i*1+1+'_'+j;
        let id2 = i*1+1+'_'+(j*1+1);

        if($('#'+id1).length||$('#'+id2).length){
            return ;
        }

        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'})
        }else{
            $(this).addClass('active').animate({top:'-=30px'})
        }

        // console.log(id1, id2);
        // console.log(i, j);


        //判断
        if(!first){
            first = _this;
        }else{
            let number1 = first.data('number');
            let number2 = _this.data('number');
            if(number1+number2===14){
                $('.active').animate({top:-200,left:360,opacity:0.4},function () {
                    $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=30'},function () {
                    $(this).removeClass('active');
                })
            }
            first =null;
        }
    });

    let n =0 ;
    $('.right').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('left').addClass('right');
        });
    });

});