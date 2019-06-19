// pages/activity-details/activity-details.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid : "",
    getByIDURL: "http://127.0.0.1:8080/xcx/findByActivityId/",
    activity: [],
    activityName: "",
    activityDate: "",
    nickName: "",
    avatarUrl: '',
    myInfo: [],


  },

 
  
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 28
        })
      }
    })
  },

  //事件处理函数
  abde(e) {
    



    var activityname = e.currentTarget.dataset.activityname
    wx.setStorageSync("activityName", activityname);
   
    
    var activitypublishdate =      e.currentTarget.dataset.activitypublishdate
    wx.setStorageSync("activityPublishDate", activitypublishdate);


  },

 cdef: function (res) {
    if (res.detail.userInfo) {
      this.data.myInfo = res.detail.userInfo;
    }
    wx.setStorageSync("info", this.data.myInfo);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**获取活动ID */
    this.setData({
      activityid: wx.getStorageSync("activityId"),

    });
    /**获取OpenID */
    this.setData({
      openid: wx.getStorageSync("OpenId"),

    });
  
    /**获取微信名 */
    this.setData({
      myuser: wx.getStorageSync("info"),

    });
   
   
   
    var that = this;
    wx.request({
      url: this.data.getByIDURL + this.data.activityid,
      method: "GET",
      data: {},
      success: function (res) {
        var myuser = res.data;
        that.setData({
          activity: myuser
        });
       
      
      }
    })
  },

  

  handleSubmit: function () {
    //console.log(this.data.activityName + this.data.activityDate)
    wx.request({
      url: 'http://127.0.0.1:8080/xcx/addUserCollect',
      method: 'POST',
      data: {
        nickname: this.data.myuser.nickName,
        ac_id: this.data.activityid,
        openid: this.data.openid,
        
      },
      success: function (res) {
        var i = res.data;
        console.log(i);
        wx.showToast({
          title: '收藏成功！',
          duration: 3000
        })

      },
    })
  },



 


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  //点击报名活动绑定事件
  
 
})