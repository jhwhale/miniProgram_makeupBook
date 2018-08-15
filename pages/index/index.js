//index.js
// import tempObj from '../common/searchBar'
/*
TODOs:
删除功能
搜索功能
*/

//获取应用实例
const app = getApp()

Page({
  data: {
    list:[],
    idList:[]
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
    var ids = []
    for (var i = 0; i < res.keys.length; i++) {
      try {
        var value = wx.getStorageSync(res.keys[i])
        if (value.status == 2) {
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
    console.log('id list: ',this.data.idList)
  },

  addNew:function(){
    wx.navigateTo({
      url: '../edit/edit?id=new&status=2',
    })
  },

  done:function(id){
    var value = wx.getStorageSync(id)
    value.status=3
    wx.setStorageSync(id, value)
    this.onShow()
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

  clear:function(){
    wx.clearStorageSync()
  },


  openEditPage: function(e){
    wx.navigateTo({
      url: '../edit/edit?id='+e.currentTarget.id+'&status=2',
    })
  },

  showActionSheet: function(e){
    console.log(e)
    var id = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: ['已用完', '删除'],
      success: function (res) {
        switch (res.tapIndex){
          case 0:that.done(id);break;
          case 1:that.delete(id);break;
        }
      }
    })
  }
})