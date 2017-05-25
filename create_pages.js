// create by vary
function create_pages(id,current_page,max_show=5){
    var total_q=$(id+"  li").length;//总数据
    var current_num=1;//当前页数
    var total_page= Math.ceil(total_q/current_page);//总页数
    //生成123456
    var str='';
    for(var i=1;i <= total_page;++i){
        str += "<a>"+i+"</a>";
    }
    $(id+' .page').html(str);
    $(id+' .page a').eq(0).addClass('bg');

    $(id+' .page a').click(function(){
        now=$(this).text();
        if(now==1 ){
            $(id+' .prev').css('color','#999');
            $(id+' .next').css('color','#555');
        }else if (now==total_page){
            $(id+' .prev').css('color','#555');
            $(id+' .next').css('color','#999');
        }else{
            $(id+' .prev').css('color','#555');
            $(id+' .next').css('color','#555');
        }
        $.each($(id+'  li'),function(index,item){
            var start = current_page* (now-1);//起始范围
            var end = current_page * now;//结束范围
            if(index >= start && index < end){//如果索引值是在start和end之间的元素就显示，否则就隐
                $(this).show();
            }else {
                $(this).hide();
            }
        });
        $(this).siblings().removeClass('bg');
        $(this).addClass('bg');
    });

    //下一页
    $(id+" .next").click(function(){
        $(id+' .page .bg').next().click();
    });
    //上一页方法
    $(id+" .prev").click(function(){
        $(id+' .page .bg').prev().click();
    });

    //生成页码
    $(id+' .page_box').click(function(event){
        // window.scrollTo(0,200);
        var has_bg=$(event.target);
        if(has_bg.hasClass('bg')){
            // console.log(id,total_q,total_page,max_show);
            if (total_page>(max_show+2)) {
                var djy=has_bg.text();//第几页
                var offset=Math.floor(max_show/2);//偏移
                var start=Number(djy)-Number(offset);//开始
                var end=Number(djy)+Number(offset);//结束
                // console.log(djy,offset,start,end);
                if (start>1 && end<total_page) {
                    console.log('中间');
                    $(id+' .page a').hide();
                    $(id+' .page span').remove();
                    $(id+' .page a').each(function(index,item){
                        if (index >= (start-1) && index < end) {
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                    if (start>2) {
                        $(id+' .page a:first-child').after('<span>...</span>');
                    };
                    if (end<(total_page-1)) {
                        $(id+' .page a:last-child').before('<span>...</span>');
                    };
                    $(id+' .page a:last-child').show();
                    $(id+' .page a:first-child').show();

                }else if(start<=1){
                    $(id+' .page span').remove();
                    $(id+' .page a').hide();
                    console.log('开始');
                    $(id+' .page a:lt('+Number(max_show+1)+')').show();
                    $(id+' .page a:last-child').before('<span>...</span>');
                    $(id+' .page a:last-child').show();
                }else if(end>=total_page){//最大便宜值超过了最大页
                    $(id+' .page span').hide();
                    $(id+' .page a').hide();
                    console.log('结束');
                    $(id+' .page a:eq(0)').show();
                    $(id+' .page a:eq(0)').after('<span>...</span>');
                    $(id+' .page a:gt('+(total_page-max_show-2)+')').show();
                }
            }

        }
    });
    //触发一次默认点击
    $(id+' .page .bg').click();
}
