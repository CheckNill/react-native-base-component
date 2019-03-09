import React from 'react'//任何一个组件都必须引入React才能兼容JSX语法
import WSBaseComponent, {ProgramStyleSheet, window} from "./WSBaseComponent";
import {
    View,
    TouchableWithoutFeedback,
    NativeModules,
    ImageBackground,
    AppRegistry,
    Text,
    Alert
} from 'react-native'
import {kColor_197, kMainColor, WSStyles} from "./WSComponentStyle";
//var Carousel = require('react-native-looped-carousel');
import Carousel from 'react-native-looped-carousel';

export default class WSCarouselView extends WSBaseComponent {

    constructor(props){
        super(props)
        this.state = {
            size:{width:this.props.width,height:this.props.height}
        }

    }
    
    static defaultProps = {
        sliderWidth : window.width,
        sliderHeight : 140,
        itemWidth: window.width,
        itemHeight: 140,
        data: [],//[{}]
        imageURLKey: '',
        sourceURLKey: '',
        titleKey: '',
        text: '2332',
    }

    _renderItem (item,index) {
        return <View style={{width:ProgramStyleSheet.getSize(this.props.itemWidth),height:ProgramStyleSheet.getSize(this.props.itemHeight),backgroundColor:'red'}}>
                <TouchableWithoutFeedback style={{margin:0}} onPress={()=>{
                    let url = item[this.props.imageURLKey]?item[this.props.imageURLKey]:item.url
                    if(url&&url!==undefined){
                        let info = item[this.props.titleKey]?item[this.props.titleKey]:item.info
                        let RJSRNRoute = NativeModules.RJSRNRoute
                        if (info&&info!==undefined){
                            RJSRNRoute.rn_routeToRJSBDWebViewVCWithURL(url,info,0)
                        }
                        else {
                            RJSRNRoute.rn_routeToRJSBDWebViewVCWithURL(url,null,0)
                        }
                    }
                }}>
                    <ImageBackground style={{width:ProgramStyleSheet.getSize(this.props.itemWidth),height:ProgramStyleSheet.getSize(this.props.itemHeight),backgroundColor:'#c5c5c5'}} source={{uri:item.img}}/>
                </TouchableWithoutFeedback>
            </View>
        ;
    }

    _renderCarousel(){
        let arr = []
        this.props.data.map((item,index)=>{
            arr.push(this._renderItem({item,index}))
        })
        return arr
    }

    render () {
        return (
            <Carousel
                // ref={(c) => { this._carousel = c; }}
                // data={this.props.data}
                // renderItem={this._renderItem}
                // sliderWidth={this.props.sliderWidth}
                // itemWidth={this.props.itemWidth}
                // width={this.props.sliderWidth}
                // height={this.props.sliderHeight}
                //delay={2000}
                style={{width:this.getSize(this.props.sliderWidth),height:this.getSize(this.props.sliderHeight)}}
                autoplay={false}
                isLooped={false}
                bullets={this.props.data&&this.props.data.length>1}
                bulletStyle={{backgroundColor: '#fff', width: 5, height: 5}} //未选中时小圆点的样式
                chosenBulletStyle={{backgroundColor: kMainColor, width: 5, height: 5}}//选中时小圆点的样式
                onAnimateNextPage={(p) => console.log(p)}
            >
                
                {
                    this.props.data.map((item,index)=>{
                        return this._renderItem(item,index)
                    })}
            </Carousel>
        );
    }
}

