// pages/publish-settings/publish-settings.js
const net = require('../../utils/netutils.js')
var activityName=""
var activityAddress=""
var activityPublishDate=""
var activityDetail=""
var activityCreator=""
var activityCreatorPhoneNumber=""
var activityStartDate=""
var activityEndDate=""




Page({


  data: {
    activityid: "",
    getByIDURL: "http://127.0.0.1:8080/xcx/findByActivityId/",
    activity: [],
    postByupdateIDURL: "http://127.0.0.1:8080/xcx/updateUserPublish/",
  },

  updateName: function (e) {
    this.setData({
      activityName: e.detail.value
    })
  },

  updateAddress: function (e) {
    this.setData({
      activityAddress: e.detail.value
    })
  },
  updateDate: function (e) {
    let value = e.detail.value;
    this.setData({
      date: value,
      activityDate: e.detail.value
    });
  }, 
  updateDetail: function (e) {
    this.setData({
      activityDetail: e.detail.value
    })
  }, 
 
  updateCreator: function (e) {
    this.setData({
      activityCreator: e.detail.value
    })
  },
  updatePhoneNumber: function (e) {
    this.setData({
      activityCreatorPhoneNumber: e.detail.value
    })
  }, 
  
  updateStartDate: function (e) {
    let value = e.detail.value;
    this.setData({
      startdate: value,
      activityStartDate: e.detail.value
    });
  },
  updateEndDate: function (e) {
    let value = e.detail.value;
    this.setData({
      enddate: value,
      activityEndDate: e.detail.value
    });
  },
  
  
  
  
  
  
  
  
  
  //地址绑定事件、选择地址
  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },
  //地址绑定事件
  handleChooseLocationSucc(res) {
    // console.log(address)
    //console.log(res)
    if (!res.address) {
      this.setData({
        address: "点击选择地址"
      })
      this.handleAddressClick;
    }
    else {
      this.setData({
        address: res.name
      });
      Object.assign(this.staticData, {
        latitude: res.latitude,
        longitude: res.longitude
      })
    }
  },

  onLoad: function () {
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






  updateActivity: function () {
    var that = this;
    net.post("/xcx/updateUserPublish/" + this.data.activityid, {
      ac_name:this.data.activityName,
      ac_pdate:this.data.activityPublishDate,
      ac_del:this.data.activityDetail,
      ac_cre:this.data.activityCreator,
      ac_tel:this.data.activityCreatorPhoneNumber,
      ac_sdate:this.data.activityStartDate,
      ac_edate:this.data.activityEndDate

    },
      wx.navigateTo({
        url: '../publishHistory/publishHistory',
      })
    )
  },











  //转发分享活动
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '发起活动',
      path: '/pages/activity-details/activity-details'
    }
  },

  //下拉刷新函数，可省略
  onPullDownRefresh() {
    console.log("主页下拉刷新时使用的函数")
  },

  //
  checkboxChange(e) {
    this.staticData.type = e.detail.value
    //    console.log(e.detail.value)
    //    console.log(this.staticData.data)
  },

  //活动标题绑定事件
  handleTitle(e) {
    this.staticData.title = e.detail.value;
    this.setData({
      activityTitle: e.detail.value
    })
    //console.log(this.data.activityTitle)
    //console.log(this.staticData.title)

  },


  //人数绑定事件  绑定失败 延后
  handleNum(e) {
    this.staticData.peoplenum = e.detail.value;
    this.setData({
      num: e.detail.value
    })
  },

  //活动内容绑定事件
  handleDetail(e) {
    this.staticData.detail = e.detail.value;
    //    console.log(this.staticData.content)

  },

  //活动日期绑定事件
  handleData(e) {
    this.staticData.data = e.detail.value;
    //    console.log(this. staticData)

  },

  //活动联系人绑定事件
  handleCreator(e) {
    this.staticData.creator = e.detail.value;
    //    console.log(this. staticData)

  },

  //活动联系方式绑定事件
  handlePhonenum(e) {
    this.staticData.phonenum = e.detail.value;
    //    console.log(this. staticData)

  },

  //点击创建活动绑定事件
  handleSubmit() {
    console.log(this.staticData);
    if (!this.staticData.title) {
      wx.showToast({
        title: '请填写活动标题',
        icon: 'warn',
        duration: 2000
      })
    } else if (this.data.address == "点击选择地址" || !this.data.address) {
      wx.showToast({
        title: '请选择活动地址',
        icon: 'info',
        duration: 2000
      })
    } else if (!this.staticData.date == "请输入活动日期") {
      wx.showToast({
        title: '请填写活动日期',
        icon: 'info',
        duration: 2000
      })
    } else if (!this.staticData.detail == "请填写活动内容") {
      wx.showToast({
        title: '请填写活动内容',
        icon: 'info',
        duration: 2000
      })
    } else if (!this.staticData.creator == "请填写活动联系人") {
      wx.showToast({
        title: '请填写活动联系人',
        icon: 'info',
        duration: 2000
      })
    } else if (!this.staticData.phonenum == "请填写联系方式") {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'info',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '成功!等待审核',
        icon: 'info',
        duration: 2000
      })
    }
    return;
    console.log(this.staticData);
  }

})