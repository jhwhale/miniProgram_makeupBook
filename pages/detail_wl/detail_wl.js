// pages/detail_wl/detail_wl.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    imgPath: "../../images/plus.png",
    name: "",
    color: "",
    comment: "",
    status:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    if (params['id'] != 'new') {      //如果不是新建，打开相应页面
      var id = params['id']
      var value = wx.getStorageSync(id)
      this.setData({
        name: value.name,
        imgPath: value.imgPath,
        color: value.color,
        comment: value.comment,
        id: value.id,
      })
    }
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

  chooseImg: function () {
    var that = this
    wx.chooseImage({
      // sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: "compressed",
      count: 1,
      success: function (res) {
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },

  submit: function (e) {
    var id = this.data.id
    var objData = e.detail.value
    console.log(objData)
    //将图片路径加入objData
    Object.assign(objData, { imgPath: this.data.imgPath })
    //将状态设置为‘wishlist’
    Object.assign(objData, {status:"wl"})

    if (objData.name) {//如果已经输入了name
      if (id != "") {//如果是修改已有数据
        console.log('update')

        Object.assign(objData, { id: id })
        wx.setStorageSync(id, objData)

      } else {//如果是新建数据
        console.log("new")

        //将时间戳作为id加入objData
        var key = app.getTimeStamp()
        Object.assign(objData, { id: key })

        //以时间戳为key，将数据存入缓存
        wx.setStorageSync(
          key,
          objData
        )
      }

      wx.reLaunch({
        url: '../wishlist/wishlist',
      });
    } else {
      wx.showToast({
        title: '!!!未输入产品名称!!!',
        icon: 'none',
      });
    }
  },

  cancel: function (e) {
    wx.showModal({
      content: '确定不保存？',
      confirmText: "不保存",
      cancelText: "再改改",
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },

  bought: function(){
    
  }
})