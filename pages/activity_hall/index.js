//index.js
//获取应用实例
const app = getApp()

var activityName = ""
var activityType = ""
var data = {}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mdTextHidden: true,
    select: false,

    index: 0,
    activityTypeList: ["不限", "团购拼单", "团体聚会", "信息登记", "自定义活动"],
    activityList: []



  },
  
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  //事件处理函数
  getName(e) {
    console.log(e)
    activityName = e.detail.value
  },
  bindPickerChange(e) {
    console.log(e)
    var index = e.detail.value
    activityType = this.data.activityTypeList[index] == "不限" ? '' : this.data.activityTypeList[index]
    this.setData({
      index: index
    })
    this.search()
  },

  search() {
    var that = this
    if (activityName != "" && activityType != "") {
      data = { activityName: activityName, activityType: activityType }
    } else if (activityName != "") {
      data = { activityName: activityName }
    } else if (activityType != "") {
      data = { activityType: activityType }
    }
    wx.request({
      url: "http://localhost:8080/xcx/searchActivity",
      method: "POST",
      data: data,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (e) {
        console.log(e.data)
        that.setData({
          activityList: e.data
        })
      }
    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    var that = this
    wx.request({
      url: "http://localhost:8080/xcx/searchActivity",
      method: "POST",
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (e) {
        console.log(e.data)
        that.setData({
          activityList: e.data
        })
      }
    })
  },

})


