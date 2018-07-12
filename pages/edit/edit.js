// pages/edit/edit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    openDate: '',
    hitpanDate: '',
    emptyDate: '',
    expireDate: ["3M", "6M", "12M", "24M", "36M","60M"],
    index:0,
    imgPath:"../../images/plus.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = this.getToday();
    this.setData({
      openDate: today,
      hitpanDate: today,
      emptyDate: today,
    })
  },

  getTimeStamp:function(){
    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    return timestamp;
  },

  getToday: function(){
    var timestamp = this.getTimeStamp();

    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var today = Y + "-" + M + "-" + D;

    return today;
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

  openDateChange: function (e) {
    this.setData({
      openDate: e.detail.value
    })
  },

  hitpanDateChange: function (e) {
    this.setData({
      hitpanDate: e.detail.value
    })
  },

  emptyDateChange: function (e) {
    this.setData({
      emptyDate: e.detail.value
    })
    console.log(e.detail.value)
  },

  expireDateChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  chooseImg: function () {
    var that = this
    wx.chooseImage({
      // sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: "compressed",
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },
  
  submit:function(e) {
    // var app = getApp();
    // console.log(app.globalData.list)
    console.log(e.detail.value)
    
    var objData = e.detail.value;
    if(objData.name){
      //如果没添加图片，将图片路径设置为空字符串
      if (this.data.imgPath == "../../images/plus.png"){
        this.setData({
          imgPath:""
        })
      }
      //将图片路径加入objData
      Object.assign(objData, {imgPath: this.data.imgPath})

      //以时间戳为key，将数据存入缓存
      wx.setStorageSync(
        this.getTimeStamp().toString(), 
        objData
        )

      // //将数据保存至globalData.list
      // var i = app.globalData.list.length;
      // app.globalData.list[i] = objData;
      // console.log(app.globalData.list);

      wx.reLaunch({
        url: '../index/index',
      });
    }else{
      wx.showToast({
        title: '!!!未输入产品名称!!!',
        icon:'none',
      });
    }
  },

  cancel:function(){
    wx.navigateBack({
      delta: 1,
    })
  }

})