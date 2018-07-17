// pages/edit/edit.js

/*
TODOs:
没添加图片的设置默认图片
设置开启开关，打开后方可进入使用状态，关闭时为库存状态
增加完成开关，打开后方可设置完成日期
设置为完成并保存后，数据进入‘完成列表页‘
*/

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    name:'',
    openDate: '',
    hitpanDate: '',
    emptyDate: '',
    expireDate: ["3M", "6M", "12M", "24M", "36M","60M"],
    index:0,
    imgPath:"../../images/plus.png",
    size:'',
    color:'',
    price:'',
    comment:'',
    isOpened:true,
    isEmpty:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    if(params['id']=='new'){//如果是新建记录
      //添加新产品时，将picker中的日期设为当天日期
      var today = this.getToday();
      this.setData({
        openDate: today,
        hitpanDate: today,
        emptyDate: today,
      })
    }else{      //如果不是新建，打开相应页面
      var id = params['id']
      var value = wx.getStorageSync(id)
      this.setData({
        name: value.name,
        openDate: value.openDate,
        hitpanDate: value.hitpanDate,
        emptyDate: value.emptyDate,
        index: value.expireDate,
        imgPath: value.imgPath,
        size: value.size,
        color: value.color,
        price: value.price,
        comment: value.comment,
        id:value.id,
      })
      if (value.imgPath == "../../images/makeup.jpeg") {
        this.setData({
          imgPath: "../../images/plus.png"
        })
      }
    }
    


  },

  getTimeStamp:function(){
    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
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
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },
  
  

  submit: function(e) {
    var id = this.data.id.toString()
    var objData = e.detail.value
    
    if(objData.name){//如果已经输入了name
      if (id != 0) {//如果是修改已有数据
        console.log('update')
        //将图片路径加入objData
        Object.assign(objData, { imgPath: this.data.imgPath })
        Object.assign(objData,{id:id})
        wx.setStorageSync(id, objData)

      }else{//如果是新建数据
        console.log("new")
        //如果没添加图片，将图片路径设置为空字符串
        if (this.data.imgPath == "../../images/plus.png") {
          this.setData({
            imgPath: "../../images/makeup.jpeg"
          })
        }

        //将图片路径加入objData
        Object.assign(objData, { imgPath: this.data.imgPath })

        //将时间戳作为id加入objData
        var key = this.getTimeStamp().toString()
        Object.assign(objData, { id: key })

        //以时间戳为key，将数据存入缓存
        wx.setStorageSync(
          key,
          objData
        )
      }

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

  cancel:function(e){

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

  openChange:function(e){
    var openStatus = e.detail.value
    if(openStatus==true){
      this.setData({
        isOpened: openStatus,
      })
    }else{
      this.setData({
        isOpened:openStatus,
        isEmpty:false,
      })
    }

  },

  emptyChange:function(e){
    var emptyStatus = e.detail.value
    if(emptyStatus==true){
      this.setData({
        isOpened:true,
        isEmpty:emptyStatus,
      })
    } else {
        this.setData({
          isEmpty: emptyStatus,
        })
    }
  }
    
  
})