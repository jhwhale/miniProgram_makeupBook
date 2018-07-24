//index.js

/*
TODOs:
删除功能
搜索功能
*/

//获取应用实例
const app = getApp()

Page({
  data: {
    list:[]
  },

  onLoad: function () {

  },

  onShow: function(){
    try {
      var res = wx.getStorageInfoSync()
    } catch (e) {
      wx.showToast({
        title: '!!!getStorageInfoSync出问题啦!!!',
        icon: 'none',
      });
    }

    var tempList = [];
    for (var i = 0; i < res.keys.length; i++) {
      try {
        var value = wx.getStorageSync(res.keys[i])
        if (value.status == 2) {
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

  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  addNew:function(){
    wx.navigateTo({
      url: '../edit/edit?id=new&status=2',
    })
  },

  done:function(e){
    var id = e.currentTarget.id
    var value = wx.getStorageSync(id)
    value.status=3
    wx.setStorageSync(id, value)
    this.onShow()
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

  clear:function(){
    wx.clearStorageSync()
  },


  openEditPage: function(e){
    wx.navigateTo({
      url: '../edit/edit?id='+e.currentTarget.id+'&status=2',
    })
  },

})

