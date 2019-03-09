/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Dimensions, View,ART} from 'react-native';

let screenWidth = Dimensions.get('window').width
let NeedCount = 60 //计时器运行多少次加一个圈
let AlpheRate = 0.01 //透明度变化率


// 使用方法 <WSRippleAniView /> 默认参数在底部，可不传
export default class WSRippleAniView extends Component {

constructor(props){
  super(props)
  this.state={     
    intervalTimer:null,  
    timeCount:0,//累计循环次数
    rippleCount:0,//现在累计创建圈数
    countTime:20,//时间间隔20毫秒  1秒一个圈需要50圈  半径相差150
    allTime:0,//累计循环时间  
  }
}

componentDidMount(){  
    // this.setIntervalAction()
}

setIntervalAction=()=>{
    if(this.state.intervalTimer === undefined || this.state.intervalTimer === null){
        this.state.intervalTimer = setInterval(() => {
            let {timeCount,allTime,rippleCount,countTime} = this.state    
            const {needCount} = this.props
            allTime = allTime + countTime       
            rippleCount =  allTime / needCount*countTime 
            this.setState({            
              rippleCount:rippleCount,
              allTime:allTime,
              timeCount:timeCount+1
            })                 
          }, this.state.countTime)
    }    
}

stopIntervalAction=()=>{
    if(this.state.intervalTimer != undefined && this.state.intervalTimer != null){
        clearInterval(this.state.intervalTimer)
    }    
    this.state.intervalTimer = undefined
}

getPath=(radius)=>{
    const {btnHeight,btnWidth} = this.props
  let pathCircle= new ART.Path()
    .moveTo(btnWidth/2,btnHeight/2-radius)
    .arc(0,2*radius,radius,radius,false,false)//半圆
    .arc(0,-2*radius,radius,radius,false,false)//半圆
    .close();

    return pathCircle
}

getBowenView =(radius,alphe)=>{  
  let pathCircle= this.getPath(radius)  
  let color = "rgba(255, 255, 255, "+alphe+')'    
  return <ART.Shape d={pathCircle}  fill={color} />
}

getRipples=()=>{
  const {timeCount,rippleCount} = this.state
  const {needCount,alpheRate,constALphe,ripplePadding,selected,touchState} = this.props

  let repeatCount = rippleCount>3?3:rippleCount
  //半径  = 半径扩大速度 * 时间  半径差  即时间差
  // 半径 = ripplePadding * allTime/(this.state.countTime)
  // 半径 = ripplePadding * timeCount  
  let data = []//保存最后3次的时间
  for (let i=0;i<repeatCount;i++){
    let item = timeCount - i*20 ; 
    item = item>0?item:timeCount    
     data = [...data,item]
  }
  if(selected){
    return data.map((item)=>{
        let radius = ripplePadding * item
        radius = radius % (needCount*ripplePadding)   
        let alphe = constALphe - alpheRate * (radius / ripplePadding)   //一个循环60次      
        return this.getBowenView(radius,alphe)
      })
  }
  // console.log("第"+timeCount+"圈数"+rippleCount+"次的数据="+data)
  
}

getText=()=>{
   const {btnHeight,btnWidth,btnTitle} = this.props
   return  <ART.Text 
    stroke="#FFFFFF" 
    alignment="center" 
    x={btnWidth / 2} 
    y={btnHeight/2 -15 }     
    fill="#FFFFFF"    
    font={`30px "Helvetica Neue", "Helvetica", Arial`}>{btnTitle}</ART.Text>              
}

  render() {
      const {btnHeight,btnWidth,selected} = this.props
      if(selected){
        this.setIntervalAction()
      }else{
        this.stopIntervalAction()
      }
    return (
        <View style={{backgroundColor:'orange'}} >
        <ART.Surface width={btnWidth} height={btnHeight}  >        
         {this.getRipples()}  
         {this.getText()}
        </ART.Surface>
      </View>   
    );
  }
}

WSRippleAniView.defaultProps = {
     needCount : 60, //计时器运行多少次加一个圈
     alpheRate : 0.01, //透明度变化率    
     constALphe : NeedCount * AlpheRate, //总透明度
     ripplePadding : 3,//每一次外圈半径加多少
     btnHeight:100,
     btnWidth:screenWidth,
     selected:false,    
}
