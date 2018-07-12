// pages/wishingList/wishingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus:false,
    list:[
      {
        id:0,
        name:"Html基础",
        introduce:"html简介",
        src:'http://wx2.sinaimg.cn/large/0062VF10ly1fmtz7uql1jj307l07lgme.jpg',
        showModalStatus:false,
        catalog:[
          {section:"1.html介绍"},
          {section:"2.标题"},
          {section:"3.分割线"},
          {section:"4.文字段落"}
        ]
      },
      {
        id:1,
        name:"css基础",
        introduce:"css简介",
        src:'http://ww4.sinaimg.cn/large/0062VF10jw1faci2p5sjcj30go0go0u3.jpg',
        showModalStatus: false,
        catalog:[
          { section: "1.css介绍" },
          { section: "2.字体颜色" },
          { section: "3.元素宽高" },
          { section: "4.背景颜色" }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var index = e.currentTarget.id;

    if(currentStatu == "open"){
      this.data.list[index].showModalStatus = true;
      this.setData({
        showModalStatus:true,
        list:this.data.list,
      });
    }

    if(currentStatu == "close"){
      this.data.list[index].showModalStatus = false;
      this.setData({
        showModalStatus:false,
        list:this.data.list,
      });
    }
  },

})