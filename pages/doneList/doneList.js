// pages/doneList/doneList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    stepper: {
      stepper: 1,
      min: 1,
      max: 100,
      size: 'small'
    },
    copyId: ''
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
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status=3',
    })
  },

  showActionSheet: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: ['已回购'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0: that.boughtAgain(id); break;
        }
      }
    })
  },

  boughtAgain:function(id){
    this.setData({
      hiddenmodalput: false,
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

  cancelSetNum: function () {
    this.setData({
      hiddenmodalput: true
    })
  },

  confirm: function () {
    var that = this
    var amount = that.data.stepper.stepper
    var id = this.data.copyId
    var value = wx.getStorageSync(id)
    var name = value.name

    for (var i = 1; i < amount + 1; i++) {
      //将时间戳作为id加入objData
      var key = new Date().getTime().toString()
      value.id = key

      value.name = i + '.' + name
      value.status = 1

      //以时间戳为key，将数据存入缓存
      wx.setStorageSync(key, value)
    }

    this.setData({
      hiddenmodalput: true,
      'stepper.stepper': 1,
    })

    this.onShow()
  },
})