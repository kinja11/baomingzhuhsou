
const net = require('../../utils/netutils.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    

    activity: [],
   
   
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   

    mdTextHidden: true,
    select:false,
  },
  //事件处理函数
  getIndex(e) {
    var id = e.currentTarget.dataset.activityid
    wx.setStorageSync("activityId", id);
  },
  
 
  
  
  
  
  
  onShow: function () {
   
  /**获取OpenID */
    this.setData({
      openid: wx.getStorageSync("OpenId"),

    });
    console.log(this.data.openid)



    var that = this;
    net.get( "/xcx/findUserJoinByOpenId", null, 
      
      function (res) {
        var myuser = res;
        
        that.setData({
          activity: myuser
        });

 
      }
  )
  },


  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    
  },
  
})


