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
    copyId:'',
    idList:[]
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
    var ids =[]
    for (var i = 0; i < res.keys.length; i++) {
      try {
        var value = wx.getStorageSync(res.keys[i])
        if (value.status == 1) {//1:已购买
          tempList.push(value)
          ids.push(value.id)
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
      idList:ids
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
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=1',
    })
  },

  opened: function (id) {
    wx.navigateTo({
      url: '../edit/edit?id=' + id + '&status=2',
    })
  },

  delete: function (id) {
    var that = this
    wx.showModal({
      content: "是否删除该条记录？",
      confirmText: "删除",
      confirmColor:"#e84855",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync(id)
          that.onShow()
        }
      }
    })
  },

  copy: function (id) {
    this.setData({
      hiddenmodalput:false,
      copyId: id
    })
  },

  handleZanStepperChange({
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    detail: stepper
  }) {
    this.setData({
      'stepper.stepper': stepper
    });
  },

  cancelSetNum:function(){
    this.setData({
      hiddenmodalput: true,
      'stepper.stepper': 1
    })
  },

  confirm:function(){
    var that = this
    var amount = that.data.stepper.stepper
    var id = this.data.copyId
    var value = wx.getStorageSync(id)
    var name = value.name

    for(var i = 1;i<amount+1;i++){
      //将时间戳作为id加入objData
      var key = new Date().getTime().toString()
      value.id=key

      value.name = name+"("+i+")"

      //以时间戳为key，将数据存入缓存
      wx.setStorageSync(key, value)
    }

    this.setData({
      hiddenmodalput:true,
      'stepper.stepper':1,
    })

    this.onShow()
  },

  showActionSheet: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: ['将状态改为“已开封”','复制', '删除'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0: that.opened(id); break;
          case 1: that.copy(id); break;
          case 2: that.delete(id); break;
        }
      }
    })
  }
})