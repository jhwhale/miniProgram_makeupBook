// pages/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    keyword:'',
    hiddenmodalput: true,
    stepper: {
      stepper: 1,
      min: 1,
      max: 100,
      size: 'small'
    },
    copyId: '',
    hideNote:true,
    hideResult:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword:options['keyword']
    })
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
    var tempList = []
    var res = wx.getStorageInfoSync()
    for (var index in res.keys) {
      var value = wx.getStorageSync(res.keys[index])
      var str = value.name + ',' + value.color + ',' + value.comment
      if (this.data.keyword.length!=0 && str.search(this.data.keyword) != -1) {
        tempList.push(value)
      }
    }
    if(tempList.length == 0){
      this.setData({
        hideNote:false,
        hideResult:true
      })
    }else{
      this.setData({
        hideNote:true,
        hideResult:false,
        list: tempList
      })
    }
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

  openEditPage:function(e){
    console.log('e: ',e)
    var value = wx.getStorageSync(e.currentTarget.id)
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.id + '&status='+value.status,
    })
  },

  showActionSheet:function(e){
    var id = e.currentTarget.id
    var status = e.currentTarget.dataset.status.toString()
    var that = this
    switch (status) {//0:want,1:bought,2:using,3:done
      case '0': 
        console.log('00')
        wx.showActionSheet({
          itemList: ['已购买', '删除'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0: that.bought(id); break;
              case 1: that.delete(id); break;
            }
          }
        });
        break;
          
      case '1': 
        wx.showActionSheet({
          itemList: ['已开封', '复制', '删除'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0: that.opened(id); break;
              case 1: that.copy(id);break;
              case 2: that.delete(id); break;
            }
          }
        });
        break;
      
      case '2': 
        wx.showActionSheet({
          itemList: ['已用完', '删除'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0: that.done(id); break;
              case 1: that.delete(id); break;
            }
          }
        });
        break;
      
      case '3': 
        wx.showActionSheet({
          itemList: ['已回购'],
          success: function (res) {
            switch (res.tapIndex) {
              case 0: that.boughtAgain(id); break;
            }
          }
        });
        break;
    }
  },
  bought: function (id) {
    wx.navigateTo({
      url: '../edit/edit?id=' + id + '&status=1',
    })
  },
  opened: function (id) {
    wx.navigateTo({
      url: '../edit/edit?id=' + id + '&status=2',
    })
  },
  copy: function (id) {
    this.setData({
      hiddenmodalput: false,
      copyId: id
    })
  },
  done: function (id) {
    var value = wx.getStorageSync(id)
    value.status = 3
    wx.setStorageSync(id, value)
    // this.onShow()
  },

  delete: function (id) {
    var that = this
    wx.showModal({
      content: "是否删除该条记录？",
      confirmText: "删除",
      confirmColor: "#e84855",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync(id)
          that.onShow()
        }
      }
    })
  },

  boughtAgain: function (id) {
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
      hiddenmodalput: true,
      'stepper.stepper': 1
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

      value.name = name + "(" + i + ")"

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