
import React,{Component} from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from  'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';


export default class WSAniBtnLine extends Component{


    //构造函数
    constructor(props) {
        super(props)
        this.state = {
            moveAnim:new Animated.Value(0),//左右移动动画
            // toValue:1,
            positions:[],
            maxOriginX:0,
            currentIndex:0,
        }
    }

    _indexBlock=(index)=>{
        this.props.indexBlock(index)
    }


    startAnimation(index){
        const {positions,maxOriginX,currentIndex} = this.state
        let {duration} = this.props
        let  positionX = positions[index].x
        let  value = positionX / maxOriginX //当前index占的比例 位置/总长
        this.setState({
            currentIndex:index,
        })
        Animated.timing(this.state.moveAnim, {
            toValue: value,// 目标值
            duration: duration, // 动画时间
        }).start();
    }

    layout=(e,index)=>{
        let  positions = this.state.positions
        let  maxOriginX = this.state.maxOriginX
        positions[index]= e.layout
        let  lastObj= positions[positions.length-1]
        maxOriginX = lastObj.x//-this.getSize(22)
        this.setState({
            positions:positions,
            maxOriginX:maxOriginX
        })
        console.log('宽='+e.layout.width,'高='+e.layout.height,'x='+e.layout.x,'y='+e.layout.y,'index='+index,'maxOriginX='+maxOriginX)
    }




    render() {

        const {positions,maxOriginX,currentIndex} = this.state
        const {data} = this.props
        let  widthD = maxOriginX
        let  lineWidth = 22
        console.log('positions=',positions)
        if (positions.length === data.length){
            let curentObj = positions[currentIndex]
            if (curentObj!=undefined){
                lineWidth = curentObj.width  -this.getSize(20)
            }
        }

        var views = this.props.data.map((item,index)=>{
            return (
                <TouchableOpacity
                    onLayout={({nativeEvent:e})=>this.layout(e,index)}
                    onPress={()=>{
                        this._indexBlock(index)
                        // this.startAnimation(index)
                    }}
                >
                    {/*<Text style={currentIndex===index? styles.selectedText:styles.nomarlText} >{item}</Text>*/}
                    <Text style={currentIndex===index? this.props.selectedTextStyle:this.props.nomalTextStyle} >{item}</Text>
                </TouchableOpacity>
            )
        })

        return (

            <View style={{
                // position: 'absolute',
                height:this.getSize(this.props.height),
                width:this.getSize(375),
                justifyContent: 'center',
                backgroundColor: 'white',
            }} >
                <View style={styles.btnContainer} >
                    {views}
                </View>
                <Animated.View style={
                    [{
                        // position: 'absolute',
                        height:this.props.lineHeight,
                        width:this.getSize(lineWidth),
                        backgroundColor:this.props.lineColor,
                        marginTop:this.getSize(10),
                        marginLeft:this.getSize(22)
                    },{left:this.state.moveAnim.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,widthD]})}]}>
                </Animated.View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    selectedText:{
        fontSize: 22,
        color:'black',
        marginLeft:20,
    },
    nomarlText:{
        fontSize: 22,
        color:'gray',
        marginLeft:20,
    },
    btnContainer:{
        flexDirection:'row',
        backgroundColor:'white'
    }
});


WSAniBtnLine.defaultProps = {
    height:ProgramStyleSheet.getSize(80),
    data:['日','月','星期'],
    duration:200,//动画时间
    nomalTextStyle:{
        fontSize: ProgramStyleSheet.getSize(22),
        color:'gray',
        marginLeft:ProgramStyleSheet.getSize(20),
    },
    selectedTextStyle:{
        fontSize: ProgramStyleSheet.getSize(22),
        color:'black',
        marginLeft:ProgramStyleSheet.getSize(20),
    },
    lineColor:'red',
    lineHeight:ProgramStyleSheet.getSize(2),
}
