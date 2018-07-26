// pages/wishingList/wishingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
        if (value.status == 0) {
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
      url: '../edit/edit?id=new&status=0',
    })
  },

  openEditPage: function (e) {
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=0',
    })
  },

  bought: function(e){
    wx.navigateTo({
      url: '../edit/edit?id='+e.currentTarget.id+'&status=1',
    })
  },

  delete: function(e){
    var that = this
    wx.showModal({
      content: "是否删除该条记录？",
      confirmText: "删除",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync(e.currentTarget.id)
          that.onShow()
        }
      }
    })  
  },

  
})