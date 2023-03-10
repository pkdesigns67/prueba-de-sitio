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



/**
 * 쿠키 설정
 * @param name
 * @param value
 * @param expires
 * @param path
 * @param domain
 */
function setCookie(name, value, expires, path, domain) {
	if(expires==null || expires==""){
		document.cookie = name + "=" + escape(value) + ";" + "path=" + path + ";domain=" + domain;
	}else{
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expires);
		document.cookie = name + "=" + escape(value) + ";" + "path=" + path + ";domain=" + domain + ";expires=" + todayDate.toGMTString();
	}
}

/**
 * 실명인증 쿠키 설정
 * @param name
 * @param value
 * @param expires
 * @param path
 * @param domain
 */
function setRealCookie(name, value) {
	document.cookie = name + "=" + escape(value) + ";path=/;domain=.melon.com";
}

/**
 * 쿠기 찾기
 * @param Name
 * @returns
 */
function getCookie(Name) {
	var i,x,y,arrayCookies=document.cookie.split(";");
	for (i=0;i<arrayCookies.length;i++){
		x=arrayCookies[i].substr(0,arrayCookies[i].indexOf("="));
		y=arrayCookies[i].substr(arrayCookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==Name){
			return unescape(y);
		}
	}
	return '';
}

function getDomainUrl(url){
	if(url==undefined || url=="" || url==null){
		url = document.location.href;
	}
	var objVal = url;
	var patt = /(http(s)?:\/\/)(([a-zA-Z][-a-zA-Z0-9]*)([.][a-zA-Z][-a-zA-Z0-9]*){0,3}||([0-9]{1,3}([.][0-9]{1,3}){3}))/gi;
	var pattResult = /[^(http(s)?:\/\/)]\S+(\.[^(\n|\t|\s|\/))]+)+/gi;
	 
	var sResult = objVal.replace(patt,"");
	sResult = objVal.replace(sResult,"");
	sResult = (sResult.match(pattResult));
	return sResult;
}

function resetCookie(pocId){
	var locationURL = document.location.href;
	if(getMelonCash()=="SIMPLE_COOKIE" && (pocId=='WP10' || pocId=='LP10' || pocId=='MP10' || pocId=='XXXX') && getDomainUrl()!="kpop.melon.com" && !(locationURL.indexOf("login_informProcs")>=0 || locationURL.indexOf("loginlayer_informProcs")>=0 || locationURL.indexOf("loginpopup_informProcs")>=0)){
		$.ajax({
			type: "POST",
            url: "/muid/web/login/login_cook.json",
            data: {},
            dataType:"json",
            async : false,
            success: function(data) {
    			if(data.MAC!=undefined){
    				setCookie("MAC", data.MAC, "", "/", ".melon.com");
    				setCookie("MUG", data.MUG, "", "/", ".melon.com");
    				setCookie("MHC", data.MHC, "", "/", ".melon.com");
    				setCookie("MUAC", data.MUAC, "", "/", ".melon.com");
    				setCookie("MUNIK", data.MUNIK, "", "/", ".melon.com");
    				setCookie("MLCP", data.MLCP, "", "/", ".melon.com");
    				setCookie("keyCookie", data.KEYCOOKIE);
    			}
            }
       });
	}
}

/**
 * 멜론 로그인 여부
 * @returns {Boolean}
 */
function isMelonLogin() {
    var memberKey = getMUACHeaderCookie("memberKey");
    if (memberKey == "undefined" || memberKey == undefined || memberKey.length <= 0) return false;
    return true;
}

function getMACHeaderCookie(){
	return getCookie('MAC');
}

/**
 * 회원키
 * @returns
 */
function getMemberKey() {
    return getMUACHeaderCookie("memberKey");
}

/**
 * 회원아이디
 * @returns
 */
function getMemberId() {
	return getMHCHeaderCookie("memberId");
}

/**
 * 회원닉네임
 * @returns
 */
function getMemberNickName() {
	var strBuf = unescape(decodeURIComponent(Base64.decode(getCookie("MUNIK")).replace(/\+/g, " ")));
    if (strBuf == null) return null;

    var arrStr = strBuf.split(";");
    if(arrStr[0]==null || arrStr[0]==""){
    	return "닉네임 없음";
    }
    return arrStr[0];
}

/**
 * 회원나이
 * @returns
 */
function getMemberAge() {
    return getMUACHeaderCookie("memberAge");
}

/**
 * 회원성별
 * @returns
 */
function getMemberSex() {
	return getMUACHeaderCookie("memberSex");
}

/**
 * 회원임시비밀번호여부
 * @returns
 */
function getMemberTempPwdYn() {
	return getMUACHeaderCookie("memberTempPwdYn");
}

/**
 * 회원생년원일
 * @returns {String}
 */
function getMemberBirthDay() {
    var age = getMUACHeaderCookie("memberAge");
    var curDate = new Date();
    var year = curDate.getYear();
    var birth = year - age + 1;
    return birth + "0101";
}

/**
 * 회원 성인여부
 * @returns {String} : 0:미성년자, 1:성인 실명인증, 2:성인 실명미인증
 */
function isMemberAdult() {
    var memberAge = getMUACHeaderCookie("memberAge");
    var realNameYn = getMUACHeaderCookie("realNameYn");
    if (memberAge < 19) {
        return "0";
    } else if (memberAge >= 19 && realNameYn == "Y") {
        return "1";
    } else if (memberAge >= 19 && realNameYn == "N") {
        return "2";
    }
}

/**
 * 회원 성인인증에대한 비밀번호 옵션
 * @returns {String} : 0:비밀번호 옵션설정 안함, 1:비밀번호 옵션시 매번 물어보기, 2:비밀번호 옵션시 자동저장
 */
function isAdultPwdOption() {
	var adultPwdOption = getMUACHeaderCookie("adultPwdOption");
	if(adultPwdOption==undefined){
		return "0";
	}
	return adultPwdOption;
}

/**
 * 회원 로그인 시간
 * @returns
 */
function getLoginTime() {
    return getMUACHeaderCookie("loginTime");
}

/**
 * 상품유무???
 * @returns {Boolean}
 */
function isFreeUser() {
    var svcName = getMHCHeaderCookie("prodId");
    if (svcName == "undefined" || svcName == undefined || svcName.length <= 0) return true;
    return false;
}

/**
 * 회원 실명인증여부
 * @returns {String} : Y:실명인증회원, N:비실명회원
 */
function isRealNameFlag(reqType) {
	var realNameYn = getMUACHeaderCookie("realNameYn");
	var isRealNameFlag = "N";
	if(realNameYn=="Y") {
		isRealNameFlag = "Y";
	}else{
		if(reqType=='COOK'){
			isRealNameFlag = "N";
		}else{
			if(isMelonLogin()){
				$.ajax({
					url : "/muid/web/popup/realnamepopup_isRealNameCk.json",
					type : "POST",
					data : {"memberKey" : getMemberKey()},
					dataType:"json",
					async : false,
					success: function(json) {
						if(json.resultCode=='000000'){
							setRealCookie("MUAC",json.cookMUAC);
							isRealNameFlag = "Y";
						}else{
							isRealNameFlag = "N";
						}
					}
				});
			}else{
				isRealNameFlag = "N";
			}
		}
	}
	return isRealNameFlag;
}
/**
 * 인증(본인/성인) 플래그 조회
 * @returns {String} 			:{-1(오류), 0(성인), 1(성인), 2(성인), 3(미성년), 4(미성년)}
 * - 본인확인 인증여부 				:  오류        X,       O,       O,      O,       X
 * - 성인인증여부							:  오류        X,       O,       X,      X,       X
 * - 통합의 경우 본인인증과 성인인증의 체크를 별도로 한다 ( 본인인증 X, 성인 O 경우 성인 콘텐츠 이용 가능 )
 */
function getMemberAuthFlg(){
	var memberAge = getMUACHeaderCookie("memberAge");
	var realNameFlg = isRealNameFlag();
	var cookieLoginType = getCookieLoginType();
	var isAdltCk = false;

	if(realNameFlg == "Y"){
		if(memberAge>=19){
      isAdltCk = true;
		}else{
			return "3";
		}
	}else{
    if(cookieLoginType == "3" || cookieLoginType == "4"){
      isAdltCk = true;
    }else{
      if(memberAge>=19){
        return "0";
      }else{
        return "4";
      }
    }
	}

	if(isAdltCk){
    if(isMelonLogin()){
      var authFlg = "2";
      $.ajax({
        url : "/muid/web/popup/realnamepopup_isAdultAuthenticationCk.json",
        type : "POST",
        data : {"memberKey" : getMemberKey()},
        dataType:"json",
        async : false,
        error : function(jqXHR, textStatus, errorThrown){
          alert("오류코드 : ["+jqXHR.status+"]\n오류내용 : "+errorThrown);
          authFlg = "-1";
        },
        success: function(json) {
          if(json.resultCode=='000000'){
            authFlg = "1";
          }else{
            if(json.errorCode=='ERL042'){
              authFlg = "0";
            }else if(json.errorCode=='ERL087'){
              authFlg = "3";
            }else{
              authFlg = "2";
            }
          }
        }
      });

      return authFlg;
    }else{
      return "2";
    }
	}

}

/**
 * 멜론캐시
 * @returns
 */
function getMelonCash() {
    return getMHCHeaderCookie("melonCash");
}

/**
 * 회원 받은 선물 건수
 * @returns
 */
function getMemberGiftCnt() {
    return getMHCHeaderCookie("memberGiftCnt");
}

/**
 * 멜론포인트
 * @returns
 */
function getMelonPoint() {
    return getMHCHeaderCookie("melonPoint");
}

/**
 * 상품아이디
 * @returns
 */
function getProdId() {
    return getMHCHeaderCookie("prodId");
}

/**
 * 상품명
 * @returns
 */
function getProdName() {
	return getMHCHeaderCookie("prodName");
}

/**
 * 상품종료일
 * @returns
 */
function getProdToDate() {
	return getMHCHeaderCookie("prodToDate");
}

/**
 * 등급이미지
 * @returns
 */
function getGradeImageUrl() {
	var getGradeImageUrl = getMUGHeaderCookie("gradeImageUrl");
	if(getGradeImageUrl==undefined){
		getGradeImageUrl ="";
		
		return getGradeImageUrl;
	}
	
	getGradeImageUrl = getGradeImageUrl.replace("http://","https://");
	return getGradeImageUrl;
}

/**
 * 등급
 * @returns
 */
function getGrade() {
	var grade = getMUGHeaderCookie("grade");
	if(grade==undefined){
		grade ="";
	}
	return grade;
}

/**
 * 고객세분화 정보
 * 세그먼트코드|상품아이디|....,세그먼트코드|상품아이디,세그먼트.... .
 * @returns
 */
function getSeqmtCode() {
	return getMHCHeaderCookie("seqmtCode");
}

function getCouponCnt() {
    return getMHCHeaderCookie("couponCnt");
}

/**
 * 성인인증 여부
 * @return
 */
function getAdultAuthentication() {
	return getMUACHeaderCookie("adultAuthentication");
}

/**
 * 성인인증을 위한 loginSessionId
 * @return
 */
function getSessionId() {
	return getMUACHeaderCookie("loginSessionId");
}

/**
 * androidCarrier가 0이면 폰번호, 1이면 현재 회원db의 min번호 또는 가상min번호
 */
function getAndroidCkMdn() {
	return getMUADHeaderCookie("androidCkMdn");
}

/**
 * dcf지원여부( 0:미지원 or 1:지원)
 * Y/N
 * @returns
 */
function getAndroidCkDcf() {
	return getMUADHeaderCookie("androidCkDcf");
}

function chkMACAuth() {
    var buf = getCookie("MAC");

    return (buf == null || buf == '') ? false : true;
}

function chkMUACAuth() {
    var bug1 = getCookieMUAC();
    return (buf1 == null || buf1 == '') ? false : true;
}

/**
 * 회원 Dj 여부
 * @returns
 */
function getMemberDjYn() {
	return getMLCPHeaderCookie("memberDjYn");
}

/**
 * 회원 아티스트 여부
 * @returns
 */
function getMemberArtistId() {
	return getMLCPHeaderCookie("memberArtistId");
}

function getMemberToken() {
	return getMLCPHeaderCookie("token");
}

function getDisplayId() {
	return getMLCPHeaderCookie("displayId");
}

function getDisplayLoginId() {
  return getMLCPHeaderCookie("displayLoginId");
}

function getCookieLoginType() {
  return getMLCPHeaderCookie("cookieLoginType");
}

/**
 * 로그인 회원 유형 판단을 위한 값, dp되는 영역의 판단.
 * @returns
 */
function getMemberType() {
	return getMLCPHeaderCookie("memberType");
}

function getFacebookConnectYn() {
	return getMLCPHeaderCookie("facebookConnect");
}


/**
 * 상품에 대한 MHC cookie정보를 가져온다.
 * @param Name
 * @returns
 *
 * ex)getMHCHeaderCookie("memberId");
 */
function getMHCHeaderCookie(Name) {

    var cookieNameArray = new Array();
    var strBuf = unescape(decodeURIComponent(Base64.decode(getCookie("MHC")).replace(/\+/g, " ")));
    //var strBuf = Base64.decode(getCookie("MHC"));

    if (strBuf == null) return null;

    var arrStr = strBuf.split(";");
    cookieNameArray['memberId'] = arrStr[0];
    cookieNameArray['melonCash'] = arrStr[1];
    cookieNameArray['memberGiftCnt'] = arrStr[2];
    cookieNameArray['melonPoint'] = arrStr[3];
    cookieNameArray['prodId'] = arrStr[4];
    cookieNameArray['prodName'] = arrStr[5];
    cookieNameArray['prodToDate'] = arrStr[6];
    cookieNameArray['seqmtCode'] = arrStr[7];
    cookieNameArray['couponCnt'] = arrStr[8];

    return cookieNameArray[Name];
}

/**
 * 등급에 대한 MUG cookie정보를 가져온다.
 * @param Name
 * @returns
 *
 * ex)getMUGHeaderCookie("memberId");
 */
function getMUGHeaderCookie(Name) {

	var cookieNameArray = new Array();
	var strBuf = unescape(decodeURIComponent(Base64.decode(getCookie("MUG")).replace(/\+/g, " ")));

	if (strBuf == null) return null;

	var arrStr = strBuf.split(";");
	cookieNameArray['memberKey'] = arrStr[0];
	cookieNameArray['gradeImageUrl'] = arrStr[1];
	cookieNameArray['grade'] = arrStr[2];

	return cookieNameArray[Name];
}

/**
 * singleton 패턴을 이용하기 위해서 작성
 * 실명인증 정보(MUAC)는 한번 등록하고 또 읽을 필요없음.
 * @returns
 */
var singletonCookieMUAC; //singleton 전역변수
function getCookieMUAC() {
    if (singletonCookieMUAC == undefined) {
        var strBuf = getCookie('MUAC');
        if (strBuf != null) {
            singletonCookieMUAC = unescape(decodeURI(Base64.decode(strBuf).replace(/\+/g, " ")));
        }
    }
    return singletonCookieMUAC;
}

/**
 * 실명인증 정보에 대한 MUAC cookie 정보를 가져온다.
 * @param Name
 * @returns
 *
 * ex)getMUACHeaderCookie("memberKey");
 */
function getMUACHeaderCookie(Name) {
    var cookieNameArray = new Array();
    var strBuf = unescape(decodeURI(Base64.decode(getCookie('MUAC')).replace(/\+/g, " ")));
    if (strBuf == null) return null;

    var arrStr = strBuf.split(";");
    if(arrStr[0]=='SIMPLE_LOGIN'){
    	setCookie
    }else{
        cookieNameArray['memberKey'] = arrStr[0];
        cookieNameArray['memberAge'] = arrStr[1];
        cookieNameArray['realNameYn'] = arrStr[2];
        cookieNameArray['memberNickName'] = arrStr[3]==null||arrStr[3]==""?"닉네임 없음":arrStr[3];
        cookieNameArray['memberSex']= arrStr[4];
        cookieNameArray['memberTempPwdYn'] = arrStr[5];
        cookieNameArray['adultPwdOption'] = arrStr[6];
        //cookieNameArray['쿠키발행시간'] = arrStr[7];
        cookieNameArray['loginTime'] = arrStr[8];
        cookieNameArray['adultAuthentication'] = arrStr[9];
        cookieNameArray['loginSessionId'] = arrStr[10];
    }

    return cookieNameArray[Name];
}


var singletonCookieMUAD;

function getCookieMUAD(){
    if(singletonCookieMUAD==undefined){
        var strBuf = getCookie('MUAD');
        if(strBuf != null){
            singletonCookieMUAD = Base64.decode(strBuf).replace(/\+/g, " ");
        }
    }
    return singletonCookieMUAD;
}

function getMUADHeaderCookie(Name){
    var cookieNameArray = new Array();
    var strBuf = getCookieMUAD();
    if(strBuf == null) return null;

    var arrStr = strBuf.split(";");
    cookieNameArray['androidCkMdn'] = arrStr[0];
    cookieNameArray['androidCkDcf'] = arrStr[1];
    return cookieNameArray[Name];
}

function setMuidWindowName(name){
	window.name = name;
}

/**
 * 회원의 DJ여부 정보에 대한 MLCP cookie 정보를 가져온다.
 * @param Name
 * @returns
 *
 * ex)getMLCPHeaderCookie("memberKey");
 */
function getMLCPHeaderCookie(Name) {
    var cookieNameArray = new Array();
    var strBuf = unescape(decodeURIComponent(Base64.decode(getCookie("MLCP")).replace(/\+/g, " ")));
    if (strBuf == null) return null;

    var arrStr = strBuf.split(";");
    cookieNameArray['memberKey'] = arrStr[0];
    cookieNameArray['memberId'] = arrStr[1];
    cookieNameArray['memberDjYn'] = arrStr[2];
    cookieNameArray['memberArtistId'] = arrStr[3];
    cookieNameArray['token'] = arrStr[4];
    cookieNameArray['facebookConnect'] = arrStr[5];
    cookieNameArray['displayId'] = arrStr[7];
    cookieNameArray['memberType'] = arrStr[8];
  	cookieNameArray['displayLoginId'] = arrStr[9];
  	cookieNameArray['cookieLoginType'] = arrStr[10];
    return cookieNameArray[Name];
}

function domainInfo() {
	var arrayDomain = [];
	$.ajax({
		url : "/muid/web/common/domaininfo_domainInfo.json",
		type : "POST",
		data : {},
		dataType:"json",
		async : false,
		success: function(json) {
			arrayDomain[0] = json.memberDomain==null||json.memberDomain==''?"":json.memberDomain;
			arrayDomain[1] = json.memberSslDomain==null||json.memberSslDomain==''?"":json.memberSslDomain;
		}
	});

	return arrayDomain;
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
}

/**
 * 폰꾸미기에서 사용할 실명인증 띄우기 함수
 * viewType:changeName(개명), charge:유료결제, board:게시판, nineteen:19금
 */
function nicePhoneDeco(viewType){
	var arrayDomain = domainInfo();
	var sslMemberDomain = arrayDomain[1];
	if(sslMemberDomain==undefined){
		sslMemberDomain = "https://web.archive.org/web/20190701083627/https://member.melon.com";
	}

	var url = sslMemberDomain+"/muid/web/popup/realnamepopup_inform.htm?viewType="+viewType+"&deco=Y";
	document.location.href = url;
}
/**
 * viewType:changeName(개명), downloadCharge:곡다운로드 유료결제, charge:유료결제, board:게시판, nineteen:19금, mma:멜론뮤직어워드, adultPwdSetPop:성인콘텐츠에 대한 비밀번호설정팝업, adultPwdValidPop:성인콘텐츠에 대한 비밀번호 일치여부 팝업
 * serviceAuth,infoAuth : 본인확인
 * isReload:Y(바닥창 reload여부,
 * 				단, isForcePop의 값이 Y이면서 viewType이 charge,changeName,downloadCharge,nineteen인 경우에 한해서 reload된다.
 * 					or isContentType이 영상인 경우도 해당된다.)
 * callback:일반적인 설정 후 호출 함수
 * removeCallback:청소년유해 매체물 제거 함수
 * isForcePop:downloadCharge or nineteen인경우 location.href되지만 true로 설정할 경우 popup으로 호출한다.
 * isContentType: viewType(adultPwdValidPop,adultPwdSetPop)인 경우 영상이면 reload해준다.기본은 곡. 단, isReload가 Y값이어야 함.)
 * 00 or undefined:곡,01:영상
 * )
 *
 */
function niceAuthPop(viewType,isReload,callback,removeCallback,isForcePop,isContentType,encMemberId,cpId){
  var arrayDomain = domainInfo();
  var sslMemberDomain = arrayDomain[1];
  if(sslMemberDomain==undefined){
    sslMemberDomain = "https://web.archive.org/web/20190701083627/https://member.melon.com";
  }

  var width = 600;
  var height = 464;
  if(!(viewType=="changeName" || viewType=="panConn" || viewType=="loginAuth" || viewType=="serviceAuth" || viewType=="infoAuth" || viewType=="downloadCharge" || viewType=="charge" || viewType=="board" || viewType=="nineteen" || viewType=="mma" || viewType=="adultPwdSetPop" || viewType=="adultPwdValidPop" || viewType=="juvenileProtection" || viewType=="poll" || viewType=="event")){
    alert("잘못된 파라미터입니다.");
    return;
  }

  if(viewType=="adultPwdSetPop"){
    height = 643;
  }else if(viewType=="adultPwdValidPop"){
    height = 520;
  }else if(viewType=="charge" || viewType=="downloadCharge"){
    height = 670;
  }else if(viewType=="nineteen" || viewType=="juvenileProtection"){
    height = 570;
  }else if(viewType=="mma"){
    width = 500;
    height = 640;
  }else if(viewType=="poll"){
    width = 500;
    height = 680;
  }else if(viewType=="loginAuth"){
    height = 500;
  }

  var url = sslMemberDomain+"/muid/web/popup/realnamepopup_inform.htm?viewType="+viewType;
  if(viewType=="adultPwdSetPop"){
    url = sslMemberDomain+"/muid/web/popup/personadultpopup_informAuthPwdOptSetting.htm";
    alert("청소년유해매체물 이용을 위한 비밀번호가 설정되어있지 않습니다.\n비밀번호 설정 후 이용해주세요.");
  }else if(viewType=="adultPwdValidPop"){
    url = sslMemberDomain+"/muid/web/popup/personadultpopup_informPwdComp.htm";
  }else if(viewType=="changeName"){
    url = sslMemberDomain+"/muid/web/popup/realnamepopup_changName.htm?viewType="+viewType;
  }

  if(isReload){
    if(viewType=="adultPwdSetPop" || viewType=="adultPwdValidPop"){
      if(isContentType=="01"){
        if(url.indexOf("?") > -1){
          url = url+"&isReload=Y";
        }else{
          url = url+"?isReload=Y";
        }
      }
    }else{
      if(url.indexOf("?") > -1){
        url = url+"&isReload=Y";
      }else{
        url = url+"?isReload=Y";
      }
    }
  }

  //일반적인 콜백함수.
  if(callback!=undefined && callback!=""){
    if(url.indexOf("?") > -1)
      url = url+"&callback="+callback;
    else
      url = url+"?callback="+callback;
  }

  //청소년 유해매체물 제거를 위한 함수
  if(removeCallback!=undefined && removeCallback!=""){
    if(url.indexOf("?") > -1)
      url = url+"&removeCallback="+removeCallback;
    else
      url = url+"?removeCallback="+removeCallback;
  }

  if(isContentType!=undefined && isContentType!=""){
    if(url.indexOf("?") > -1)
      url = url+"&contentType="+isContentType;
    else
      url = url+"?contentType="+isContentType;
  }

  if(encMemberId!=undefined && encMemberId!=""){
    if(url.indexOf("?") > -1)
      url = url+"&encMemberId="+encMemberId;
    else
      url = url+"?encMemberId="+encMemberId;
  }

  if(cpId!=undefined && cpId!=""){
    if(url.indexOf("?") > -1)
      url = url+"&cpId="+cpId;
    else
      url = url+"?cpId="+cpId;
  }

  if(viewType=="downloadCharge" || viewType=="nineteen" || viewType=="juvenileProtection"){
    if(isForcePop){
      var urlOpt = "scrollbars=auto, resizable=yes,location=no, width="+width+",height="+height+", left=20, top=20";
      window.open(url, "_REALNAME_AUTHENTICATION_POP","app_,"+urlOpt);
    }else{
      document.location.href = url;
    }
  }else{
    var urlOpt = "scrollbars=auto, resizable=yes,location=no, width="+width+",height="+height+", left=20, top=20";
    window.open(url, "_REALNAME_AUTHENTICATION_POP","app_,"+urlOpt);
  }
}


/**
 *
 * @param locationType(01:팝업창을 닫고 바닥창을 returnPage로 이동,02:팝업창을 닫지않고 바닥창을 메인으로 이동 팝업창은 returnPage로 이동,"":메인으로이동)
 * @param returnPage("":메인으로 이동,url:해당 url로 이동)
 */
function logout(locationType,returnPage){
	var logoutFrm = $('<form method="post" name="menuLoginFrm"></form>');
	logoutFrm.appendTo('body');

	var inputReturnPage = $('<input />');
	inputReturnPage.attr("name", "locationType");
	inputReturnPage.attr("value", typeof locationType != 'undefined'?locationType:"");
	inputReturnPage.appendTo(logoutFrm);

	inputReturnPage = $('<input />');
	inputReturnPage.attr("name", "returnPage");
	inputReturnPage.attr("value", typeof returnPage != 'undefined'?returnPage:"");
	inputReturnPage.appendTo(logoutFrm);

	var url = "/muid/web/logout/logout_inform.htm";
	var currentProtocol = document.location.href;
	if(currentProtocol.indexOf("member.melon.com")<0){
		url = "https://web.archive.org/web/20190701083627/https://member.melon.com"+url;
	}
	logoutFrm.attr("action" ,url);
	logoutFrm.submit();
}

	//PCID 설정하기
	function Nethru_getCookieVal(offset) {
		var endstr = document.cookie.indexOf (";", offset);
		if (endstr == -1)
			endstr = document.cookie.length;
	
		return unescape(document.cookie.substring(offset, endstr));
	}
	
	function Nethru_SetCookie(name, value) {
		var argv = Nethru_SetCookie.arguments;
		var argc = Nethru_SetCookie.arguments.length;
		var expires = (2 < argc) ? argv[2] : null;
		var path = (3 < argc) ? argv[3] : null;
		var domain = (4 < argc) ? argv[4] : null;
		var secure = (5 < argc) ? argv[5] : false;
		document.cookie = name + "=" + escape (value) +
			((expires == null) ? "" : ("; expires="+expires.toGMTString())) +
			((path == null) ? "" : ("; path=" + path)) +
			((domain == null) ? "" : ("; domain=" + domain)) +
			((secure == true) ? "; secure" : "");
	}
	
	function Nethru_GetCookie(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg)
				return Nethru_getCookieVal (j);
	
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
		return null;
	}
	
	function Nethru_makePersistentCookie(name, length, path, domain) {
		var today = new Date();
		//var expiredDate = new Date(2100, 1, 1);
		var expiredDate = 365*100;	//단위 year
		var cookie;
		var value;
		
		var fromMPS = getCookie("MPS");	//홈탭인지 브라우저인지 판단
		if (fromMPS == null || fromMPS.indexOf("MELONPLAYER") < 0) {
			var pcPCID = getCookie("PC_PCID");			//경로:/muid/web/login/loginplayer_loginGate.jsp에서 setting
			if(pcPCID){
				setCookie(name, pcPCID, expiredDate, "/", domain);
			}else{
				cookie = getCookie(name);
				if (cookie){
					//이미 존재하지만 또 set 하는 사유 : 기존 cookie set domain이 melon.com으로 되어 있어 .melon.com으로 재 세팅한다.
					setCookie(name, cookie, expiredDate, "/", domain);
					setCookie("PC_PCID", cookie, expiredDate, "/", domain);	
					return 1;
				}
				
				var values = new Array();
				for (var i=0; i < length; i++)
					values[i] = "" + Math.random();
	
				value = today.getTime();
				for (var i=0; i < length; i++)
					value += values[i].charAt(2);
				
				setCookie(name, value, expiredDate, "/", domain);
				setCookie("PC_PCID", value, expiredDate, "/", domain);				
			}
		}else{
			var playerPCID = getCookie("PLAYER_PCID");	//경로:/muid/web/login/loginplayer_loginGate.jsp에서 setting
			if(playerPCID){
				setCookie(name, playerPCID, expiredDate, "/", domain);
			}else{
				cookie = getCookie(name);
				if (cookie){
					//이미 존재하지만 또 set 하는 사유 : 기존 cookie set domain이 melon.com으로 되어 있어 .melon.com으로 재 세팅한다.
					setCookie(name, cookie, expiredDate, "/", domain);
					setCookie("PC_PCID", cookie, expiredDate, "/", domain);	
					return 1;
				}
	
				var values = new Array();
				for (var i=0; i < length; i++)
					values[i] = "" + Math.random();
	
				value = today.getTime();
				for (var i=0; i < length; i++)
					value += values[i].charAt(2);
				
				setCookie(name, value, expiredDate, "/", domain);
				setCookie("PC_PCID", value, expiredDate, "/", domain);
			}
		}
	}
	
	Nethru_makePersistentCookie("PCID", 10, "/", ".melon.com");

	function memberMyinfoGnb(pageCode,pocId,objectId){
		if(objectId!=undefined && objectId!=''){
		    var headerLayout = document.getElementById('header');
		    if (headerLayout == null) {
		    	headerLayout = document.createElement("div");
		    	headerLayout.id = "header";
		    	headerLayout.innerHTML += "<div id='gnb'>";
		    	if(pageCode=='LOGIN' || pageCode=='EMAILRECEIVECANCEL'){
		    		headerLayout.innerHTML += "<div class='gnb_mem'>";
		    		headerLayout.innerHTML += "<div>";
		    		headerLayout.innerHTML += "<h1><a href=\"javascript:MemberEtc.goPage('MAIN');\" title='Melon 메인 - 페이지 이동'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/member/img_logo.png' width='85' height='32' alt='Melon' /></a></h1>";
		    		headerLayout.innerHTML += "</div>";
		    		headerLayout.innerHTML += "</div>";
		    	}else{
		    		var cssHeader = "";
					var cssMenu = "";
					var cssOn = "";
					if(pageCode=='MYINFO01'){
						cssOn = "on";
					}else if(pageCode=='PRODUCTCENTER' || pageCode=='ENTEREVENT'){
						cssHeader = "mp_header";
						cssMenu = "mp_menu";
					}
					headerLayout.innerHTML += "<div class='gnb_mem02'>";
					headerLayout.innerHTML += "<div class='wrap_header "+cssHeader+"'>";
					headerLayout.innerHTML += "<h1><a href=\"javascript:MemberEtc.goPage('MAIN');\" title='Melon 메인 - 페이지 이동'><img src='//web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/member/img_logo.png' width='85' height='32' alt='Melon' /></a></h1>";
					headerLayout.innerHTML += "		<div id='gnb_menu'>";
					headerLayout.innerHTML += "			<ul>";
					headerLayout.innerHTML += "				<li class='first_child'><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/chart/index.htm' class='main_menu menu01' title='멜론차트'><span>멜론차트</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/new/index.htm' class='main_menu menu02' title='최신음악'><span>최신음악</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/genre/song_list.htm?classicMenuId=DP0100' class='main_menu menu03' title='장르음악'><span>장르음악</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/dj/today/djtoday_list.htm' class='main_menu menu04' title='멜론DJ'><span>멜론DJ</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/tv/index.htm' class='main_menu menu05' title='멜론TV'><span>멜론TV</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/artistplus/todayupdate/index.htm' class='main_menu menu06' title='스타포스트'><span>스타포스트</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/musicstory/today/index.htm' class='main_menu menu07' title='뮤직스토리'><span>뮤직스토리</span></a></li>";
					headerLayout.innerHTML += "				<li class=''><a href='#' class='main_menu menu08' title='더보기'><span>더보기</span></a>";
					headerLayout.innerHTML += "					<div class='more_wrap' style='display:none'><!-- more_lay일때 display:block -->";
					headerLayout.innerHTML += "						<ul>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/smartradio/index.htm' title='스마트라디오'><span class='menu_more m1'>스마트라디오</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/flac/index.htm' title='원음전용관'><span class='menu_more m2'>원음전용관</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/edu/index.htm' title='어학'><span class='menu_more m3'>어학</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/customer/announce/index.htm' title='공지사항'><span class='menu_more m4'>공지사항</span></a></li>";
					headerLayout.innerHTML += "						</ul>";
					headerLayout.innerHTML += "						<ul>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/commerce/pamphlet/web/sale_listMainView.htm' title='이용권구매'><span class='menu_more m9'>이용권구매</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='javascript:goMyPageAddCash();' title='멜론캐시충전'><span class='menu_more m6'>멜론캐시충전</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/event/index.htm' title='이벤트'><span class='menu_more m7'>이벤트</span></a></li>";
					headerLayout.innerHTML += "							<li class=''><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://faqs2.melon.com/customer/index.htm' title='고객센터'><span class='menu_more m8'>고객센터</span></a></li>";
					headerLayout.innerHTML += "						</ul>";
					headerLayout.innerHTML += "					</div>";
					headerLayout.innerHTML += "				</li>";
					headerLayout.innerHTML += "			</ul>";
					headerLayout.innerHTML += "		</div>";
					if(isMelonLogin()){
						var fromMPS = getCookie("MPS");
						headerLayout.innerHTML += "<div class='header_login'>";
						headerLayout.innerHTML += "<span class='wrap_id'><span class='user_id'>";
						if(getGrade()!="" && getGrade()!="일반" || getMemberType() == "1"){
							headerLayout.innerHTML += "<span class='icon_grade'>";
							if(getGrade()!="" && getGrade()!="일반") headerLayout.innerHTML += "<span class='icon_logon'><img src='"+getGradeImageUrl()+"' width='18' height='18' alt="+getGrade()+"></span>";
							if(getMemberType() == "1") headerLayout.innerHTML += "<span class='icon_logon'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/icon_kakao.png' width='18' height='18' alt='kakao'></span>";
							headerLayout.innerHTML += "</span>";
						}
						headerLayout.innerHTML += "<a href='https://web.archive.org/web/20190701083627/https://member.melon.com/muid/web/update/memberinfomationupdateform_inform.htm'>"+getDisplayId()+"</a></span> 님</span>";

						if (fromMPS == null || fromMPS.indexOf("MELONPLAYER") < 0) {
							headerLayout.innerHTML += "<button type='button' onclick=\"MemberEtc.goPage('LOGOUT');\" title='로그아웃 - 페이지 이동' class='btn_big short'><span class='odd_span'><span class='even_span'>로그아웃</span></span></button>";
						}
						headerLayout.innerHTML += "</div>";
					}else{
						headerLayout.innerHTML += "<div class='header_login'>";
						headerLayout.innerHTML += "<button type='button' onclick=\"MemberEtc.goPage('LOGIN');\" title='로그인 - 페이지 이동' class='btn_big short'><span class='odd_span'><span class='even_span'>로그인</span></span></button>";
						headerLayout.innerHTML += "</div>";
					}
					headerLayout.innerHTML += "</div>";
					headerLayout.innerHTML += "<div class='wrap_menu "+cssMenu+"'>";
					headerLayout.innerHTML += "<ul>";
					headerLayout.innerHTML += "<li class='first_child "+(pageCode=='MYINFO1'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('BASIC_INFO_CHANGE');\" title='회원정보'><span class='m_menu m1'>회원정보</span></a></li>";
					if(!(getCookieLoginType() == "3" || getCookieLoginType() == "4")) headerLayout.innerHTML += "<li class='"+(pageCode=='MYINFO2'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('MYINFOPROTECT');\" title='내 정보 보호'><span class='m_menu m2'>내 정보 보호</span></a></li>";
					headerLayout.innerHTML += "<li class='"+(pageCode=='PRODUCTCENTER'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('PRODUCTCENTER');\" title='멜론이용권/결제정보'><span class='m_menu m3'>멜론이용권/결제정보</span></a></li>";
					headerLayout.innerHTML += "<li class='"+(pageCode=='ENTEREVENT'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('ENTEREVENT');\" title='이벤트 응모내역'><span class='m_menu m4'>이벤트 응모내역</span></a></li>";
					headerLayout.innerHTML += "</ul>";
					headerLayout.innerHTML += "</div>";
					headerLayout.innerHTML += "</div>";
		    	}
		    	headerLayout.innerHTML += "</div>";
		    	headerLayout.innerHTML += "</div>";

		    	document.getElementById("wrap").appendChild(headerLayout);
		    }
		}else{
			document.write("<div id='header'>");
			document.write("	<div id='gnb'>");
			
			var cssHeader = "";
			var cssMenu = "";
			var cssOn = "";
			if(pageCode=='MYINFO01'){
				cssOn = "on";
			}else if(pageCode=='PRODUCTCENTER' || pageCode=='ENTEREVENT'){
				cssHeader = "mp_header";
				cssMenu = "mp_menu";
			}
			
			document.write("<div class='gnb_mem03'>");
			document.write("	<div class='wrap_header "+cssHeader+"'>");
			document.write("		<div class='top_util'>");
			document.write("			<div id='gnb_menu' class='gnb_mini_menu'>");
			document.write("				<div class='wrap_gnb_more'>");
			document.write("					<div class='gnb_menu_more'>");
			document.write("						<ul>");
			document.write("							<li class='first_child'>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/chart/index.htm' class='menu01' title='멜론차트'>멜론차트</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/new/index.htm' class='menu02' title='최신'>최신</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/genre/song_list.htm?classicMenuId=DP0100' class='menu03' title='장르음악'>장르</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/dj/today/djtoday_list.htm' class='menu04' title='멜론DJ'>멜론DJ</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/tv/index.htm' class='menu05' title='멜론TV'>멜론TV</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/artistplus/todayupdate/index.htm' class='menu06' title='스타포스트'>스타포스트</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/musicstory/today/index.htm' class='menu07' title='매거진'>매거진</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/melonaward/timeline.htm' class='menu08' title='뮤직어워드'>뮤직어워드</a>");
			document.write("							</li>");
			document.write("							<li class=''>");
			document.write("								<a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/flac/index.htm' class='menu09' title='멜론Hi-Fi'>멜론Hi-Fi</a>");
			document.write("							</li>");
			document.write("						</ul>");
			document.write("					</div>");
			document.write("				</div>");
			
			if(isMelonLogin()){
				var fromMPS = getCookie("MPS"); // 멜론 플레이어에서 왔는지 확인.

				document.write("<div class='header_login'>");
				document.write("<span class='wrap_id'><span class='user_id'>");
				if(getGrade()!="" && getGrade()!="일반" || getMemberType() == "1"){
					document.write("<span class='icon_grade'>");
					if(getGrade()!="" && getGrade()!="일반") document.write("<span class='icon_logon'><img src='"+getGradeImageUrl()+"' width='18' height='18' alt="+getGrade()+"></span>");
					if(getMemberType() == "1") document.write("<span class='icon_logon'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/icon_kakao.png' width='18' height='18' alt='kakao'></span>");
					document.write("</span>");
				}
				document.write("<a href='https://web.archive.org/web/20190701083627/https://member.melon.com/muid/web/update/memberinfomationupdateform_inform.htm'>"+getDisplayId()+"</a></span> 님</span>");
				if (fromMPS == null || fromMPS.indexOf("MELONPLAYER") < 0) {
					document.write("<button type='button' onclick=\"MemberEtc.goPage('LOGOUT');\" title='로그아웃' class='btn_top_logout'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/btn_top_logout.png' width='44' height='12' alt='로그아웃' /></button>");
				}
				document.write("</div>");
			}else{
				document.write("<div class='header_login'>");
				document.write("<button type='button' onclick=\"MemberEtc.goPage('LOGIN');\" title='로그인' class='btn_top_login'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/btn_top_login.png' width='33' height='12' alt='로그인' /></button>");
				document.write("</div>");
			}
			
			document.write("			</div>");
			document.write("		</div>");
			document.write("		<div class='container_menu'>");
			document.write("			<h1><a href=\"javascript:MemberEtc.goPage('MAIN');\" title='Melon 메인'><img src='https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/member/img_logo95x25.png' width='95' height='25' alt='Melon' /></a></h1>");
			document.write("			<div class='wrap_menu '>");
			document.write("				<ul>");
      document.write("					<li class='first_child "+(pageCode=='MYINFO1'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('BASIC_INFO_CHANGE');\" title='회원정보'><span class='m_menu m1'>회원정보</span></a></li>");
      if(!(getCookieLoginType() == "3" || getCookieLoginType() == "4")) document.write("					<li class='"+(pageCode=='MYINFO2'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('MYINFOPROTECT');\" title='내 정보 보호'><span class='m_menu m2'>내 정보 보호</span></a></li>");
      document.write("					<li class='"+(pageCode=='PRODUCTCENTER'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('PRODUCTCENTER');\" title='멜론이용권/결제정보'><span class='m_menu m3'>멜론이용권/결제정보</span></a></li>");
      document.write("					<li class='"+(pageCode=='ENTEREVENT'?'on':'')+"'><a href=\"javascript:MemberEtc.goPage('ENTEREVENT');\" title='이벤트 응모내역'><span class='m_menu m4'>이벤트 응모내역</span></a></li>");
			document.write("				</ul>");
			document.write("			</div>");
			document.write("		</div>");
			document.write("	</div>");
			document.write("</div>");
			
			document.write("	</div>");
			document.write("</div>");
		}
	}

	function memberFooter(pageCode,errorCode){
		var cssFooter = "";
		if(pageCode=='PRODUCTCENTER' || pageCode=='ENTEREVENT'){
			cssFooter = "mp_footer";
		}
		if(errorCode != 'ERL069'){
			
			document.write("<div id='footer' class='"+cssFooter+"'>");
			document.write("	<div class='footer_cont'>");
			document.write("		<div class='footer_menu'>");
//			document.write("			<ul class='fl_left'>");
//			document.write("				<li class='menu01'><a href='https://web.archive.org/web/20190701083627/http://ticket.melon.com' title='MelOn 티켓' target='_blank'><span>MelOn Shopping</span></a></li>");
//			document.write("				<li class='menu03'><a href='https://web.archive.org/web/20190701083627/http://www.melon.com/customer/serviceintro/showwing_guide.htm' title='MelOn Showwing' target='_blank'><span>MelOn Showwing</span></a></li>");
//			document.write("				<li class='menu04'><a href='https://web.archive.org/web/20190701083627/http://aztweb.melon.com/aztalk/guide/web/main.htm' title='MelOn Aztalk' target='_blank'><span>aztalk</span></a></li>");
//			document.write("			</ul>");
			document.write("			<ul class='fl_right'>");
			document.write("				<li class='menu05'><a title='멜론4.0 둘러보기 - 페이지 이동' href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/serviceintro/index.htm'><span>멜론4.0 둘러보기</span></a></li>");
			document.write("				<li class='menu06'><a title='Windows 플레이어 - 페이지 이동' href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/customer/serviceintro/index.htm'><span>Windows 플레이어</span></a></li>");
			document.write("				<li class='menu07'><a title='Mac 플레이어 - 페이지 이동'  href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/customer/serviceintro/multi_pc_web.htm'><span>Mac 플레이어</span></a></li>");
			document.write("				<li class='menu09'><a title='iPad - 페이지 이동'  href='"+location.protocol+"//web.archive.org/web/20190701083627/https://www.melon.com/customer/serviceintro/ipad.htm'><span>iPad</span><span class='icon_new'></span></a></li>");
			document.write("				<li class='menu08'><a title='고객센터 - 페이지 이동' href='"+location.protocol+"//web.archive.org/web/20190701083627/https://faqs2.melon.com/customer/index.htm'><span>고객센터</span></a></li>");
			document.write("			</ul>");
			document.write("		</div>");
			document.write("		<ul class='footer_policy clfix'>");
			document.write("			<li class='first_child'><a href='https://web.archive.org/web/20190701083627/https://www.kakaocorp.com/' title='회사소개 ' target='_blank'>회사소개</a></li>");
			document.write("			<li><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://info.melon.com/terms/web/terms1_4.html' title='이용약관 ' target='_blank'>이용약관</a></li>");
			document.write("			<li><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://info.melon.com/terms/web/terms1_3.html' title='위치기반서비스 이용약관 ' target='_blank'>위치기반서비스 이용약관</a></li>");
			document.write("			<li><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://info.melon.com/terms/web/terms6.html' title='개인정보처리방침 ' target='_blank'><strong>개인정보처리방침</strong></a></li>");
			document.write("			<li><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://info.melon.com/terms/web/terms5_1.html' title='청소년보호정책 ' target='_blank'>청소년보호정책</a></li>");
			document.write("			<li><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://faqs2.melon.com/customer/faq/informFaq.htm?no=1&amp;faqId=QUES20140616000001&amp;SEARCH_KEY=&amp;SEARCH_PAR_CATEGORY=CATE20130909000006&amp;SEARCH_CATEGORY=CATE20130909000021' title='제휴/프로모션문의 '>제휴/프로모션문의</a></li>");
			document.write("			<li><a href=\"javascript:MemberEtc.goPage('EMAIL_COL_REJECT',1,384,331);\" title='이메일주소무단수집거부 '>이메일주소무단수집거부</a></li>");
			document.write("			<li class='last_child'><a href='"+location.protocol+"//web.archive.org/web/20190701083627/https://partner.melon.com' title='파트너센터 ' target='_blank'>파트너센터</a></li>");
			document.write("		</ul>");
			document.write("		<p>");
			document.write('			<span class="first"><strong>(주)카카오</strong>&nbsp;&nbsp;제주특별자치도 제주시 첨단로 242 (영평동)</span><span>공동대표이사 : 여민수, 조수용</span><span>사업자등록번호 : 120-81-47521</span><span>통신판매업신고번호 : 제 2015-제주아라-0032호</span><br />');
			document.write('			<span class="first"><a href="https://web.archive.org/web/20190701083627/http://www.ftc.go.kr/bizCommPop.do?wrkr_no=&apv_perm_no=2012651005630200009" target="_blank" title="사업자정보확인" class="btn_arrow">사업자정보확인</a></span><span>문의전화 : 1566-7727 (평일 09:00-18:00, 유료)</span><span>이메일 : <a href="mailto:melon_info@kakaocorp.com" class="btn_footer_mail">melon_info@kakaocorp.com</a></span><span>호스팅서비스사업자 : (주)카카오</span><span><a href="https://web.archive.org/web/20190701083627/https://www.kakaocorp.com" class="btn_footer_mail" target="_blank">© Kakao Corp.</a></span>');
			document.write("		</p>");
			document.write("		<div class='ban'>");
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.melon.com/footer/awrad.htm?pageType=06"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer_design_2018.png" width="52" height="26" alt="Design Award 2018" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.melon.com/footer/awrad.htm?pageType=06"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer_reddot_2017.png" width="101" height="25" alt="reddot award 2017" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.melon.com/footer/awrad.htm?pageType=02"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer01_20190214.png" width="102" height="25" alt="2019 대한민국 퍼스트브랜드 대상" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.melon.com/footer/awrad.htm?pageType=04"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer04_20190214.png" width="128" height="25" alt="2019 소비자가 뽑은 가장 신뢰하는 브랜드 대상" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.melon.com/footer/awrad.htm?pageType=03"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer02_20180406.png" width="114" height="25" alt="한국능률협회컨설팅 2018 브랜드 파워 1위" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/http://www.kdce.or.kr/user/ctf/clmsCtfTransList.do?NmberBusiRegNo=1388105876&websiteName=www.melon.com&SUB=FB" target="_blank"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer06_161209.png" width="82" height="25" alt="음악저작권 이용허락 인증" /></a>');
			document.write('			<a href="https://web.archive.org/web/20190701083627/https://www.copyrightok.kr" target="_blank"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer07_20180618.png" width="67" height="25" alt="저작권OK" /></a>');
			document.write('			<a class="last_child" href="https://web.archive.org/web/20190701083627/https://www.melon.com/resource/pdf/ISMS_certification.pdf" target="_blank"><img src="https://web.archive.org/web/20190701083627/https://cdnimg.melon.co.kr/resource/image/web/common/ban_footer09_161209.png" width="102" height="25" alt="정보보호 관리체계 ISMS 인증" /></a>');
			document.write("		</div>");
			document.write("	</div>");
//			document.write("	<div class='mobile_btn_container'>");
//			document.write("		<div class='mobile_btn_wrap' style='display:block;'>");
//			document.write("			<div class='fl_right'>");
//			document.write("				<p>접속하신 단말/브라우저에서는 멜론 서비스의 사용이 일부 제한될 수 있습니다. 양해부탁드립니다.</p>");
//			document.write("				<a href='https://web.archive.org/web/20190701083627/http://m.melon.com' class='btn btn_big' title='모바일 웹 버전'>");
//			document.write("					<span class='odd_span'>");
//			document.write("						<span class='even_span'>모바일 웹 버전</span>");
//			document.write("					</span>");
//			document.write("				</a>");
//			document.write("			</div>");
//			document.write("		</div>");
//			document.write("	</div>");
			document.write("</div>");
		}
	}
	
	//=================================RSA 함수
	// jsbn.js
	// Copyright (c) 2005  Tom Wu
	// All Rights Reserved.
	// See "LICENSE" for details.

	// Basic JavaScript BN library - subset useful for RSA encryption.

	// Bits per digit
	var dbits;

	// JavaScript engine analysis
	var canary = 0xdeadbeefcafe;
	var j_lm = ((canary&0xffffff)==0xefcafe);

	// (public) Constructor
	function BigInteger(a,b,c) {
	  if(a != null)
	    if("number" == typeof a) this.fromNumber(a,b,c);
	    else if(b == null && "string" != typeof a) this.fromString(a,256);
	    else this.fromString(a,b);
	}

	// return new, unset BigInteger
	function nbi() { return new BigInteger(null); }

	// am: Compute w_j += (x*this_i), propagate carries,
	// c is initial carry, returns final carry.
	// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
	// We need to select the fastest one that works in this environment.

	// am1: use a single mult and divide to get the high bits,
	// max digit bits should be 26 because
	// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
	function am1(i,x,w,j,c,n) {
	  while(--n >= 0) {
	    var v = x*this[i++]+w[j]+c;
	    c = Math.floor(v/0x4000000);
	    w[j++] = v&0x3ffffff;
	  }
	  return c;
	}
	// am2 avoids a big mult-and-extract completely.
	// Max digit bits should be <= 30 because we do bitwise ops
	// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
	function am2(i,x,w,j,c,n) {
	  var xl = x&0x7fff, xh = x>>15;
	  while(--n >= 0) {
	    var l = this[i]&0x7fff;
	    var h = this[i++]>>15;
	    var m = xh*l+h*xl;
	    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
	    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
	    w[j++] = l&0x3fffffff;
	  }
	  return c;
	}
	// Alternately, set max digit bits to 28 since some
	// browsers slow down when dealing with 32-bit numbers.
	function am3(i,x,w,j,c,n) {
	  var xl = x&0x3fff, xh = x>>14;
	  while(--n >= 0) {
	    var l = this[i]&0x3fff;
	    var h = this[i++]>>14;
	    var m = xh*l+h*xl;
	    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
	    c = (l>>28)+(m>>14)+xh*h;
	    w[j++] = l&0xfffffff;
	  }
	  return c;
	}
	if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
	  BigInteger.prototype.am = am2;
	  dbits = 30;
	}
	else if(j_lm && (navigator.appName != "Netscape")) {
	  BigInteger.prototype.am = am1;
	  dbits = 26;
	}
	else { // Mozilla/Netscape seems to prefer am3
	  BigInteger.prototype.am = am3;
	  dbits = 28;
	}

	BigInteger.prototype.DB = dbits;
	BigInteger.prototype.DM = ((1<<dbits)-1);
	BigInteger.prototype.DV = (1<<dbits);

	var BI_FP = 52;
	BigInteger.prototype.FV = Math.pow(2,BI_FP);
	BigInteger.prototype.F1 = BI_FP-dbits;
	BigInteger.prototype.F2 = 2*dbits-BI_FP;

	// Digit conversions
	var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
	var BI_RC = new Array();
	var rr,vv;
	rr = "0".charCodeAt(0);
	for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
	rr = "a".charCodeAt(0);
	for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
	rr = "A".charCodeAt(0);
	for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

	function int2char(n) { return BI_RM.charAt(n); }
	function intAt(s,i) {
	  var c = BI_RC[s.charCodeAt(i)];
	  return (c==null)?-1:c;
	}

	// (protected) copy this to r
	function bnpCopyTo(r) {
	  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
	  r.t = this.t;
	  r.s = this.s;
	}

	// (protected) set from integer value x, -DV <= x < DV
	function bnpFromInt(x) {
	  this.t = 1;
	  this.s = (x<0)?-1:0;
	  if(x > 0) this[0] = x;
	  else if(x < -1) this[0] = x+this.DV;
	  else this.t = 0;
	}

	// return bigint initialized to value
	function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

	// (protected) set from string and radix
	function bnpFromString(s,b) {
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 256) k = 8; // byte array
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else { this.fromRadix(s,b); return; }
	  this.t = 0;
	  this.s = 0;
	  var i = s.length, mi = false, sh = 0;
	  while(--i >= 0) {
	    var x = (k==8)?s[i]&0xff:intAt(s,i);
	    if(x < 0) {
	      if(s.charAt(i) == "-") mi = true;
	      continue;
	    }
	    mi = false;
	    if(sh == 0)
	      this[this.t++] = x;
	    else if(sh+k > this.DB) {
	      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
	      this[this.t++] = (x>>(this.DB-sh));
	    }
	    else
	      this[this.t-1] |= x<<sh;
	    sh += k;
	    if(sh >= this.DB) sh -= this.DB;
	  }
	  if(k == 8 && (s[0]&0x80) != 0) {
	    this.s = -1;
	    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
	  }
	  this.clamp();
	  if(mi) BigInteger.ZERO.subTo(this,this);
	}

	// (protected) clamp off excess high words
	function bnpClamp() {
	  var c = this.s&this.DM;
	  while(this.t > 0 && this[this.t-1] == c) --this.t;
	}

	// (public) return string representation in given radix
	function bnToString(b) {
	  if(this.s < 0) return "-"+this.negate().toString(b);
	  var k;
	  if(b == 16) k = 4;
	  else if(b == 8) k = 3;
	  else if(b == 2) k = 1;
	  else if(b == 32) k = 5;
	  else if(b == 4) k = 2;
	  else return this.toRadix(b);
	  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
	  var p = this.DB-(i*this.DB)%k;
	  if(i-- > 0) {
	    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
	    while(i >= 0) {
	      if(p < k) {
	        d = (this[i]&((1<<p)-1))<<(k-p);
	        d |= this[--i]>>(p+=this.DB-k);
	      }
	      else {
	        d = (this[i]>>(p-=k))&km;
	        if(p <= 0) { p += this.DB; --i; }
	      }
	      if(d > 0) m = true;
	      if(m) r += int2char(d);
	    }
	  }
	  return m?r:"0";
	}

	// (public) -this
	function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

	// (public) |this|
	function bnAbs() { return (this.s<0)?this.negate():this; }

	// (public) return + if this > a, - if this < a, 0 if equal
	function bnCompareTo(a) {
	  var r = this.s-a.s;
	  if(r != 0) return r;
	  var i = this.t;
	  r = i-a.t;
	  if(r != 0) return (this.s<0)?-r:r;
	  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
	  return 0;
	}

	// returns bit length of the integer x
	function nbits(x) {
	  var r = 1, t;
	  if((t=x>>>16) != 0) { x = t; r += 16; }
	  if((t=x>>8) != 0) { x = t; r += 8; }
	  if((t=x>>4) != 0) { x = t; r += 4; }
	  if((t=x>>2) != 0) { x = t; r += 2; }
	  if((t=x>>1) != 0) { x = t; r += 1; }
	  return r;
	}

	// (public) return the number of bits in "this"
	function bnBitLength() {
	  if(this.t <= 0) return 0;
	  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
	}

	// (protected) r = this << n*DB
	function bnpDLShiftTo(n,r) {
	  var i;
	  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
	  for(i = n-1; i >= 0; --i) r[i] = 0;
	  r.t = this.t+n;
	  r.s = this.s;
	}

	// (protected) r = this >> n*DB
	function bnpDRShiftTo(n,r) {
	  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
	  r.t = Math.max(this.t-n,0);
	  r.s = this.s;
	}

	// (protected) r = this << n
	function bnpLShiftTo(n,r) {
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<cbs)-1;
	  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
	  for(i = this.t-1; i >= 0; --i) {
	    r[i+ds+1] = (this[i]>>cbs)|c;
	    c = (this[i]&bm)<<bs;
	  }
	  for(i = ds-1; i >= 0; --i) r[i] = 0;
	  r[ds] = c;
	  r.t = this.t+ds+1;
	  r.s = this.s;
	  r.clamp();
	}

	// (protected) r = this >> n
	function bnpRShiftTo(n,r) {
	  r.s = this.s;
	  var ds = Math.floor(n/this.DB);
	  if(ds >= this.t) { r.t = 0; return; }
	  var bs = n%this.DB;
	  var cbs = this.DB-bs;
	  var bm = (1<<bs)-1;
	  r[0] = this[ds]>>bs;
	  for(var i = ds+1; i < this.t; ++i) {
	    r[i-ds-1] |= (this[i]&bm)<<cbs;
	    r[i-ds] = this[i]>>bs;
	  }
	  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
	  r.t = this.t-ds;
	  r.clamp();
	}

	// (protected) r = this - a
	function bnpSubTo(a,r) {
	  var i = 0, c = 0, m = Math.min(a.t,this.t);
	  while(i < m) {
	    c += this[i]-a[i];
	    r[i++] = c&this.DM;
	    c >>= this.DB;
	  }
	  if(a.t < this.t) {
	    c -= a.s;
	    while(i < this.t) {
	      c += this[i];
	      r[i++] = c&this.DM;
	      c >>= this.DB;
	    }
	    c += this.s;
	  }
	  else {
	    c += this.s;
	    while(i < a.t) {
	      c -= a[i];
	      r[i++] = c&this.DM;
	      c >>= this.DB;
	    }
	    c -= a.s;
	  }
	  r.s = (c<0)?-1:0;
	  if(c < -1) r[i++] = this.DV+c;
	  else if(c > 0) r[i++] = c;
	  r.t = i;
	  r.clamp();
	}

	// (protected) r = this * a, r != this,a (HAC 14.12)
	// "this" should be the larger one if appropriate.
	function bnpMultiplyTo(a,r) {
	  var x = this.abs(), y = a.abs();
	  var i = x.t;
	  r.t = i+y.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
	  r.s = 0;
	  r.clamp();
	  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
	}

	// (protected) r = this^2, r != this (HAC 14.16)
	function bnpSquareTo(r) {
	  var x = this.abs();
	  var i = r.t = 2*x.t;
	  while(--i >= 0) r[i] = 0;
	  for(i = 0; i < x.t-1; ++i) {
	    var c = x.am(i,x[i],r,2*i,0,1);
	    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
	      r[i+x.t] -= x.DV;
	      r[i+x.t+1] = 1;
	    }
	  }
	  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
	  r.s = 0;
	  r.clamp();
	}

	// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
	// r != q, this != m.  q or r may be null.
	function bnpDivRemTo(m,q,r) {
	  var pm = m.abs();
	  if(pm.t <= 0) return;
	  var pt = this.abs();
	  if(pt.t < pm.t) {
	    if(q != null) q.fromInt(0);
	    if(r != null) this.copyTo(r);
	    return;
	  }
	  if(r == null) r = nbi();
	  var y = nbi(), ts = this.s, ms = m.s;
	  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
	  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
	  else { pm.copyTo(y); pt.copyTo(r); }
	  var ys = y.t;
	  var y0 = y[ys-1];
	  if(y0 == 0) return;
	  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
	  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
	  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
	  y.dlShiftTo(j,t);
	  if(r.compareTo(t) >= 0) {
	    r[r.t++] = 1;
	    r.subTo(t,r);
	  }
	  BigInteger.ONE.dlShiftTo(ys,t);
	  t.subTo(y,y);	// "negative" y so we can replace sub with am later
	  while(y.t < ys) y[y.t++] = 0;
	  while(--j >= 0) {
	    // Estimate quotient digit
	    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
	    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
	      y.dlShiftTo(j,t);
	      r.subTo(t,r);
	      while(r[i] < --qd) r.subTo(t,r);
	    }
	  }
	  if(q != null) {
	    r.drShiftTo(ys,q);
	    if(ts != ms) BigInteger.ZERO.subTo(q,q);
	  }
	  r.t = ys;
	  r.clamp();
	  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
	  if(ts < 0) BigInteger.ZERO.subTo(r,r);
	}

	// (public) this mod a
	function bnMod(a) {
	  var r = nbi();
	  this.abs().divRemTo(a,null,r);
	  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
	  return r;
	}

	// Modular reduction using "classic" algorithm
	function Classic(m) { this.m = m; }
	function cConvert(x) {
	  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	  else return x;
	}
	function cRevert(x) { return x; }
	function cReduce(x) { x.divRemTo(this.m,null,x); }
	function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
	function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

	Classic.prototype.convert = cConvert;
	Classic.prototype.revert = cRevert;
	Classic.prototype.reduce = cReduce;
	Classic.prototype.mulTo = cMulTo;
	Classic.prototype.sqrTo = cSqrTo;

	// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
	// justification:
//	         xy == 1 (mod m)
//	         xy =  1+km
	//   xy(2-xy) = (1+km)(1-km)
	// x[y(2-xy)] = 1-k^2m^2
	// x[y(2-xy)] == 1 (mod m^2)
	// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
	// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
	// JS multiply "overflows" differently from C/C++, so care is needed here.
	function bnpInvDigit() {
	  if(this.t < 1) return 0;
	  var x = this[0];
	  if((x&1) == 0) return 0;
	  var y = x&3;		// y == 1/x mod 2^2
	  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
	  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
	  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
	  // last step - calculate inverse mod DV directly;
	  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
	  // we really want the negative inverse, and -DV < y < DV
	  return (y>0)?this.DV-y:-y;
	}

	// Montgomery reduction
	function Montgomery(m) {
	  this.m = m;
	  this.mp = m.invDigit();
	  this.mpl = this.mp&0x7fff;
	  this.mph = this.mp>>15;
	  this.um = (1<<(m.DB-15))-1;
	  this.mt2 = 2*m.t;
	}

	// xR mod m
	function montConvert(x) {
	  var r = nbi();
	  x.abs().dlShiftTo(this.m.t,r);
	  r.divRemTo(this.m,null,r);
	  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
	  return r;
	}

	// x/R mod m
	function montRevert(x) {
	  var r = nbi();
	  x.copyTo(r);
	  this.reduce(r);
	  return r;
	}

	// x = x/R mod m (HAC 14.32)
	function montReduce(x) {
	  while(x.t <= this.mt2)	// pad x so am has enough room later
	    x[x.t++] = 0;
	  for(var i = 0; i < this.m.t; ++i) {
	    // faster way of calculating u0 = x[i]*mp mod DV
	    var j = x[i]&0x7fff;
	    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
	    // use am to combine the multiply-shift-add into one call
	    j = i+this.m.t;
	    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
	    // propagate carry
	    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
	  }
	  x.clamp();
	  x.drShiftTo(this.m.t,x);
	  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
	}

	// r = "x^2/R mod m"; x != r
	function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

	// r = "xy/R mod m"; x,y != r
	function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

	Montgomery.prototype.convert = montConvert;
	Montgomery.prototype.revert = montRevert;
	Montgomery.prototype.reduce = montReduce;
	Montgomery.prototype.mulTo = montMulTo;
	Montgomery.prototype.sqrTo = montSqrTo;

	// (protected) true iff this is even
	function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

	// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
	function bnpExp(e,z) {
	  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
	  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
	  g.copyTo(r);
	  while(--i >= 0) {
	    z.sqrTo(r,r2);
	    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
	    else { var t = r; r = r2; r2 = t; }
	  }
	  return z.revert(r);
	}

	// (public) this^e % m, 0 <= e < 2^32
	function bnModPowInt(e,m) {
	  var z;
	  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
	  return this.exp(e,z);
	}

	// protected
	BigInteger.prototype.copyTo = bnpCopyTo;
	BigInteger.prototype.fromInt = bnpFromInt;
	BigInteger.prototype.fromString = bnpFromString;
	BigInteger.prototype.clamp = bnpClamp;
	BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
	BigInteger.prototype.drShiftTo = bnpDRShiftTo;
	BigInteger.prototype.lShiftTo = bnpLShiftTo;
	BigInteger.prototype.rShiftTo = bnpRShiftTo;
	BigInteger.prototype.subTo = bnpSubTo;
	BigInteger.prototype.multiplyTo = bnpMultiplyTo;
	BigInteger.prototype.squareTo = bnpSquareTo;
	BigInteger.prototype.divRemTo = bnpDivRemTo;
	BigInteger.prototype.invDigit = bnpInvDigit;
	BigInteger.prototype.isEven = bnpIsEven;
	BigInteger.prototype.exp = bnpExp;

	// public
	BigInteger.prototype.toString = bnToString;
	BigInteger.prototype.negate = bnNegate;
	BigInteger.prototype.abs = bnAbs;
	BigInteger.prototype.compareTo = bnCompareTo;
	BigInteger.prototype.bitLength = bnBitLength;
	BigInteger.prototype.mod = bnMod;
	BigInteger.prototype.modPowInt = bnModPowInt;

	// "constants"
	BigInteger.ZERO = nbv(0);
	BigInteger.ONE = nbv(1);
	// end of jsbn.js

	// prng4.js - uses Arcfour as a PRNG

	function Arcfour() {
	  this.i = 0;
	  this.j = 0;
	  this.S = new Array();
	}

	// Initialize arcfour context from key, an array of ints, each from [0..255]
	function ARC4init(key) {
	  var i, j, t;
	  for(i = 0; i < 256; ++i)
	    this.S[i] = i;
	  j = 0;
	  for(i = 0; i < 256; ++i) {
	    j = (j + this.S[i] + key[i % key.length]) & 255;
	    t = this.S[i];
	    this.S[i] = this.S[j];
	    this.S[j] = t;
	  }
	  this.i = 0;
	  this.j = 0;
	}

	function ARC4next() {
	  var t;
	  this.i = (this.i + 1) & 255;
	  this.j = (this.j + this.S[this.i]) & 255;
	  t = this.S[this.i];
	  this.S[this.i] = this.S[this.j];
	  this.S[this.j] = t;
	  return this.S[(t + this.S[this.i]) & 255];
	}

	Arcfour.prototype.init = ARC4init;
	Arcfour.prototype.next = ARC4next;

	// Plug in your RNG constructor here
	function prng_newstate() {
	  return new Arcfour();
	}

	// Pool size must be a multiple of 4 and greater than 32.
	// An array of bytes the size of the pool will be passed to init()
	var rng_psize = 256;
	//end of prng4.js

	// rng.js
	// Random number generator - requires a PRNG backend, e.g. prng4.js

	// For best results, put code like
	// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
	// in your main HTML document.

	var rng_state;
	var rng_pool;
	var rng_pptr;

	// Mix in a 32-bit integer into the pool
	function rng_seed_int(x) {
	  rng_pool[rng_pptr++] ^= x & 255;
	  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
	  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
	  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
	}

	// Mix in the current time (w/milliseconds) into the pool
	function rng_seed_time() {
	  rng_seed_int(new Date().getTime());
	}

	// Initialize the pool with junk if needed.
	if(rng_pool == null) {
	  rng_pool = new Array();
	  rng_pptr = 0;
	  var t;
	  if(window.crypto && window.crypto.getRandomValues) {
	    // Use webcrypto if available
	    var ua = new Uint8Array(32);
	    window.crypto.getRandomValues(ua);
	    for(t = 0; t < 32; ++t)
	      rng_pool[rng_pptr++] = ua[t];
	  }
	  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
	    // Extract entropy (256 bits) from NS4 RNG if available
	    var z = window.crypto.random(32);
	    for(t = 0; t < z.length; ++t)
	      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
	  }
	  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
	    t = Math.floor(65536 * Math.random());
	    rng_pool[rng_pptr++] = t >>> 8;
	    rng_pool[rng_pptr++] = t & 255;
	  }
	  rng_pptr = 0;
	  rng_seed_time();
	  //rng_seed_int(window.screenX);
	  //rng_seed_int(window.screenY);
	}

	function rng_get_byte() {
	  if(rng_state == null) {
	    rng_seed_time();
	    rng_state = prng_newstate();
	    rng_state.init(rng_pool);
	    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
	      rng_pool[rng_pptr] = 0;
	    rng_pptr = 0;
	    //rng_pool = null;
	  }
	  // TODO: allow reseeding after first request
	  return rng_state.next();
	}

	function rng_get_bytes(ba) {
	  var i;
	  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
	}

	function SecureRandom() {}

	SecureRandom.prototype.nextBytes = rng_get_bytes;
	//end of rng.js

	// Depends on jsbn.js and rng.js

	// Version 1.1: support utf-8 encoding in pkcs1pad2

	// convert a (hex) string to a bignum object
	function parseBigInt(str,r) {
	  return new BigInteger(str,r);
	}

	function linebrk(s,n) {
	  var ret = "";
	  var i = 0;
	  while(i + n < s.length) {
	    ret += s.substring(i,i+n) + "\n";
	    i += n;
	  }
	  return ret + s.substring(i,s.length);
	}

	function byte2Hex(b) {
	  if(b < 0x10)
	    return "0" + b.toString(16);
	  else
	    return b.toString(16);
	}

	// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
	function pkcs1pad2(s,n) {
	  if(n < s.length + 11) { // TODO: fix for utf-8
	    alert("Message too long for RSA");
	    return null;
	  }
	  var ba = new Array();
	  var i = s.length - 1;
	  while(i >= 0 && n > 0) {
	    var c = s.charCodeAt(i--);
	    if(c < 128) { // encode using utf-8
	      ba[--n] = c;
	    }
	    else if((c > 127) && (c < 2048)) {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = (c >> 6) | 192;
	    }
	    else {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = ((c >> 6) & 63) | 128;
	      ba[--n] = (c >> 12) | 224;
	    }
	  }
	  ba[--n] = 0;
	  var rng = new SecureRandom();
	  var x = new Array();
	  while(n > 2) { // random non-zero pad
	    x[0] = 0;
	    while(x[0] == 0) rng.nextBytes(x);
	    ba[--n] = x[0];
	  }
	  ba[--n] = 2;
	  ba[--n] = 0;
	  return new BigInteger(ba);
	}

	// "empty" RSA key constructor
	function RSAKey() {
	  this.n = null;
	  this.e = 0;
	  this.d = null;
	  this.p = null;
	  this.q = null;
	  this.dmp1 = null;
	  this.dmq1 = null;
	  this.coeff = null;
	}

	// Set the public key fields N and e from hex strings
	function RSASetPublic(N,E) {
	  if(N != null && E != null && N.length > 0 && E.length > 0) {
	    this.n = parseBigInt(N,16);
	    this.e = parseInt(E,16);
	  }
	  else
	    alert("Invalid RSA public key");
	}

	// Perform raw public operation on "x": return x^e (mod n)
	function RSADoPublic(x) {
	  return x.modPowInt(this.e, this.n);
	}

	// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
	function RSAEncrypt(text) {
	  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
	  if(m == null) return null;
	  var c = this.doPublic(m);
	  if(c == null) return null;
	  var h = c.toString(16);
	  if((h.length & 1) == 0) return h; else return "0" + h;
	}

	// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
	//function RSAEncryptB64(text) {
	//  var h = this.encrypt(text);
	//  if(h) return hex2b64(h); else return null;
	//}

	// protected
	RSAKey.prototype.doPublic = RSADoPublic;

	// public
	RSAKey.prototype.setPublic = RSASetPublic;
	RSAKey.prototype.encrypt = RSAEncrypt;
	//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;
	//end of rsa.js

	//base64.js
	var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b64padchar="=";

	function hex2b64(h) {
	  var i;
	  var c;
	  var ret = "";
	  for(i = 0; i+3 <= h.length; i+=3) {
	    c = parseInt(h.substring(i,i+3),16);
	    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
	  }
	  if(i+1 == h.length) {
	    c = parseInt(h.substring(i,i+1),16);
	    ret += b64map.charAt(c << 2);
	  }
	  else if(i+2 == h.length) {
	    c = parseInt(h.substring(i,i+2),16);
	    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
	  }
	  while((ret.length & 3) > 0) ret += b64padchar;
	  return ret;
	}

	// convert a base64 string to hex
	function b64tohex(s) {
	  var ret = ""
	  var i;
	  var k = 0; // b64 state, 0-3
	  var slop;
	  for(i = 0; i < s.length; ++i) {
	    if(s.charAt(i) == b64padchar) break;
	    v = b64map.indexOf(s.charAt(i));
	    if(v < 0) continue;
	    if(k == 0) {
	      ret += int2char(v >> 2);
	      slop = v & 3;
	      k = 1;
	    }
	    else if(k == 1) {
	      ret += int2char((slop << 2) | (v >> 4));
	      slop = v & 0xf;
	      k = 2;
	    }
	    else if(k == 2) {
	      ret += int2char(slop);
	      ret += int2char(v >> 2);
	      slop = v & 3;
	      k = 3;
	    }
	    else {
	      ret += int2char((slop << 2) | (v >> 4));
	      ret += int2char(v & 0xf);
	      k = 0;
	    }
	  }
	  if(k == 1)
	    ret += int2char(slop << 2);
	  return ret;
	}

	// convert a base64 string to a byte/number array
	function b64toBA(s) {
	  //piggyback on b64tohex for now, optimize later
	  var h = b64tohex(s);
	  var i;
	  var a = new Array();
	  for(i = 0; 2*i < h.length; ++i) {
	    a[i] = parseInt(h.substring(2*i,2*i+2),16);
	  }
	  return a;
	}
	//end of base64.js


	//auth_rsa.js
	var AuthRSA = function( success, fail ) {
		this.running = null;
		if(typeof httpsMemberDomain == "undefined"){
      this.url = "https://web.archive.org/web/20190701083627/https://member.melon.com/muid/web/authentication/authentication_getRSAPublic.json";
    }else {
      this.url = httpsMemberDomain+"/muid/web/authentication/authentication_getRSAPublic.json";
		}
		this.success = ( success ) ? success : function(){};
		this.fail = ( fail ) ? fail : function(){};
		this.source = {
			publickey : null,
			exponent : null
		};

		this.rsa = new RSAKey();
	};


	AuthRSA.prototype.execute = function( success, fail ) {
		var _self = this;
		var runComplete = false;

		if ( this.running != null ) return;

		this.success = ( success ) ? success : function(){};
		this.fail = ( fail ) ? fail : function(){};
		this.running = $.ajax({
			url		: _self.url,
			type	: "POST",
			data	: {},
			xhrFields: {withCredentials: true},
			async : false,
			success	: function(data, st) {
				if ( data && data.code && data.code != undefined && data.code == "200" ) {
					_self.source.publickey = data.publickey;
					_self.source.exponent = data.exponent;
					_self.rsa.setPublic(data.publickey, data.exponent);
					_self.success( data.publickey, data.exponent );
				} else {
					_self.fail( data );
				}
			},
			error	: function(xhr, st, thrown) {
				_self.fail( "ajax error" );
			},
			complete: function(xhr, st) {
                runComplete = true;
			}
		});

		if(runComplete) this.running = null;
	};

	AuthRSA.prototype.setSource = function( publickey, exponent ) {
		this.source.publickey = data.publickey;
		this.source.exponent = data.exponent;
		return this.source;
	};

	AuthRSA.prototype.encrypt = function( val) {
		if ( this.source.publickey != null && this.source.exponent ) {
			return this.rsa.encrypt( val );
		}
		return "";
	};
	//end of auth_rsa.js

	//쿠키 다시 로드
	var __POC_ID = "XXXX";
	try{
		__POC_ID = POC_ID;
	}catch(e){
	}
	resetCookie(__POC_ID);


}
/*
     FILE ARCHIVED ON 08:36:27 Jul 01, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:01:58 Feb 27, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 140.329
  exclusion.robots: 0.076
  exclusion.robots.policy: 0.065
  cdx.remote: 0.091
  esindex: 0.009
  LoadShardBlock: 96.621 (3)
  PetaboxLoader3.datanode: 108.376 (4)
  load_resource: 175.343
  PetaboxLoader3.resolve: 89.124
*/