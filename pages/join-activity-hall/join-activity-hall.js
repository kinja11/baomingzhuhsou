// pages/join-activity-hall/join-activity-hall.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityid: "",
    activity: [],
    joinerName:"",
    joinerSex:"",
    joinerPhoneNumber:"",
    nickName: "",
    myuser: [],
    activityName: "",
    activityDate: "",

    radioItems:[
      {name:'男',value:'男'},
      { name: '女', value: '女', },
    ]


},
//输入姓名
  inputName: function (e) {
   
    /*var activityName = e.currentTarget.dataset.activityname
    var activityDate = e.currentTarget.dataset.activitydate */
   
    this.setData({
      joinerName: e.detail.value
    })
  },
  //输入性别
radioChange:function(e){
  this.setData({
    joinerSex: e.detail.value
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
        joinersex:this.data.joinerSex,
        joinerphone:this.data.joinerPhoneNumber
      },
      success: function (res) {
        var i = res.data;
        console.log(i);
        wx.showToast({
          title: '报名成功！',
          duration: 5000
})
       
      },
      
    })

  },


 

returnActivityHall:function(){
  wx.switchTab({
        url: '../activityhall/activityhall',
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
})