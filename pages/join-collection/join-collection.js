// pages/join-collection/join-collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid: "",

    activity: [],
    joinerName: "",
    joinerPhoneNumber: "",
    nickName: "",
    myuser: [],
    activityName: "",
    activityDate: "",
  },
  inputName: function (e) {

    /*var activityName = e.currentTarget.dataset.activityname
    var activityDate = e.currentTarget.dataset.activitydate */

    this.setData({
      joinerName: e.detail.value
    })
  },

  inputPhoneNumber: function (e) {
    this.setData({
      joinerPhoneNumber: e.detail.value
    })
  },



  showTopTips: function () {
    //console.log(this.data.activityName + this.data.activityDate)
    wx.request({
      url: 'http://127.0.0.1:8080/xcx/addUserJoin',
      method: 'POST',
      data: {
        nickname: this.data.myuser.nickName,
        ac_id: this.data.activityid,
        ac_name: this.data.activityName,
        ac_pdate: this.data.activityDate,
        openid: this.data.openid,
        realname: this.data.joinerName,
        joinerphone: this.data.joinerPhoneNumber
      },
      success: function (res) {
        var i = res.data;
        console.log(i);
        wx.showToast({
          title: '报名成功！',
          duration: 2000
        })
        },
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
    /**获取活动ID */
    this.setData({
      activityid: wx.getStorageSync("activityId"),

    });
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
    
    /**获取活动名 */
    this.setData({
      activityName: wx.getStorageSync("activityName"),

    });
    console.log(this.data.activityName)
    
    /**获取活动日期 */
    this.setData({
      activityDate: wx.getStorageSync("activityPublishDate"),

    });
    console.log(this.data.activityDate)
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

  //活动联系人绑定事件
  handleName(e) {
    this.staticData.name = e.detail.value;
    //    console.log(this. staticData)

  },
  //活动联系方式绑定事件
  handlePhonenum(e) {
    this.staticData.phonenum = e.detail.value;
    //    console.log(this. staticData)

  },

  //点击创建活动绑定事件
  handleSubmit() {
    wx.showToast(this.staticData);
      if (!this.staticData.name == "") {
      wx.showToast({
        title: '请填写活动联系人',
        icon: 'info',
        duration: 2000
      })
    } else if (!this.staticData.phonenum == "") {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'info',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '成功！请等待审核',
        icon: 'info',
        duration: 2000
      })
    }
    return;
    console.log(this.staticData);
  }

})