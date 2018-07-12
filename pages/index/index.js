//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[{test:"test"}]
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
    console.log("templist: ",tempList)
    console.log("list before: ",this.data.list)
    this.setData({
      list: tempList,
    }) 
    console.log("list after: ", this.data.list)
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
      url: '../edit/edit',
    })
  },

  refresh:function(){
    try {
      var res = wx.getStorageInfoSync()
      console.log(res.keys)
      console.log(res.currentSize)
      console.log(res.limitSize)
    } catch (e) {
      // Do something when catch error
    }
  },

  clear:function(){
    wx.clearStorageSync()
  },

  getAllProduct:function(){
    try {
      var res = wx.getStorageInfoSync()
      console.log(res.keys)
    } catch (e) {
      wx.showToast({
        title: '!!!出问题啦，请待会儿再试!!!',
        icon: 'none',
      });
    }

    for (var i = 0; i < res.keys.length;i++){
      console.log("key: " + res.keys[i])
      
      this.data.list.push(wx.getStorageSync(res.keys[i]))
      this.setData({
        list:this.data.list
      })
      // console.log("list: "+this.data.list[i])
      console.log(this.data.list)//array.object
    }

  },

})

