// pages/join-activity-hall/join-activity-hall.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  
  //点击创建活动绑定事件
  handleSubmit() {
    console.log(this.staticData);
    if (!this.staticData.name) {
      $Toast({
        content: '请填写姓名',
        icon: 'warning',
        duration: 2
      })
    } else if (!this.staticData.contact == "请填写联系方式") {
      $Toast({
        content: '请填写联系方式',
        icon: 'warning',
        duration: 2
      })
    }
    else {
      $Toast({
        content: '成功!等待审核',
        icon: 'success',
        duration: 2
      })
    }
    return;
    console.log(this.staticData);
  }
})