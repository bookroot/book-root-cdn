var IndexObject={position:0,selectCategory:!0,selectSearchButton:!1,scrollLoading:!1,loadListFinish:!1,page:0,infoUrl:"/info/",scrollFunction:function(){document.body.scrollTop>20||document.documentElement.scrollTop>20?document.getElementById("myBtn").style.display="block":document.getElementById("myBtn").style.display="none"},noneNoData:function(){document.getElementById("zz-no-data").style.display="none"},blockNoData:function(){document.getElementById("zz-no-data").style.display="block"},noneNoMore:function(){document.getElementById("zz-no-more").style.display="none"},blockNoMore:function(){document.getElementById("zz-no-more").style.display="block"},getQueryVariable:function(name){let rs=new RegExp("(^|)"+name+"=([^&]*)(&|$)","gi").exec(window.document.location.href),tmp;return(tmp=rs)?tmp[2]:null},topic:function(category_uuid){let position=this.position;if(IndexObject.loadListFinish===!0)return;let data="";position==0?data="?category_uuid="+category_uuid+"&limit=12":data="?category_uuid="+category_uuid+"&limit=12&position="+position;let dataUrl="";if(IndexObject.selectSearchButton){let search_text=common.getParam("search");if(search_text===""||search_text===null)return common.showHint("warning","请输入搜索内容"),!1;dataUrl=common.baseUrl+"/api/v3/topic/search?title="+search_text+"&limit=12&page="+this.page}else dataUrl=common.baseUrl+"/api/v2/topic/list"+data;var xhr=new XMLHttpRequest;xhr.open("GET",dataUrl,!0),xhr.send(),xhr.onreadystatechange=function(){if(xhr.readyState!=4)return;xhr.readyState==4&&xhr.status==200&&IndexObject.canvasList(xhr),IndexObject.scrollLoading=!1}},search:function(){if(IndexObject.loadListFinish===!0){IndexObject.scrollLoading=!1;return}let search_text=common.getParam("search");if(search_text===""||search_text===null)return common.showHint("warning","请输入搜索内容"),IndexObject.scrollLoading=!1,!1;limit=common.getParam("limit"),limit||(limit=20),dataUrl=common.baseUrl+"/api/v3/topic/search?title="+search_text+"&limit="+limit+"&page="+this.page;var xhr=new XMLHttpRequest;xhr.open("GET",dataUrl,!0),xhr.send(),xhr.onreadystatechange=function(){if(xhr.readyState!=4)return;if(xhr.readyState==4&&xhr.status==200&&xhr.response){if(res=JSON.parse(xhr.response),IndexObject.noneNoData(),res.data.data==void 0)return IndexObject.blockNoMore(),IndexObject.loadListFinish=!0,!1;IndexObject.noneNoMore();let list=res.data.data;if(IndexObject.page=res.data.page,!res.data.data)return IndexObject.loadListFinish=!0,!1;console.log("啥玩意2？？？",list);var res,html=template("donate-template",{data:list});$("#search-list").append(html)}IndexObject.scrollLoading=!1}},canvasList:function(xhr){if(xhr.response){if(res=JSON.parse(xhr.response),IndexObject.noneNoData(),console.log("啥玩意？？？",res.data.data),res.data.data==void 0)return IndexObject.blockNoMore(),IndexObject.loadListFinish=!0,!1;IndexObject.noneNoMore();let list=res.data.data;if(IndexObject.position=res.data.position,!res.data.data)return IndexObject.loadListFinish=!0,!1;if(IndexObject.position==0){if(!res.data.data)return IndexObject.blockNoData(),!1;IndexObject.noneNoData();for(var res,content=`<div class="z-timeline">`,box,i=0;i<list.length;i++)content+=`<a class="all-a" href="/means/${list[i].Id}.html"><div class="list-item"><div class="list-item-title"><span>${list[i].Title}</span><span class="zz-tag">${list[i].CategoryDetail.CategoryName}</span></div><div class="list-item-info">${list[i].Keyword}</div></div></a>`;content+=`</div>`,box=document.getElementById("z-timeline-container"),box.innerHTML=content}else{for(var content=`<div class="z-timeline-second">`,i=0;i<list.length;i++)content+=`<a class="all-a"href="/means/${list[i].Id}.html"><div class="list-item"><div class="list-item-title"><span>${list[i].Title}</span><span class="zz-tag">${list[i].CategoryDetail.CategoryName}</span></div><div class="list-item-info">${list[i].Keyword}</div></div></a>`;content+=`</div>`,box=document.getElementById("z-timeline-container"),box.innerHTML=box.innerHTML+content}}},toInfoPage:function(TopicUuid){if(!TopicUuid)return common.showHint("warning","请输入内容索引"),!1;window.open(this.infoUrl+"/"+TopicUuid)},SetPosition:function(position){var positionGet=common.getParam("position");if(positionGet){this.position=positionGet;return}this.position=position},Init:function(category_uuid){window.onscroll=function(){IndexObject.scrollFunction();var bottom=common.getScrollHeight()-(common.getScrollTop()+common.getWindowHeight());if(bottom<=200){if(IndexObject.scrollLoading===!0){console.log("loading？？？");return}IndexObject.scrollLoading=!0,console.log("走这里边了吗？？？"),IndexObject.topic(category_uuid)}}},SearchInit:function(){window.onscroll=function(){IndexObject.scrollFunction();var bottom=common.getScrollHeight()-(common.getScrollTop()+common.getWindowHeight());if(bottom<=200){if(IndexObject.scrollLoading===!0){console.log("loading？？？");return}IndexObject.scrollLoading=!0,console.log("走这里边了吗？？？"),IndexObject.search()}}}}