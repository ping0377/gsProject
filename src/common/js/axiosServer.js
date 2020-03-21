import qs from 'qs';
import $axios from 'axios';
let HTTP = 'http://xyxh.fryxy.cn/association/';
// let HTTP = 'http://192.168.1.111:8080/';
// let HTTP = '/association/';

// 上传图片
export async function addImg(File,name){
	if(!name){
		name = "";
	};
	let Data = new FormData();
	Data.append("file", File);
	Data.append("fileName", name);
	let url = HTTP + 'comm/batchUpload'
	return $axios.post(url,Data,{emulateJSON: true},{
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
}

export async function addImgs(File){
	let Data = new FormData();
	Data.append("file", File);
	let url = HTTP + 'comm/batchUpload'
	return $axios.post(url,Data,{emulateJSON: true},{
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
}

// 登录
export async function getLogin(username,userpwd) {
	let json_array = {
		tel: username,
		ccoicPwd: userpwd
	}
	let url = HTTP + 'aon/login';
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}
// aon/getInformation 获取用户名
// 获取邮箱
export async function getMail(tel) {
	let json_array = {
		tel: tel,
	}
	let url = HTTP + 'aon/getAdminEmail';
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 获取邮箱验证码
export async function getEM(em) {
	let json_array = {
		el: em,
	}
	let url = HTTP + 'oas/sendModifyTheNumberCode';
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 忘记密码
export async function changePW(em,tel,code,pwd) {
	let json_array = {
		el: em,
		tel: tel,
		code: code,
		pwd: pwd
	}
	let url = HTTP + 'aon/forgetThePassword';
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 获取用户
export async function getUser(OpenId) {
	let json_array = {
		OpenId:OpenId
	}
	let url = HTTP + 'aon/getInformation';
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 获取全部商家
export async function getShop(OpenId,fkBusinessTypeId,fkId,typeName) {
	let json_array = {
		OpenId:OpenId,
		fkBusinessTypeId:fkBusinessTypeId,
		fkCcoicId:fkId,
		typeName:typeName
	}
	let url = HTTP + 'mat/getBusiness'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 今日统计
export async function Statistics(OpenId,fkid) {
	let json_array = {
		OpenId:OpenId,
		ccoicId:fkid
	}
	let url = HTTP + 'comm/test'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 提交协会修改1
// 修改电话
export async function telChange(OpenId,tel,em,emVerify) {
	let json_array = {
		OpenId:OpenId,
		el:em,
		code:emVerify,
		tel:tel
	}
	let url = HTTP + 'aon/changeThePhone'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改密码
export async function pwChange(OpenId,oldPw,newPw) {
	let json_array = {
		OpenId:OpenId,
		pastPwd:oldPw,
		pwd:newPw
	}
	let url = HTTP + 'aon/changePwd'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改邮箱
export async function mailChange(OpenId,newEm,code) {
	let json_array = {
		OpenId:OpenId,
		el:newEm, 
		code:code
	}
	let url = HTTP + 'aon/modifyEmail'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改协会信息
export async function infoChange(OpenId,info) {
	let json_array = {
		OpenId:OpenId,
		introduction:info
	}
	let url = HTTP + 'aon/modifyInformation'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 提交协会修改2
export async function changeInFo(OpenId,Name,Url,Fax,Wechat) {
	let json_array = {
		OpenId:OpenId,
		ccoicName:Name,
		ccoicUrl:Url,
		fax:Fax,
		wechatId:Wechat
	}
	let url = HTTP + 'aon/modifyInformation'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 获取商家分类
export async function getShopOptions(OpenId,fkId) {
	let json_array = {
		OpenId:OpenId,
		ccoic:fkId
	}
	let url = HTTP + 'aon/getBusinessType'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家管理 编辑
export async function editShop(obj) {
	let url = HTTP + 'aon/changeBusiness'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家管理 添加
export async function addShop(obj) {
	let url = HTTP + 'aon/createBusiness'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家管理 删除
export async function delShop(OpenId,id) {
	let json_array = {
		OpenId:OpenId,
		businessId:id
	}
	let url = HTTP + 'aon/deleteBusiness'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家管理 查询
export async function shopSearch(obj) {
	let url = HTTP + 'aon/criteriaQueryBusiness'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 活动管理
export async function getActivity(OpenId,fkId,id,title) {
	let json_array = {
		OpenId:OpenId,
		fkCcoicId:fkId,
		pkId:id,
		title:title
	}
	let url = HTTP + 'aon/getActivity'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 编辑活动正文
export async function activityEdit(obj) {
	let url = HTTP + 'aon/changeActivity'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 删除活动
export async function delActivity(OpenId,id) {
	let json_array = {
		OpenId:OpenId,
		pkId:id
	}
	let url = HTTP + 'aon/deleteActivity'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 添加活动
export async function addActivity(obj) {
	let url = HTTP + 'aon/addActivity'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会荣誉
export async function getHonor(OpenId,fkId) {
	let json_array = {
		OpenId:OpenId,
		ccoicId:fkId
	}
	let url = HTTP + 'aon/getCertificate'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会荣誉 添加
export async function addHonor(OpenId,fkId,img,name) {
	let json_array = {
		OpenId:OpenId,
		ccoicId:fkId,
		cateName:name,
		image:img
	}
	let url = HTTP + 'aon/addCertificate'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会荣誉 删除
export async function delHonor(OpenId,id) {
	let json_array = {
		OpenId:OpenId,
		cateIds:id
	}
	let url = HTTP + 'aon/deleteCertificate'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会荣誉 修改
export async function changeHonor(OpenId,id,img,name,fkId) {
	let json_array = {
		OpenId:OpenId,
		image:img,
		ccoicId:fkId,
		imageId:id,
		cateName:name
	}
	let url = HTTP + 'aon/changeCertificate'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会等级
export async function getGradeAll(OpenId,fkId) {
	let json_array = {
		OpenId:OpenId,
		fkCcoicId:fkId
	}
	let url = HTTP + 'aon/getGradeAll'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会等级 删除
export async function delGrade(OpenId,fkId,id) {
	let json_array = {
		OpenId:OpenId,
		ccoicId:fkId,
		gradeId:id
	}
	let url = HTTP + 'aon/deleteGrade'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会等级 修改
export async function changeGrade(obj) {
	let url = HTTP + 'aon/changeGrade'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 协会等级 添加
export async function addGrade(obj) {
	let url = HTTP + 'aon/addGrade'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 认证申请
export async function getApprove(obj) {
	let url = HTTP + 'aon/getObtainMerchantApplications'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 认证申请 通过
export async function auditProcess(obj) {
	let url = HTTP + 'aon/auditProcess'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家类别
export async function getShopSort(OpenId,fkid) {
	let json_array = {
		OpenId:OpenId,
		ccoicId:fkid
	}
	let url = HTTP + 'aon/getBusinessTypeAll'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家类别 修改
export async function changeShopSort(obj) {
	let url = HTTP + 'aon/changeBusinessType'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家类别 删除
export async function delShopSort(OpenId,typeId) {
	let json_array = {
		OpenId:OpenId,
		typeId:typeId
	}
	let url = HTTP + 'aon/deleteBusinessType'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家类别 添加
export async function addShopSort(obj) {
	let url = HTTP + 'aon/addBusinessType'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 用户管理 查询
export async function getUserManage(obj) {
	let url = HTTP + 'aon/getUser'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 用户管理 升级
export async function upUserManage(obj) {
	let url = HTTP + 'comm/usersToUpgrade'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 缴费统计 查询
export async function getPayment(obj) {
	let url = HTTP + 'mat/getBusinessUpdateDetails'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 会员卡管理
export async function getUserCard(obj) {
	let url = HTTP + 'comm/getUserCard'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 消费记录
export async function cardConsume(obj) {
	let url = HTTP + 'comm/getCardConsume'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 充值记录
export async function rechargeMsg(obj) {
	let url = HTTP + 'comm/getCardRechargeMsg'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 预约单记录
export async function reserveOrder(obj) {
	let url = HTTP + 'comm/getReserveOrder'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 获取商户等级
export async function getShopRank(obj) {
	let url = HTTP + 'aon/getBusinessLevelAll'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 添加商户等级
export async function addShopRank(obj) {
	let url = HTTP + 'aon/addBusinessLevel'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改商户等级
export async function changeShopRank(obj) {
	let url = HTTP + 'aon/changeBusinessLevel'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 删除商户等级
export async function delShopRank(obj) {
	let url = HTTP + 'aon/delLevel'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 升级
export async function upDate(obj) {
	let url = HTTP + 'mat/businessUpdate'
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 证书上传 添加
export async function addCertificate(obj) {
	let url =  HTTP + 'aon/addStudentCertificate';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 证书上传 删除
export async function delCertificate(obj) {
	let url =  HTTP + 'aon/deleteStudentCertificate';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 证书上传 修改
export async function changeCertificate(obj) {
	let url =  HTTP + 'aon/modifyStudentCertificate';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 证书上传 查询
export async function searchCertificate(obj) {
	let url =  HTTP + 'aon/getStudentCertificate';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改入会协议
export async function protocolChange(OpenId,info,pkId) {
	let json_array = {
		OpenId:OpenId,
		agreement:info,
		pkId:pkId
	}
	let url = HTTP + 'aon/editAgreement'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 修改商品信息
export async function shopChange(OpenId,info,pkId,shopId) {
	let json_array = {
		OpenId:OpenId,
		shopDetails:info,
		fkCcoicId:pkId,
		pkId:shopId
	}
	let url = HTTP + 'mat/changeBusinessDetails'
	if(!!qs.stringify(json_array)){
		return $axios.post(url,qs.stringify(json_array),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 上传申请表
export async function upDoc(obj) {
	let url =  HTTP + 'aon/uploadApply';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家申请审核
export async function shopReview(obj) {
	let url =  HTTP + 'mat/passAuditForUnit';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家申请审核
export async function showReview(obj) {
	let url =  HTTP + 'businessApply/getBusinessApply';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 商家申请审核
export async function passReview(obj) {
	let url =  HTTP + 'businessAudit/passAuditForUnit';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	}
}

// 微信
export async function fWechatLogin(id,lj) {
  let appid = id;
  let redirect_uri = encodeURIComponent("http://xyxh.fryxy.cn/admin/#/"+lj);
  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" +redirect_uri+ "&response_type=code&scope=snsapi_base#wechat_redirect";
}

// 获取vue URL中的数据
export function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

// 获取微信appid
export function getWeChat(obj){
	let url =  HTTP + 'associationWeChat/weChatAuthorization';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

export function getAppId(obj){
	let url =  HTTP + 'associationWeChat/getAssociationWeChatAppId';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

// 微信支付
export function getWXPay(obj){
	let url =  HTTP + 'wechatServer/unifiedOrder';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

// 获取短信充值
export function getSMSCost(){
	let url =  HTTP + 'associationSms/getRechargeTypeList';
	return $axios.post(url,{emulateJSON: true},{
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
}

export function getSMSNum(obj){
	let url =  HTTP + 'associationSms/smsRecharge';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

// 获取短信记录
export function getSMSData(obj){
	let url =  HTTP + 'associationSms/getSendRecord';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

// 加入黑名单
export function addBlackList(obj){
	let url =  HTTP + 'consumerManage/consumerBlacklist';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}

// 活动详情
export function getActPayment(obj){
	let url =  HTTP + 'associationActivity/getActivityRegistrationRecord';
	if(!!qs.stringify(obj)){
		return $axios.post(url,qs.stringify(obj),{emulateJSON: true},{
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
	};
}