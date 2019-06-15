//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    proList: [
      {
        title: '日料',
        desc: '2019-05-29',
        detail: '关于活动详细介绍',
        location: '楚河汉街111号'
      }
    ],

    mdTextHidden: true,
    select: false,
  },
  //事件处理函数
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  selectType(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      tihuoWay: name,
      select: false
    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {

  },

})


