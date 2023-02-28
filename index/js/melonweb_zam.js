var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

//:::::::::zam적용 start ::::::::::::
var zamLoginPropertyCheck = function(id, pwd, saveId){
	//zam로그인 프러퍼티 확인
	$.ajax({
		 type : 'GET'
		,url : '/gnb/getZamLoginProperty.json'
	}).done(function(response) {
		var useZamLogin = response.useZamLogin;

		if(typeof NetFunnel != "object"){
			useZamLogin = false;
		}
		
		if(useZamLogin){
			
			//zam로그인용 css적용
			if($('link[href="/resource/style/web/common/melonweb_waiting.css"]').length == 0){
				$('head').append('<link rel="stylesheet" href="/resource/style/web/common/melonweb_waiting.css" type="text/css" />');	
			}
			
			var zamPopHtml  = '<div class="wating" id="NetFunnel_Skin_Top" style="display:block">';
			zamPopHtml += 	'<div class="wating_backdrop"></div>';
			zamPopHtml += 	'<div class="wating_inner" id="" style="z-index:50000">';
			zamPopHtml += 		'<div class="wating_header">로그인 대기중 <a href="#" onclick="NetFunnel.countdown_stop();" class="wating_close">닫기</a></div>';
			zamPopHtml += 		'<div class="wating_body">';
			zamPopHtml += 			'<p class="wating_txt subtit">접속자 증가로 인해 로그인 대기중 입니다. <br/> ';
			zamPopHtml += 				'새로고침 시, 대기순서가 늘어날 수 있습니다. <br/>';
			zamPopHtml += 				'입장 가능한 대기순서까지 꼭 기다려 주세요. </p>';
			zamPopHtml += 			'<p class="wating_txt accent">';
			zamPopHtml += 				'대기순서:  <strong id="NetFunnel_Loading_Popup_Order">0번</strong> (총 <strong id="NetFunnel_Loading_Popup_Total_Count">0명</strong>) <br />';
			zamPopHtml += 				'예상 대기시간:   <strong id="NetFunnel_Loading_Popup_TimeLeft">0분 0초</strong>';
			zamPopHtml += 			'</p>';
			zamPopHtml += 			'<p class="wating_txt small">최선을 다하는 멜론이 되겠습니다.</p>';
			zamPopHtml += 		'</div>';
			zamPopHtml += 	'</div>';
			zamPopHtml += '</div>';
			
			if(typeof NetFunnel == "object"){
				NetFunnel.SkinUtil.add('mwlogin',{
					prepareCallback:function(){
						 var NLPTC = document.getElementById("NetFunnel_Loading_Popup_Total_Count"); 
						 NLPTC.innerHTML="0명";
					}, 
					updateCallback:function(percent,nwait,totwait,timeleft){
						var NLPTC = document.getElementById("NetFunnel_Loading_Popup_Total_Count");
						 $('#NetFunnel_Loading_Popup_Total_Count').html(totwait + "명");
						 $('#NetFunnel_Loading_Popup_Order').html(nwait+ "명");
					},
					htmlStr: zamPopHtml
				},'normal');
			} 
			
			NetFunnel_Action({},{
				success:function(ev,ret){
					zamLoginSubmit(id, pwd, saveId);
				}
			});
			
		}else{
			zamLoginSubmit(id, pwd, saveId);
		}
	}).fail(function(){
		zamLoginSubmit(id, pwd, saveId);
	});	
}

var zamLoginSubmit= function(id, pwd, saveId){
	var loginFrm = $('<form method="post" name="gnbLoginFrm"></form>');
	loginFrm.appendTo('body');
	var returnURL = document.location.href;
	returnURL = encodeURIComponent(returnURL);
	
	var loginRSA;
	try {
		loginRSA = new AuthRSA();
		
		loginRSA.execute(function(p,e){
			loginFrm.append('<input type="hidden" id="memberId" name="memberId" value="'+loginRSA.encrypt(id)+'">');
			loginFrm.append('<input type="hidden" id="memberPwd" name="memberPwd" value="'+loginRSA.encrypt(pwd)+'">');
			loginFrm.append('<input type="hidden" id="publicKey" name="publicKey" value="'+p+'">');
			loginFrm.append('<input type="hidden" id="saveId" name="saveId" value="'+saveId+'">');
			loginFrm.prop("action" ,"https://web.archive.org/web/20190701083627/https://member.melon.com/muid/web/login/login_informProcs.htm?returnPage="+returnURL);
			loginFrm.submit();
			return;
		});
	} catch(e) {
		loginFrm.append('<input type="hidden" id="memberId" name="memberId" value="'+id+'">');
		loginFrm.append('<input type="hidden" id="memberPwd" name="memberPwd" value="'+pwd+'">');
		loginFrm.append('<input type="hidden" id="saveId" name="saveId" value="'+saveId+'">');
		loginFrm.prop("action" ,"https://web.archive.org/web/20190701083627/https://member.melon.com/muid/web/login/login_informProcs.htm?returnPage="+returnURL);
		loginFrm.submit();
		return;
	}
}

//:::::::::zam적용 end ::::::::::::

}
/*
     FILE ARCHIVED ON 08:36:27 Jul 01, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:02:10 Feb 27, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 288.124
  exclusion.robots: 0.092
  exclusion.robots.policy: 0.085
  RedisCDXSource: 1.268
  esindex: 0.006
  LoadShardBlock: 124.197 (3)
  PetaboxLoader3.resolve: 204.006 (2)
  PetaboxLoader3.datanode: 74.079 (4)
  load_resource: 179.315
*/