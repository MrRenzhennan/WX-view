// pages/unaryTicketDetails/unaryTicketDetails.js

import * as echarts from '../../utils/ec-canvas/echarts';
var upColor = '#00da3c';
var downColor = '#ec0000';


function splitData(rawData) {
  var categoryData = [];
  var values = [];
  var volumes = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

var rawData = [
  ['2015-10-16', 18.4, 18.58, 18.33, 18.79, 67.00, 1, 0.04, 0.11, 0.09],
  ['2015-10-19', 18.56, 18.25, 18.19, 18.56, 55.00, 0, -0.00, 0.08, 0.09],
  ['2015-10-20', 18.3, 18.22, 18.05, 18.41, 37.00, 0, 0.01, 0.09, 0.09],
  ['2015-10-21', 18.18, 18.69, 18.02, 18.98, 89.00, 0, 0.03, 0.10, 0.08],
  ['2015-10-22', 18.42, 18.29, 18.22, 18.48, 43.00, 0, -0.06, 0.05, 0.08],
  ['2015-10-23', 18.26, 18.19, 18.08, 18.36, 46.00, 0, -0.10, 0.03, 0.09],
  ['2015-10-26', 18.33, 18.07, 17.98, 18.35, 65.00, 0, -0.15, 0.03, 0.10],
  ['2015-10-27', 18.08, 18.04, 17.88, 18.13, 37.00, 0, -0.19, 0.03, 0.12],
  ['2015-10-28', 17.96, 17.86, 17.82, 17.99, 35.00, 0, -0.24, 0.03, 0.15],
  ['2015-10-29', 17.85, 17.81, 17.8, 17.93, 27.00, 0, -0.24, 0.06, 0.18],
  ['2015-10-30', 17.79, 17.93, 17.78, 18.08, 43.00, 0, -0.22, 0.11, 0.22],
  ['2015-11-02', 17.78, 17.83, 17.78, 18.04, 27.00, 0, -0.20, 0.15, 0.25],
  ['2015-11-03', 17.84, 17.9, 17.84, 18.06, 34.00, 0, -0.12, 0.22, 0.28],
  ['2015-11-04', 17.97, 18.36, 17.85, 18.39, 62.00, 0, -0.00, 0.30, 0.30],
  ['2015-11-05', 18.3, 18.57, 18.18, 19.08, 177.00, 0, 0.07, 0.33, 0.30],
  ['2015-11-06', 18.53, 18.68, 18.3, 18.71, 95.00, 0, 0.12, 0.35, 0.29],
  ['2015-11-09', 18.75, 19.08, 18.75, 19.98, 202.00, 1, 0.16, 0.35, 0.27],
  ['2015-11-10', 18.85, 18.64, 18.56, 18.99, 85.00, 0, 0.09, 0.29, 0.25],
  ['2015-11-11', 18.64, 18.44, 18.31, 18.64, 50.00, 0, 0.06, 0.27, 0.23],
  ['2015-11-12', 18.55, 18.27, 18.17, 18.57, 43.00, 0, 0.05, 0.25, 0.23],
  ['2015-11-13', 18.13, 18.14, 18.09, 18.34, 35.00, 0, 0.05, 0.24, 0.22],
  ['2015-11-16', 18.01, 18.1, 17.93, 18.17, 34.00, 0, 0.07, 0.25, 0.21],
  ['2015-11-17', 18.2, 18.14, 18.08, 18.45, 58.00, 0, 0.11, 0.25, 0.20],
]
var data = splitData(rawData);


function initChart1(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#fff',
    animation: false,
    title: {
      text: '波段宝[30分钟K线] - 天银机电(3003420)',
      left: 'center',
      top:10,
      textStyle:{
        fontSize:14
      }
    },
    legend: {
      top: 35,
      left: 'center',
      data: ['MA5', 'MA10']
    },
    grid: [
      {
        left: '10%',
        right: '5%',
        height: '50%'
      },
      {
        left: '5%',
        right: '5%',
        top: '75%',
        height: '20%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'

      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],

    series: [
      {
        name: 'Dow-Jones index',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: null,
            borderColor0: null
          }
        },

      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, data),
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function initChart2(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#fff',
    animation: false,
    title: {
      text: '第二页',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 14
      }
    },
    legend: {
      top: 35,
      left: 'center',
      data: ['MA5', 'MA10']
    },
    grid: [
      {
        left: '10%',
        right: '5%',
        height: '50%'
      },
      {
        left: '5%',
        right: '5%',
        top: '75%',
        height: '20%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'

      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],

    series: [
      {
        name: 'Dow-Jones index',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          normal: {
            color: upColor,
            color0: downColor,
            borderColor: null,
            borderColor0: null
          }
        },

      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, data),
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }
    ]
  };

  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    _TabList: [
      { name: "30分k线", num: 0 },
      { name: "日K线", num: 1 }
    ],
    idx: 0,
    ec1: {
      onInit: initChart1
    },
    ec2:{
      onInit: initChart2
    },

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
  //tab切换
  currentTab: function (e) {
    let index = e.currentTarget.dataset.current;
    // var animation1 = wx.createAnimation({
    //   duration: 3000,
    //   delay: 0,
    //   timingFunction: "ease",
    // });
    // var animation2 = wx.createAnimation({
    //   duration: 3000,
    //   delay: 0,
    //   timingFunction: "ease",
    // });
    // if (index == 0){
    //   animation1.opacity(1).step({ duration: 500 })
    //   animation2.opacity(0).step({ duration: 500 })
    // }else{
    //   animation1.opacity(0).step({ duration: 500 })
    //   animation2.opacity(1).step({ duration: 500 })
    // }
    this.setData({ 
      idx: index
      // animation1: animation1.export(),
      // animation2: animation2.export()  
      })
  },
  //swiper切换
  // currentChange: function (e) {
  //   let index = e.detail.current
  //   this.setData({
  //     idx: index
  //   })
  // }

})
















