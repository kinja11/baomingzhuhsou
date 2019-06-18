const net = require('../../utils/netutils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid: "",
    getByIDURL: "http://127.0.0.1:8080/xcx/findByActivityId/",
    activity: [],
    postByIDURL: "http://127.0.0.1:8080/xcx/deleteUserJoin/"
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


 quitActivity: function () {

    var that = this;
    net.post("/xcx/deleteUserJoin/" + this.data.activityid, null,
      wx.navigateTo({
        url: '../joinHistory/joinHistory',
      })
    )

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