// pages/collection-detail/collection-detail
const net = require('../../utils/netutils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid: "",
    getByIDURL: "http://127.0.0.1:8080/xcx/findByActivityId/",
    activity: [],
    postByIDURL: "http://127.0.0.1:8080/xcx/deleteUserCollect/"



  },
  deleteUserCollect: function () {
    
    var that = this;
    net.post("/xcx/deleteUserCollect/" + this.data.activityid, null,
      wx.showToast({
        title: '取消成功！',
        duration: 5000
      })
    )

  },



  //事件处理函数
  abde(e) {
    var activityname = e.currentTarget.dataset.activityname
    wx.setStorageSync("activityName", activityname);
    var activitypublishdate = e.currentTarget.dataset.activitypublishdate
    wx.setStorageSync("activityPublishDate", activitypublishdate);
 
 
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
    this.setData({
      activityid: wx.getStorageSync("activityId"),

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