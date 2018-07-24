// pages/stockPile/stockPile.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    hiddenmodalput:true,
    stepper: {
      stepper: 1,
      min: 1,
      max: 100,
      size: 'small'
    },
    copyId:''
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
    try {
      var res = wx.getStorageInfoSync()
    } catch (e) {
      wx.showToast({
        title: '!!!getStorageInfoSync出问题啦!!!',
        icon: 'none',
      });
    }

    //将状态为0(want)的数据保存至list
    var tempList = [];
    for (var i = 0; i < res.keys.length; i++) {
      try {
        var value = wx.getStorageSync(res.keys[i])
        if (value.status == 1) {//1:已购买
          tempList.push(value)
        }
      } catch (e) {
        wx.showToast({
          title: '!!!getStorageSync出问题啦!!!',
          icon: 'none',
        });
      }
    }
    this.setData({
      list: tempList,
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
  
  },

  addNew: function () {
    wx.navigateTo({
      url: '../edit/edit?id=new&status=1',
    })
  },

  openEditPage: function (e) {
    console.log('open edit page: ', e)
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=1',
    })
  },

  opened: function (e) {
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=2',
    })
  },

  delete: function (e) {
    var that = this
    wx.showModal({
      content: "是否删除该条记录？",
      confirmText: "删除",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorageSync(e.currentTarget.id)
          that.onShow()
        }
      }
    })
  },

  copy: function (e) {
    this.setData({
      hiddenmodalput:false
    })
    console.log('copy: ',e)
    var id = e.currentTarget.id
    this.setData({
      copyId:id
    })
  },

  handleZanStepperChange({
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    detail: stepper
  }) {
    this.setData({
      'stepper.stepper': stepper
    });
    console.log('stepper: ',this.data.stepper.stepper)
  },

  cancelSetNum:function(){
    this.setData({
      hiddenmodalput: true
    })
  },

  confirm:function(){
    var that = this
    var amount = that.data.stepper.stepper
    console.log('amount: ', amount)
    var id = this.data.copyId
    var value = wx.getStorageSync(id)

    for(var i = 0;i<amount;i++){
      console.log('i:', i)
      //将时间戳作为id加入objData
      var key = new Date().getTime().toString()
      console.log('key: ',key)
      value.id=key

      //以时间戳为key，将数据存入缓存
      wx.setStorageSync(key, value)
    }

    this.setData({
      hiddenmodalput:true
    })

    this.onShow()
  },

  getTime: function(){
    //第一种方法   1498627266000
    var timestamp1 = Date.parse(new Date());
    console.log(timestamp1);
    //第二种方法   1498627266558
    var timestamp2 = (new Date()).valueOf();
    console.log(timestamp2);
    //第三种方法   1498627266558
    var timestamp3 = new Date().getTime();
    console.log(timestamp3);
            
    var myDate = new Date();
    console.log(myDate.getFullYear()); //获取完整的年份(4位,1970-????)
    console.log(myDate.getMonth()); //获取当前月份(0-11,0代表1月)
    console.log(myDate.getDate()); //获取当前日(1-31)
    console.log(myDate.getDay()); //获取当前星期X(0-6,0代表星期天)
    console.log(myDate.getTime()); //获取当前时间(从1970.1.1开始的毫秒数)
    console.log(myDate.getHours()); //获取当前小时数(0-23)
    console.log(myDate.getMinutes()); //获取当前分钟数(0-59)
    console.log(myDate.getSeconds()); //获取当前秒数(0-59)
    console.log(myDate.getMilliseconds()); //获取当前毫秒数(0-999)
    console.log(myDate.toLocaleDateString()); //获取当前日期
    console.log(myDate.toLocaleTimeString()); //获取当前时间
    console.log(myDate.toLocaleString()); //获取日期与时间
  }
})