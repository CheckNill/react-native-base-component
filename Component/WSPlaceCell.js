
import React,{Component} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity, StyleSheet, PixelRatio
} from 'react-native'

import ProgramStyleSheet from 'react-native-program-stylesheet';
import {kWindow} from "./WSBaseComponent";
import {kCuttingLineColor, kModalBgColor,kTitleColor,kTextInputPlaceholdColor,kColordf4f5f6,kHighlightColor} from "./WSComponentStyle";


export class WSPlaceCore extends Component{


    render(){
        let {source,title,detalTitle,tag} = this.props
        return(
            <TouchableOpacity
                style={styles.container}
                onPress={()=>{
                    this.props.click(tag)
                }}
            >
                <View style={styles.btnContainer} >

                    <Image style={styles.image} source={source} />
                    <View style={styles.titlesContainer} >
                        <Text style={styles.title} >{title}</Text>
                        <Text style={styles.detalTitle} >{detalTitle}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

WSPlaceCore.defaultProps={
    title:'深圳北站',
    detalTitle:'广东省深圳市宝安区致远中路',
    tag:0,
}


export class WSPlaceCell extends Component{

    render() {
        let {source,title,detalTitle} = this.props
        const {marginVertical} = this.props
        return (
            <View style={{width: this.getSize(kWindow.width-marginVertical*2),backgroundColor:'red',}} >
                <WSPlaceCore source={source} title={title} detalTitle={detalTitle} tag={0} click={this.props.click} />
                <View style={styles.line} />
            </View>
        )
    }
}


WSPlaceCell.defaultProps={
    title:'深圳北站',
    detalTitle:'广东省深圳市宝安区致远中路',
    marginVertical:12
}



export class WSTwoPlaceCell extends Component{


    render() {
        let {source,title,detalTitle} = this.props
        return (
            <View>
                <View style={styles.twoCellContainer} >
                    <View style={{flex:1}} >
                        <WSPlaceCore detalTitle={'asasas'} tag={0} click={this.props.click} />
                    </View>
                    <View style={styles.lineWith1} />
                    <View style={{flex:1}} >
                        <WSPlaceCore detalTitle={'asasas'} tag={1} click={this.props.click} />
                    </View>
                </View>
                <View style={styles.line} />
            </View>
        )
    }
}



WSTwoPlaceCell.defaultProps={
    title:'深圳北站',
    detalTitle:'广东省深圳市宝安区致远中路'
}




const styles = StyleSheet.create({
   titleText:{
        flex:1,fontSize:16,textAlign: 'center'
    },line:{
        height:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },btnContainer:{
       flex: 1,
        flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',backgroundColor:kHighlightColor
    },image:{
       marginLeft: 14
    },titlesContainer:{
       flex: 1,justifyContent: 'center',alignItems: 'flex-start',flexDirection: 'column',margin:14
    },title:{
       fontSize: 15,color:kTitleColor,textAlign: 'left'
    },detalTitle:{
        fontSize: 15,color:kTextInputPlaceholdColor,textAlign: 'left',marginTop: 6
    },container:{
       backgroundColor:kColordf4f5f6
    },lineWith1:{
       height: 32,width:1 / PixelRatio.get(),backgroundColor:kCuttingLineColor
    },twoCellContainer:{
       flexDirection:'row',width:kWindow.width-24,justifyContent:'center',alignItems:'center',backgroundColor:'white'
   }
});