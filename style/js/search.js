function getHotkeyword(e){$.ajax({type:"GET",url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",async:!0,data:{wd:e},dataType:"jsonp",jsonp:"cb",success:function(e){if($("#box ul").text(""),hotList=e.s.length){$("#box").css("display","block");for(var t=0;hotList>t;t++)$("#box ul").append("<li><span>"+(t+1)+"</span>"+e.s[t]+"</li>"),$("#box ul li").eq(t).click(function(){$("#txt").val(this.childNodes[1].nodeValue),window.open(thisSearch+this.childNodes[1].nodeValue),$("#box").css("display","none")}),0===t?($("#box ul li").eq(t).css({"border-top":"none"}),$("#box ul span").eq(t).css({color:"#fff",background:"#f54545"})):1===t?$("#box ul span").eq(t).css({color:"#fff",background:"#ff8547"}):2===t&&$("#box ul span").eq(t).css({color:"#fff",background:"#ffac38"})}else $("#box").css("display","none")},error:function(e){console.log(e)}})}$(function(){for(var e={data:[{name:"茶杯狐",background:"https://p.qlogo.cn/zc_icon/0/a48ed4731ef857ef4570b4af6ac8c5f216233263757814/0.png",url:"https://cupfox.app/search?key="},{name:"解析",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://www.mtosz.com/m3u8.php?url="},{name:"解析2",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://okjx.cc/?url="},{name:"解析3",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://jx.aidouer.net/?url="},{name:"解析4",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://jx.ppflv.com/?url="},{name:"解析5",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://jx.bozrc.com:4433/player/?url="},{name:"解析6",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://api.okjx.cc:3389/jx.php?url="},{name:"解析7",background:"https://byxiaorun.com/style/img/www.youtube.com.ico",url:"https://www.administratorw.com/video.php?url="}]},t=0;t<e.data.length;t++){var o='<li><i style="background: url('+e.data[t].background+') no-repeat center/cover;color: #3385ff";"></i><span>'+e.data[t].name+"</span></li>";$(".search-engine-list5").append(o)}$(".search-engine-list5 li").click(function(){var t=$(this).index(),o=$(this).children().attr("class"),s=$(this).children().attr("style");$("#search-icon").attr("class",o),$("#search-icon").attr("style",s),thisSearch=e.data[t].url,$(".search-engine").css("display","none"),storage.searchEngine=[thisSearch,o,s]})}),$(function(){for(var e={data:[{name:"美食",background:"https://byxiaorun.com/style/img/meishichina.com.ico",url:"https://home.meishichina.com/search/"},{name:"马蜂窝",background:"https://images.mafengwo.net/mobile/images/mfw-logo-new.png",url:"https://m.mafengwo.cn/mmobile/search/?keyword="},{name:"药品",background:"https://byxiaorun.com/style/img/drugs.dxy.cn.ico",url:"https://drugs.dxy.cn/search/drug?keyword="},{name:"翻译",background:"https://byxiaorun.com/style/img/bing.com.ico",url:"https://cn.bing.com/translator/?to=zh-Hans&text="},{name:"百科",background:"https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg",url:"https://baike.baidu.com/search/none?word="},{name:"B站",background:"https://byxiaorun.com/style/img/bilibili.com.ico",url:"http://search.bilibili.com/all?keyword="},{name:"抖音",background:"https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin/search/public/favicon.ico",url:"https://www.douyin.com/search/"},{name:"参数",background:"https://www.zol.com.cn/favicon.ico",url:"https://detail.zol.com.cn/index.php?c=SearchList&keyword="},{name:"豌豆荚",background:"https://img.ucdl.pp.uc.cn/upload_files/wdj_web/public/img/favicon.ico",url:"https://m.wandoujia.com/search?key="},{name:"高德",background:"https://m.amap.com/img/favicon.ico",url:"https://ditu.amap.com/search?query="},{name:"Gov",background:"https://byxiaorun.com/style/img/gov.cn.ico",url:"https://www.bing.com/search?q=site%3Agov.cn+"},{name:"天眼查",background:"https://byxiaorun.com/style/img/tianyancha.com.ico",url:"https://www.tianyancha.com/search?key="}]},t=0;t<e.data.length;t++){var o='<li><i style="background: url('+e.data[t].background+') no-repeat center/cover;color: #3385ff";"></i><span>'+e.data[t].name+"</span></li>";$(".search-engine-list4").append(o)}$("#search-icon, .search-engine").hover(function(){$(".search-engine").css("display","block")},function(){$(".search-engine").css("display","none")}),$(".search-engine-list4 li").click(function(){var t=$(this).index(),o=$(this).children().attr("class"),s=$(this).children().attr("style");$("#search-icon").attr("class",o),$("#search-icon").attr("style",s),thisSearch=e.data[t].url,$(".search-engine").css("display","none"),storage.searchEngine=[thisSearch,o,s]})});var now,resLength,listIndex,hotList,thisSearch,thisSearchIcon,storage,ssData;!function(){function e(e,t,o){var s,a=document.getElementsByClassName(e),c=document.getElementsByClassName(t),n=window.innerHeight||document.body.clientHeight;for(s=6;s<a.length;s++)o>=n&&"pc"===deviceVal?(a[s].style.display="none",c[0].style.marginTop="5px"):(a[s].style.display="block",c[0].style.marginTop="0px")}window.onresize=function(){e("i-link-box","linkList-item",845)},window.onload=function(){e("i-link-box","linkList-item",845)},window.ShowHideElement=e}(),now=-1,resLength=0,listIndex=-1,hotList=0,thisSearch="https://quark.sm.cn/s?q=",thisSearchIcon="./logo.jpg",storage=window.localStorage,storage.stopHot||(storage.stopHot=!0),"false"==storage.stopHot?$("#hot-btn").attr("class","iconfont icon-kaiguan-guan"):$("#hot-btn").attr("class","iconfont icon-kaiguanguan-kai"),ssData=storage.searchEngine,void 0!=storage.searchEngine&&(ssData=ssData.split(","),thisSearch=ssData[0],$("#search-icon").attr("class",ssData[1]),$("#search-icon").attr("style",ssData[2])),$("#txt").keyup(function(e){if($(this).val()){if(38==e.keyCode||40==e.keyCode||"true"!=storage.stopHot)return;$("#search-clear").css("display","block"),getHotkeyword($(this).val())}else $("#search-clear").css("display","none"),$("#box").css("display","none")}),$("#txt").keydown(function(e){var t;40===e.keyCode&&(listIndex===hotList-1?listIndex=0:listIndex++,$("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current"),t=$("#box ul li").eq(listIndex)[0].childNodes[1].nodeValue,$("#txt").val(t)),38===e.keyCode&&(e.preventDefault&&e.preventDefault(),e.returnValue&&(e.returnValue=!1),0===listIndex||-1===listIndex?listIndex=hotList-1:listIndex--,$("#box ul li").eq(listIndex).addClass("current").siblings().removeClass("current"),t=$("#box ul li").eq(listIndex)[0].childNodes[1].nodeValue,$("#txt").val(t)),13===e.keyCode&&(window.open(thisSearch+$("#txt").val()),$("#box").css("display","none"),$("#txt").blur(),$("#box ul li").removeClass("current"),listIndex=-1)}),$("#search-clear").click(function(){$("#txt").val(""),$("#search-clear").css("display","none"),$("#box").css("display","none")}),$("#txt").focus(function(){$(".search-box").css("box-shadow","0 4px 6px #0000001f"),$(".search-box").css("border","1px solid #cecece"),$(this).val()&&"true"==storage.stopHot&&getHotkeyword($(this).val())}),$("#txt").blur(function(){$(".search-box").css("box-shadow","0 2px 3px #0000000f"),$(".search-box").css("border","1px solid #00000026"),setTimeout(function(){$("#box").css("display","none")},400)}),$(function(){var e,t,o={data:[{name:"必应",background:"https://byxiaorun.com/style/img/bing.com.ico",url:"https://www.bing.com/search?q="},{name:"微信",background:"https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png",url:"https://weixin.sogou.com/weixinwap?type=2&query="},{name:"国搜",background:"https://m.chinaso.com/favicon.ico",url:"https://www.chinaso.com/newssearch/all/allResults?q="},{name:"搜狗",background:"https://m.sogou.com/images/logo/favicon.ico",url:"https://www.sogou.com/web?query="},{name:"f搜",background:"https://static.hetaousercontent.com/static/assets/apple-touch-icon.png",url:"https://fsoufsou.com/search?q="},{name:"Ecosia",background:"https://byxiaorun.com/style/img/ecosia.org.ico",url:"https://www.ecosia.org/search?q="},{name:"Qwant",background:"https://byxiaorun.com/style/img/qwant.com.ico",url:"https://www.qwant.com/?q="},{name:"谷歌",background:"https://byxiaorun.com/style/img/www.google.com.ico",url:"https://www.google.com/search?q="},{name:"Ask",background:"https://byxiaorun.com/style/img/www.ask.com.ico",url:"https://www.ask.com/web?q="},{name:"duckgo",background:"https://byxiaorun.com/style/img/duckduckgo.com.ico",url:"https://duckduckgo.com/?q="},{name:"百度",background:"https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg",url:"https://www.baidu.com/s?tn=baidubig5&wd="},{name:"四搜",background:"https://byxiaorun.com/style/img/gobaidugle.com.ico",url:"https://www.gobaidugle.com/search4?num=&one=bing&two=toutiao&three=sogou&four=so&keyword="}]};for(e=0;e<o.data.length;e++)t='<li><i style="background: url('+o.data[e].background+') no-repeat center/cover;color: #3385ff";"></i><span>'+o.data[e].name+"</span></li>",$(".search-engine-list").append(t);$("#search-icon, .search-engine").hover(function(){$(".search-engine").css("display","block")},function(){$(".search-engine").css("display","none")}),$("#hot-btn").on("click",function(){"true"==storage.stopHot?($(this).attr("class","iconfont icon-kaiguanguan-guan"),storage.stopHot=!1):(storage.stopHot=!0,$(this).attr("class","iconfont icon-kaiguanguan-kai")),console.log(storage.stopHot)}),$(".search-engine-list li").click(function(){var e=$(this).index(),t=$(this).children().attr("class"),s=$(this).children().attr("style");$("#search-icon").attr("class",t),$("#search-icon").attr("style",s),thisSearch=o.data[e].url,$(".search-engine").css("display","none"),storage.searchEngine=[thisSearch,t,s]})}),$(function(){for(var e={data:[{name:"吾爱",background:"https://www.52pojie.cn/favicon.ico",url:"http://zhannei.baidu.com/cse/site?cc=52pojie.cn&q="},{name:"卡饭",background:"https://byxiaorun.com/style/img/kafan.cn.ico",url:"https://www.bing.com/search?q=site%3Abbs.kafan.cn+"},{name:"恩山",background:"https://byxiaorun.com/style/img/www.right.com.cn.ico",url:"https://www.bing.com/search?q=site%3Aright.com.cn+"},{name:"贴吧",background:"https://android-artworks.25pp.com/fs08/2020/03/09/8/110_02646e724df1b9a04dca4c91f52b7e50_con_130x130.png",url:"http://tieba.baidu.com/f/search/res?ie=utf-8&qw="},{name:"NGA",background:"https://bbs.nga.cn/favicon.ico",url:"https://www.bing.com/search?q=site%3Anga.cn+"},{name:"汽车",background:"https://byxiaorun.com/style/img/m.autohome.com.cn.ico",url:"https://sou.m.autohome.com.cn/zonghe?q="},{name:"V2ex",background:"https://byxiaorun.com/style/img/v2ex.com.ico",url:"https://www.sov2ex.com/?q="},{name:"掘金",background:"https://byxiaorun.com/style/img/juejin.cn.ico",url:"https://juejin.im/search?query="},{name:"博客园",background:"https://byxiaorun.com/style/img/news.cnblogs.com.ico",url:"https://zzk.cnblogs.com/s/blogpost?w="},{name:"看雪",background:"https://byxiaorun.com/style/img/bbs.pediy.com.ico",url:"https://www.bing.com/search?q=site%3Abbs.pediy.com+"},{name:"远景",background:"https://byxiaorun.com/style/img/www.pcbeta.com.ico",url:"https://www.bing.com/search?q=site%3Abbs.pcbeta.com+"},{name:"赚吧",background:"https://byxiaorun.com/style/img/www.zuanke8.com.ico",url:"https://s.ip21.cn/zuanke8/?q="}]},t=0;t<e.data.length;t++){var o='<li><i style="background: url('+e.data[t].background+') no-repeat center/cover;color: #3385ff";"></i><span>'+e.data[t].name+"</span></li>";$(".search-engine-list3").append(o)}$("#search-icon, .search-engine").hover(function(){$(".search-engine").css("display","block")},function(){$(".search-engine").css("display","none")}),$(".search-engine-list3 li").click(function(){var t=$(this).index(),o=$(this).children().attr("class"),s=$(this).children().attr("style");$("#search-icon").attr("class",o),$("#search-icon").attr("style",s),thisSearch=e.data[t].url,$(".search-engine").css("display","none"),storage.searchEngine=[thisSearch,o,s]})}),$(function(){for(var e={data:[{name:"知乎",background:"https://byxiaorun.com/style/img/zhihu.com.ico",url:"https://www.zhihu.com/search?type=content&q="},{name:"本地宝",background:"https://byxiaorun.com/style/img/bendibao.com.ico",url:"http://zhannei.baidu.com/cse/site?cc=bendibao.com&q="},{name:"简书",background:"https://cambrian-images.cdn.bcebos.com/33a4057673374d6ad1bbc9811310770d_1559717439091.jpeg",url:"https://www.jianshu.com/search?q="},{name:"张大妈",background:"https://search.smzdm.com/favicon.ico",url:"https://search.m.smzdm.com/?s="},{name:"小红书",background:"https://pp.myapp.com/ma_icon/0/icon_10868231_1605598327/96",url:"http://zhannei.baidu.com/cse/site?cc=xiaohongshu.com&q="},{name:"微博",background:"https://weibo.cn/favicon.ico",url:"https://s.weibo.com/weibo/"},{name:"中医药",background:"https://byxiaorun.com/style/img/dayi.org.cn.ico",url:"https://m.dayi.org.cn/search?keyword="},{name:"医百科",background:"https://www.wiki8.cn/favicon.ico",url:"https://www.wiki8.cn/search?q="},{name:"GitHub",background:"https://s.cn.bing.net/th?id=OJ.b4JIBX4qc40CKw&pid=MsnJVFeeds&w=41&h=41",url:"https://github.com/search?utf8=✓&q="},{name:"OS",background:"https://byxiaorun.com/style/img/www.oschina.net.ico",url:"https://www.oschina.net/search?q="}]},t=0;t<e.data.length;t++){var o='<li><i style="background: url('+e.data[t].background+') no-repeat center/cover;color: #3385ff";"></i><span>'+e.data[t].name+"</span></li>";$(".search-engine-list2").append(o)}$("#search-icon, .search-engine").hover(function(){$(".search-engine").css("display","block")},function(){$(".search-engine").css("display","none")}),$(".search-engine-list2 li").click(function(){var t=$(this).index(),o=$(this).children().attr("class"),s=$(this).children().attr("style");$("#search-icon").attr("class",o),$("#search-icon").attr("style",s),thisSearch=e.data[t].url,$(".search-engine").css("display","none"),storage.searchEngine=[thisSearch,o,s]})});