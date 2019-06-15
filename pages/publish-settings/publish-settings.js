// pages/publish-settings/publish-settings.js
Page({


  data: {
    items: [
      { name: "name1", value: "类型1" },
      { name: "name2", value: "类型2" },
      { name: "name3", value: "类型3" },
      { name: "name4", value: "类型4" },
      { name: "name5", value: "类型5" },
      { name: "name6", value: "类型6" },
    ],
    address: "点击选择地址",
    activityTitle: "请填写活动标题",
    num: "50"
  },

  //staticData用于存放和后端进行交互的活动的信息，包括活动标题，内容，类型，联系方式等
  staticData: {
    title: "",
    latitude: "",
    longitude: "",
    data: "",
    detail: "",
    creator: "",
    phonenum: "",
    peoplenum: "",

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
    /*this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })*/
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