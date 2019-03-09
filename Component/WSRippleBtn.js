/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Image,StyleSheet, Text, View,ART,TouchableOpacity,Dimensions} from 'react-native';
import PropTypes from 'prop-types'
import WSRippleAniView from './WSRippleAniView'
import Toast from 'react-native-root-toast'
import {kWindow} from "./WSBaseComponent";

export const WSBtnNomal = 'WSBtnNomal'
export const WSBtnWaitingOrder = 'WSBtnWaitingOrder'
export const WSBtnArrivalsBegian = 'WSBtnArrivalsBegian'
export const WSBtnStartBilling = 'WSBtnStartBilling'
export const WSBtnArriveEnd = 'WSBtnArriveEnd'
export const WSBtnSendBill = 'WSBtnSendBill'

export let WSBtnState = [WSBtnNomal, WSBtnWaitingOrder,WSBtnArrivalsBegian,WSBtnStartBilling,WSBtnArriveEnd,WSBtnSendBill]
// let index = WSBtnState.indexOf('WSBtnWaitingOrder')
let WSBtnTitle = ['点击出车', '接单中...','到达上车地点','开始计费','到达目的地','发起付款']
let screenWidth = Dimensions.get('window').width
global.btnState = WSBtnNomal

{/* 使用方法 <WSRippleBtn btnState={global.btnState} />    */}
export default class WSRippleBtn extends Component {

constructor(props){
  super(props)
  this.state={           
    accept:false,
    pageX:25,    
    btnState:WSBtnNomal,
  }
}

componentDidMount(){

}

componentWillReceiveProps(){    
    let btnState = global.btnState
    if(btnState === WSBtnArrivalsBegian){
        this.setState({
            btnState:btnState,
            accept:true
        })
    }    
}

componentWillUnmount() {
    global.btnState = WSBtnNomal
}

    componentWillMount(){
  this._gestureHandlers = {        
    onStartShouldSetResponder: () => true,  //对触摸进行响应
    onMoveShouldSetResponder: ()=> true,  //对滑动进行响应    
    onResponderGrant: (item)=>{
      let {firstTouch,accept,btnState} = this.state      
      let selected = WSBtnState.indexOf(btnState) === 1              
      if(accept) return

      if(selected){//取消需要双击
        //记录点击时间   相差1s未点击提示失败，点击交互结束        
        if(firstTouch===0){          
          this.setState({
            firstTouch:100000,                
          })        
          if(this.state.intervalTimer===undefined){
            this.state.intervalTimer = setInterval(() => {
              //设置first时间戳 为0                  
                Toast.show('需要双击取消')
                clearInterval(this.state.intervalTimer)
                this.state.intervalTimer = undefined
                this.setState({
                  firstTouch:0,                
                })
              }, 1000)        
          }          
        }else{//双击成功          
          if(this.state.intervalTimer!=undefined && this.state.intervalTimer!= null){
            clearInterval(this.state.intervalTimer)
            this.state.intervalTimer = undefined            
          }                    
          this.setState({
            firstTouch:0,                        
            btnState:WSBtnNomal
          })
        }
        
      }else{//单击开始工作
        this.setState({          
          btnState:WSBtnWaitingOrder
        })
      }
    },     
  }


  this._gestureHandlers2 = {    
    onStartShouldSetResponder: () => true,  //对触摸进行响应
    onMoveShouldSetResponder: ()=> true,  //对滑动进行响应    
    onResponderGrant: (item)=>{      
    }, //激活时做的动作

    onResponderMove: (item)=>{
      let pageX = this.state.pageX            
      pageX = pageX+item.nativeEvent.locationX      
      this.setState({
        pageX:pageX,        
      })      
    },  //移动时作出的动作    
    onResponderRelease: (item)=>{
      const {btnState,pageX} = this.state                       
      let btnStateWS = btnState
      if(pageX > kWindow.width-200){
        switch(btnState){
          case WSBtnArrivalsBegian:{btnStateWS=WSBtnStartBilling};break
          case WSBtnStartBilling:{btnStateWS=WSBtnArriveEnd};break
          case WSBtnArriveEnd:{btnStateWS=WSBtnSendBill};break
          case WSBtnSendBill:{btnStateWS=WSBtnNomal,global.btnState=WSBtnNomal};break
          default:{btnStateWS=WSBtnNomal,global.btnState=WSBtnNomal}
        }                
      }
      this.setState({
        pageX:25,        
        btnState:btnStateWS,
        accept:btnStateWS!=WSBtnNomal
      })
    }, //动作释放后做的动作
  }  
 }
 
 leftImgView=()=>{
    const {pageX} = this.state
     const {height} = this.props
     let viewHeight = height/2
   return (
    <View >
      <Image  
         source={require('../Assets/pick_icon_slide.png')}
         style={{left:pageX,marginTop:-viewHeight-11,width:22,height:22}}
        {...this._gestureHandlers2}               
      />                   
    </View>
   )
 }
 

  render() {
    const {btnState} = this.state
    const {height} = this.props
    let index = WSBtnState.indexOf(btnState)
    let selected = index === 1              
    return (
      <View>        
        <View {...this._gestureHandlers} >                           
          <WSRippleAniView
            btnHeight = {height}
            btnTitle={WSBtnTitle[index]}           
            selected={selected} 
          />          
        </View>
        {index>1?
         this.leftImgView():
        <View /> }                
      </View>              
    );
  }
}

WSRippleBtn.defaultProps = {    
    btnState:PropTypes.oneOf(WSBtnState),            
    height:100,
}
