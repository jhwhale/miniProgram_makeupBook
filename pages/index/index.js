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
    try {
      var res = wx.getStorageInfoSync()
    } catch (e) {
      wx.showToast({
        title: '!!!getStorageInfoSync出问题啦!!!',
        icon: 'none',
      });
    }

    var tempList =[];
    for (var i = 0; i < res.keys.length; i++) {
      try {
        var value = wx.getStorageSync(res.keys[i])
        if (value) {
          tempList.push(value)
        }
      } catch (e) {
        wx.showToast({
          title: '!!!getStorageSync出问题啦!!!',
          icon: 'none',
        });
      }
    }
    // console.log("templist: ",tempList)
    // console.log("list before: ",this.data.list)
    this.setData({
      list: tempList,
    }) 
    // console.log("list after: ", this.data.list)
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
      url: '../edit/edit?id=new',
    })
  },


  clear:function(){
    wx.clearStorageSync()
  },


  openEditPage: function(e){
    wx.navigateTo({
      url: '../edit/edit?id='+e.currentTarget.id,
    })
  },

})

