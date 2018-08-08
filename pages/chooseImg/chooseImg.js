// pages/test/test.js
/*
TODOs:
图片旋转
*/
// var Base64 = require("../../utils/base64.js");
const upng = require('../../utils/UPNG.js')

const ctx = wx.createCanvasContext('cover-preview');
var start_position;//移动图片时手指起始坐标
var old_position;//上一次移动结束时手指的坐标
var tempFilePath;//图片路径
var tempWidth;//源图片宽度
var tempHeight;//源图片高度
var showHeight = 0;//图片显示高度
var showWidth = 0;//图片显示宽度
var old_x = 0;//图片初始x坐标
var old_y = 0;//图片初始y坐标
var _touches = 1;//触屏的手指数
var scale = 1;//缩放倍数
var is_move = false;//是否移动
var screenWidth = wx.getSystemInfoSync().screenWidth;
var windowHeight = 0;//可用屏幕高度。无法通过wx.getSystemInfoSync()获得正确高度，所以在onReady()中获取
var widthHeightRatio = 1;//图片宽高比

Page({
  data: {
    btmHeight: 0,//底端蒙版的高度
  },

  onReady: function () {//获取可用屏幕高度
    wx.getSystemInfo({
      success(res) {
        windowHeight = res.windowHeight
      }
    });
    this.setData({
      btmHeight: windowHeight - windowHeight * 0.2 - screenWidth * 0.8//底端蒙版的高度=可用屏幕高度-顶部蒙版高度-图片选框高度
    })
  },
  
  onLoad: function () {
    this.chooseImg()
  },

  chooseImg: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 选择图片的数量
      sizeType:  'compressed', // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        tempFilePath = res.tempFilePaths[0];
        // var Path = Base64.CusBASE64.encoder(tempFilePath);
        // console.log("tempFilePath: ", tempFilePath,"本地图片路径base6458：", Path);

        wx.getImageInfo({
          src: tempFilePath,
          success: function (res) {
            tempWidth = res.width;
            tempHeight = res.height;
            widthHeightRatio = tempWidth / tempHeight

            if (widthHeightRatio <= 1) {//如果是竖图,适应屏幕宽度
              showWidth = screenWidth
              showHeight = screenWidth / widthHeightRatio
              old_x = 0
              old_y = (windowHeight - showHeight) / 2
            } else {//如果是横图，适应选择框高度
              showWidth = screenWidth * 0.8 * widthHeightRatio
              showHeight = screenWidth * 0.8
              old_x = (screenWidth - showWidth) / 2
              old_y = windowHeight * 0.2//选框位于屏幕可用高度的20%，宽度的10%处，宽高均为屏幕宽度的80%
            }
            ctx.drawImage(tempFilePath, old_x, old_y, showWidth, showHeight);
            ctx.draw();
          }
        })
      }
    })
  },

  //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态
  canvas_start: function (e) {
    // console.log('start: ',e);
    var touches = e.touches.length;
    if (touches == 2) {
      _touches = 2;
      start_position = { x: e.touches[0].x, y: e.touches[0].y, x1: e.touches[1].x, y1: e.touches[1].y }
    } else{
      _touches = 1;
      start_position = { x: e.touches[0].x, y: e.touches[0].y }      
    } 
    old_position = start_position
  },

  //监听手指移动事件，并做出相应调整
  canvas_move: function (e) {
    // console.log('move: ',e);
    var touches = e.touches.length;
    if (_touches == 1) {
      ctx.drawImage(tempFilePath, old_x + e.touches[0].x - start_position.x, old_y + e.touches[0].y - start_position.y, showWidth, showHeight);
      ctx.draw();
      is_move = true;
    } else if (_touches == 2) {
      var change_x = Math.abs(Math.abs(e.touches[0].x - e.touches[1].x) - Math.abs(old_position.x - old_position.x1));//本次与上次缩放的长度差
      var change_y = Math.abs(Math.abs(e.touches[0].y - e.touches[1].y) - Math.abs(old_position.y - old_position.y1));
      if (change_x - change_y > 10) {
        scale = Math.abs(e.touches[0].x - e.touches[1].x) / Math.abs(old_position.x - old_position.x1);
      } else {
        scale = Math.abs(e.touches[0].y - e.touches[1].y) / Math.abs(old_position.y - old_position.y1);
      }
      showWidth = showWidth * scale
      showHeight = showHeight * scale
      ctx.drawImage(tempFilePath, old_x, old_y, showWidth, showHeight);
      ctx.draw();
      old_position = { x: e.touches[0].x, y: e.touches[0].y, x1: e.touches[1].x, y1: e.touches[1].y }
      is_move = true;
    } else {
      is_move = false;
    }
  },
  //监听手指离开动作，并保存当前状态数据
  canvas_end: function (e) {
    // console.log('end: ',e);
    if (_touches == 1 && is_move) {
      old_x = old_x + e.changedTouches[0].x - start_position.x;
      old_y = old_y + e.changedTouches[0].y - start_position.y;
    } else if (_touches == 2 && is_move) {
    }

  },
  //确定并上传背景图
  upload_bg: function () {
    var that = this;

    wx.canvasGetImageData({
      canvasId: 'cover-preview',
      x: screenWidth / 10,
      y: windowHeight / 5,
      width: screenWidth * 0.8,
      height: screenWidth * 0.8,
      success(res) {
        console.log(res)
        // 3. png编码
        let pngData = upng.encode([res.data.buffer], res.width, res.height)
        // 4. base64编码
        let base64 = 'data:image/jpg;base64,'+ wx.arrayBufferToBase64(pngData)
        // console.log('base64: ',base64)
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面

        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          imgPath: base64
        })

        wx.navigateBack({
          delta: 1
        })
      }
    })

    // wx.canvasToTempFilePath({//把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
    //   x: screenWidth/10,
    //   y: windowHeight/5,
    //   width: screenWidth*0.8,
    //   height: screenWidth * 0.8,
    //   destWidth: screenWidth * 0.8,
    //   destHeight: screenWidth * 0.8,
    //   quality: 1,
    //   canvasId: 'cover-preview',
    //   success: function (res) {
    //     // wx.saveImageToPhotosAlbum({
    //     //   filePath: res.tempFilePath,
    //     // })
    //     // var Path = Base64.CusBASE64.encoder(res.tempFilePath);
    //     // console.log("tempFilePath: ", tempFilePath,"本地图片路径base6458：", Path);

    //     var pages = getCurrentPages();
    //     var prevPage = pages[pages.length - 2];  //上一个页面

    //     //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    //     prevPage.setData({
    //       imgPath: res.tempFilePath
    //     })

    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }
    // })
  },
  //取消图片预览编辑
  cancel_croper: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})