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




export default class WSUpdateCircle extends Component {

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

    getPath=(radius,percent)=>{


        let startAngle = 0  //起点坐标为(radius,0)
        let angleA = percent * 0.01 * 2*Math.PI
        let large = angleA > Math.PI

        let endAngle = angleA
        //终点坐标
        let pX = radius * Math.sin(angleA)
        let  pY = radius - radius * Math.cos(angleA)

        let pathCircle = ART.Path()
            .move(radius,0)
            .arc(pX,pY,radius,radius,large)

        return pathCircle

    }



getBowenView =(radius,color,percent)=>{
    let pathCircle= this.getPath(radius,percent)

    // return <ART.Shape d={pathCircle}  stroke={'yellow'}  fill={color} />
    return <ART.Shape d={pathCircle} strokeWidth={3} stroke={'yellow'}/>


}

getbgCircleView =(radius,color)=>{
    let pathCircle= new ART.Path()
        .moveTo(radius,0)//坐标
        .arc(0,radius*2,radius)//半圆
        .arc(0,-2*radius,radius)//半圆
        .close();


    return <ART.Shape d={pathCircle}  stroke={'red'}  />
}

getText=()=>{
    const {radius,percent} = this.props
    let  btnHeight = radius * 2.0
    let  btnWidth = btnHeight
    let  text = percent + '%'
    return  <ART.Text
        stroke="#FFFFFF"
        alignment="center"
        x={btnWidth / 2}
        y={btnHeight/2 -15 }
        fill="#FFFFFF"
        font={`30px "Helvetica Neue", "Helvetica", Arial`}>{text}</ART.Text>
}

render() {
    const {radius,percent,color} = this.props
    let  btnHeight = radius * 2.0
    let  btnWidth = btnHeight

    return (
        <View style={{backgroundColor:'orange'}} >
            <ART.Surface width={btnWidth*2} height={btnHeight*2}  >
                {this.getbgCircleView(radius,color)}
                {this.getBowenView(radius,color,percent)}
                {this.getText()}
            </ART.Surface>
        </View>
    );
}
}

WSUpdateCircle.defaultProps = {
    radius:50,
    percent:80,
    color:'white'
}
