const rootDocment = 'http://localhost:8080';//你的域名  
let cookiejar = require('./cookiejar.js')
let CookieJar = cookiejar.CookieJar;
let CookieAccessInfo = cookiejar.CookieAccessInfo
let Cookie = cookiejar.Cookie;
let cookie_jar = new CookieJar()

function json2Form(json) {
  if(!json){
    return ''
  }
  var str = [];
  for (var p in json) {
    if(json[p]!=null)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function post(url, data, cb, is_login=false) {
  data = data || {}
  wx.request({
    url: rootDocment + url,
    data: json2Form(data),
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded', cookie: cookie_jar.getCookies(CookieAccessInfo.All).toValueString()},
    success: function (res) {     
      let cookies = res.header["Set-Cookie"] || res.header["set-cookie"]
      if(cookies){
        let cookie_login = null
        if(!is_login){
          cookie_login = cookie_jar.getCookie('JSESSIONID', CookieAccessInfo.All)
        }
        cookie_jar.setCookies(cookies)
        if(cookie_login){
          cookie_jar.setCookie(cookie_login)
        }
      } 
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}


function req_get(url, data, cb, is_login=false) {
  data = data||{}
  let full_url = rootDocment + url + '?' + json2Form(data)
  wx.request({
    url: full_url,
    method: 'get',
    header: { cookie: cookie_jar.getCookies(CookieAccessInfo.All).toValueString()},
    success: function (res) {
      let cookies = res.header["Set-Cookie"] || res.header["set-cookie"]
      if (cookies){
        let cookie_login = null
        if(!is_login){
          cookie_login = cookie_jar.getCookie('JSESSIONID', CookieAccessInfo.All)
        }
        cookie_jar.setCookies(cookies)
        if(cookie_login){
            cookie_jar.setCookie(cookie_login)
        }
      }
     
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function uploadImg(url, data, cb, is_login = false){
  let full_url = rootDocment + url
  wx.uploadFile({
    url: full_url,
    filePath: data,
    name: 'file',
    header: { cookie: cookie_jar.getCookies(CookieAccessInfo.All).toValueString() },
    success: function (res) {
      let cookies = res.header["Set-Cookie"] || res.header["set-cookie"]
      if (cookies) {
        let cookie_login = null
        if (!is_login) {
          cookie_login = cookie_jar.getCookie('JSESSIONID', CookieAccessInfo.All)
        }
        cookie_jar.setCookies(cookies)
        if (cookie_login) {
          cookie_jar.setCookie(cookie_login)
        }
      }

      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getOpenid(appid,secret,code,cb){
  post('/xcx/getOpenid', {app_id:appid,secret:secret,code:code}, cb)
}

function wxLogin(openid,nickName,headImg,cb){
  post('/xcx/wxLogin', { openid: openid, nickname: nickName, avatarimg:headImg}, cb)
}

function getUserInfo(cb){
  post("/getUserInfo",{},cb)
}

function upImg(filePath,cb){
  uploadImg("/uploadImg",filePath,cb)
}

module.exports = {
  post: post,
  get: req_get,
  base_address: rootDocment,
  wxLogin: wxLogin,
  getOpenid: getOpenid,
  getUserInfo: getUserInfo,
  upImg: upImg
}  