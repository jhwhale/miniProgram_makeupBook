// pages/edit/edit.js

/*
TODOs:
没添加图片的设置默认图片 done
设置开启开关，打开后方可进入使用状态，关闭时为库存状态
增加完成开关，打开后方可设置完成日期 done
设置为完成并保存后，数据进入‘完成列表页‘
*/
const app = getApp()

const ctx = wx.createCanvasContext('cover-preview');
var start_position = {};//移动图片时手指起始坐标
var tempFilePath;//图片路径
var tempWidth;//图片初始宽度
var tempHeight;//图片初始高度
var old_x = 0;//图片初始x坐标
var old_y = 0;//图片初始y坐标
var _touches = 1;//触屏的手指数
var old_scale = 1;//原始放大倍数
var new_scale = 1;//新的放大倍数
var is_move = false;//是否移动
var bg_url;

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

  // chooseImg: function () {
  //   var that = this
  //   wx.chooseImage({
  //     sizeType: "original",//compressed
  //     count: 1,
  //     success: function (res) {
  //       that.setData({
  //         imgPath: res.tempFilePaths[0]
  //       })
  //     }
  //   })
  // },

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

      // wx.reLaunch({
      //   url: '../index/index',
      // });
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

  // chooseImg: function () {
  //   var that = this;
  //   wx.showModal({
  //     title: '提示',
  //     content: '更改我的封面',
  //     confirmColor: '#39bae8',
  //     success: function (res) {
  //       if (res.confirm) {


  //         wx.chooseImage({
  //           count: 1, // 默认9
  //           sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //           sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //           success: function (res0) {

  //             tempFilePath = res0.tempFilePaths[0];
  //             that.setData({
  //               hide_canvas: false,
  //               // edit_url: tempFilePath
  //             })
  //             wx.getImageInfo({
  //               src: tempFilePath,
  //               success: function (res) {
  //                 // console.log(res.width)
  //                 // console.log(res.height)
  //                 tempWidth = res.width;
  //                 tempHeight = res.height;
  //                 ctx.drawImage(tempFilePath, 0, 0, 375, res.height / res.width * 375);
  //                 ctx.draw();
  //               }
  //             })

  //           }
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
  // //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态
  // canvas_start: function (e) {
  //   // console.log(e);
  //   var touches = e.touches.length;
  //   if (touches == 1) {
  //     _touches = 1;
  //     start_position = { x: e.touches[0].x, y: e.touches[0].y, timeStamp: e.timeStamp }
  //   } else if (touches == 2) {
  //     _touches = 2;
  //     start_position = { x: e.touches[0].x, y: e.touches[0].y, x1: e.touches[1].x, y1: e.touches[1].y, timeStamp: e.timeStamp }
  //   } else {
  //     _touches = 1;
  //   }
  // },
  // //监听手指移动事件，并做出相应调整
  // canvas_move: function (e) {
  //   // console.log(e);
  //   var touches = e.touches.length;
  //   if (_touches == 1 && e.timeStamp - start_position.timeStamp > 150) {
  //     ctx.drawImage(tempFilePath, old_x + e.touches[0].x - start_position.x, old_y + e.touches[0].y - start_position.y, 375 * new_scale, tempHeight / tempWidth * 375 * new_scale);
  //     ctx.draw();
  //     is_move = true;
  //   } else if (_touches == 2 && e.timeStamp - start_position.timeStamp > 150) {
  //     var change_x = Math.abs(Math.abs(e.touches[0].x - e.touches[1].x) - Math.abs(start_position.x - start_position.x1));
  //     var change_y = Math.abs(Math.abs(e.touches[0].y - e.touches[1].y) - Math.abs(start_position.y - start_position.y1));
  //     if (change_x - change_y > 10) {
  //       old_scale = Math.abs(e.touches[0].x - e.touches[1].x) / Math.abs(start_position.x - start_position.x1);
  //     } else {
  //       old_scale = Math.abs(e.touches[0].y - e.touches[1].y) / Math.abs(start_position.y - start_position.y1);
  //     }
  //     ctx.drawImage(tempFilePath, old_x, old_y, 375 * old_scale * new_scale, tempHeight / tempWidth * 375 * old_scale * new_scale);
  //     ctx.draw();
  //     is_move = true;
  //   } else {
  //     is_move = false;
  //   }
  // },
  // //监听手指离开动作，并保存当前状态数据
  // canvas_end: function (e) {
  //   // console.log(e);
  //   if (_touches == 1 && is_move) {
  //     old_x = old_x + e.changedTouches[0].x - start_position.x;
  //     old_y = old_y + e.changedTouches[0].y - start_position.y;
  //   } else if (_touches == 2 && is_move) {
  //     new_scale = old_scale * new_scale;
  //   }

  // },
  // //确定并上传背景图
  // upload_bg: function () {
  //   var that = this;
  //   var screenWidth = wx.getSystemInfoSync().screenWidth;
  //   // console.log(screenWidth);
  //   wx.canvasToTempFilePath({
  //     x: 0,
  //     y: screenWidth / 750 * 400,
  //     width: screenWidth,
  //     height: screenWidth / 750 * 526,
  //     destWidth: screenWidth,
  //     destHeight: screenWidth / 750 * 526,
  //     quality: 1,
  //     canvasId: 'cover-preview',
  //     success: function (res) {
  //       that.setData({
  //         hide_canvas: true,
  //         imgPath: res.tempFilePath
  //       })
  //       //res.tempFilePath即为生成的图片路径
  //       console.log('upload_bg: ', res.tempFilePath)

  //     }
  //   })
  // },
  // //取消图片预览编辑
  // cancel_croper: function () {
  //   ctx.clearActions();
  //   this.setData({
  //     hide_canvas: true,
  //     // edit_url: tempFilePath
  //   })
  // },
})