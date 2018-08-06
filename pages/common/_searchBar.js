var temp={
  data:{
    keyword:''
  },

  getKeyword:function(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  search: function () {
    var keyword = this.data.keyword
    console.log(keyword)
    wx.navigateTo({
      url: '../searchResult/searchResult?keyword='+keyword,
    })
  }
}
export default temp