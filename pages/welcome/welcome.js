
Page({
  data: {
    nickName: "",
    myuser: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  bindGetUserInfo(e) {
    var that = this
    if (e.detail.userInfo) {
      console.log("success")
      wx.request({
        url: 'http://127.0.0.1:8080/xcx/addUserLog',
        method: 'POST',
        data: {
          nickname: this.data.myuser.nickName, 
          openid: this.data.openid, 
          remark:"小程序登录成功"
        },
      })







      wx.switchTab({
       url: '../activityhall/activityhall' }) 
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝授权，为了更好的用户体验，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },



  onShow: function () {

    /**获取OpenID */
    this.setData({
      openid: wx.getStorageSync("OpenId"),

    });
    console.log(this.data.openid)
    /**获取微信名 */
    this.setData({
      myuser: wx.getStorageSync("info"),

    });
    console.log(this.data.myuser.nickName)

   },



})



 