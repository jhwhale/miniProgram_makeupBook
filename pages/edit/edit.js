// pages/edit/edit.js

/*
TODOs:
没添加图片的设置默认图片 done
设置开启开关，打开后方可进入使用状态，关闭时为库存状态
增加完成开关，打开后方可设置完成日期 done
设置为完成并保存后，数据进入‘完成列表页‘
*/
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    openDate: '',
    hitpanDate: '',
    emptyDate: '',
    expireDate: '',
    imgPath:"../../images/plus.png",
    size:'',
    color:'',
    price:'',
    comment:'',
    status:0,//0:want,1:bought,2:using,3:done
    hide_canvas: true,//绘图层显示控制变量

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    if (params['status']) {     
      this.setData({ status: params['status'] })
    }
    
    if(params['id']=='new'){//如果是新建记录
      //添加新产品时，将picker中的日期设为当天日期
      var today = app.getToday();
      this.setData({
        expireDate:today,
        openDate: today,
        hitpanDate: '未空盘',
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
        expireDate: value.expireDate,
        imgPath: value.imgPath,
        size: value.size,
        color: value.color,
        price: value.price,
        comment: value.comment,
        id:value.id,
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
    // this.setData({
    //   imgPath:app.globalData.imgPath
    // })
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
      expireDate: e.detail.value
    })
  },

  submit: function(e) {
    var id = this.data.id
    var objData = e.detail.value
    
    //将图片路径加入objData
    Object.assign(objData, { imgPath: this.data.imgPath })

    //将状态加入objData
    Object.assign(objData, { status: this.data.status })

    if(objData.name){//如果已经输入了name
      if (id != "") {//如果是修改已有数据
        Object.assign(objData,{id:id})
        wx.setStorageSync(id, objData)
      }else{//如果是新建数据
        //将时间戳作为id加入objData
        var key = app.getTimeStamp()
        Object.assign(objData, { id: key })

        //以时间戳为key，将数据存入缓存
        wx.setStorageSync(key,objData)
      }

      wx.navigateBack({
        delta: 1,
      })
    }else{
      wx.showToast({
        title: '!!!未输入产品名称!!!',
        icon:'none',
      });
    }
  },


  cancelSave:function(e){
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

  chooseImg:function(){
    wx.navigateTo({
      url: '../chooseImg/chooseImg',
    })
  }

})