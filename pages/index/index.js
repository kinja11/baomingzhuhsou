//index.js
//获取应用实例
const app = getApp()
let net =require("../../utils/netutils.js")
var appid = "wxcc761742d77e945b"
var secret = "c9815aa26d7d2b544e1b971c67e597f1"
const rootDocment = 'http://localhost:8080';//你的域名  




Page({
  data: {
    welcome:'欢迎',
    title:'报名助手',

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  
  
  
  uploadImg() {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var file = res.tempFilePaths[0]
        net.upImg(file, function (e) {
          var userInfo = that.data.userInfo
          userInfo.avatarUrl = rootDocment + e
          that.setData({ userInfo: userInfo })
        })
      },
    })
  },

  enterActivityHall() {
   
    wx.switchTab({
  
      url: '../activityhall/activityhall',
    })
  },




  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../activityhall/activityhall'
    })
  },
  onLoad: function () {


    wx.login({
      success: res => {
        net.getOpenid(appid, secret, res.code, function (e) {
          var openid = e.openid
          wx.setStorageSync("OpenId", openid);
          wx.getSetting({
            success: s => {
              if (s.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: u => {
                    var user = u.userInfo
                    net.wxLogin(openid, user.nickName, user.avatarUrl, function (w) {
                      console.log(w)
                    })
                  }
                })
              } else {
                console.log("sadae")
                wx.redirectTo({ url: '../welcome/welcome', })
              }
            },
            fail: f => {
              console.log(f)
            }
          })

          //net.wxLogin(e.openid,)
        })
      }

    })



 


























    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
