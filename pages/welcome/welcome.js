
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e) {
    var that = this
    if (e.detail.userInfo) {
      console.log("success")
      
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
})