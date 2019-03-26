// pages/index/index.js
let windowWidth = 0;
let itemWidth = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderOffset: 0,
    sliderOffsets: [],
    sliderLeft: 0,
    tabs:["TAB1","TAB2","TAB3","TAB4"],
    tab1Index:0,
    colors: ["#DC143C", "#0000CD", "#00BFFF","#FFA500"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.clueOffset();
  },

  /**
   * 计算偏移量
   */
  clueOffset(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        itemWidth = Math.ceil(res.windowWidth / that.data.tabs.length);
        let tempArr = [];
        for (let i in that.data.tabs){
          console.log(i)
          tempArr.push(itemWidth*i);
        }
        // tab 样式初始化
        windowWidth = res.windowWidth;
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - 50) / 2,
          sliderOffsets: tempArr,
          sliderOffset: 0
        });
      }
    });
  },

  /**
   * tabItme点击
   */
  onTab1Click(event){
    let index = event.currentTarget.dataset.index;
    this.setData({
      sliderOffset: this.data.sliderOffsets[index],
      tab1Index: index,
    })
  },

  /**
   * swiper-item 的位置发生改变
   */
  swiperTran(event){
    
    let dx = event.detail.dx;
    let index = event.currentTarget.dataset.index;
    if(dx>0){ //----->
       if(index<this.data.tabs.length-1){   //最后一页不能---->
          let ratio = dx/windowWidth;   /*滑动比例*/
          let newOffset = ratio*itemWidth+this.data.sliderOffsets[index];
          // console.log(newOffset,",index:",index);
         this.setData({
           sliderOffset: newOffset,
         })
       } 
    }else{  //<-----------
      if (index > 0) {    //最后一页不能<----
        let ratio = dx / windowWidth;   /*滑动比例*/
        let newOffset = ratio * itemWidth + this.data.sliderOffsets[index];
        console.log(newOffset, ",index:", index);
        this.setData({
          sliderOffset: newOffset,
        })
      }
    }

  },

  /**
   * current 改变时会触发 change 事件
   */
  swiperChange(event){
    // this.setData({
    //   sliderOffset: this.data.sliderOffsets[event.detail.current],
    //   tab1Index: event.detail.current,
    // })
  },
  /**
   * 动画结束时会触发 animationfinish 事件
   */
  animationfinish(event){
    this.setData({
      sliderOffset: this.data.sliderOffsets[event.detail.current],
      tab1Index: event.detail.current,
    })
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

  }
})