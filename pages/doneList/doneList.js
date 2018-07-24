// pages/doneList/doneList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
        if (value.status == 3) {
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

  openEditPage: function (e) {
    console.log('open edit page: ', e)
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=3',
    })
  },
})