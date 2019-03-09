import WSBaseComponent from "../WSBaseComponent";
import React from 'react'
import {PixelRatio} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {kCuttingLineColor, kCuttionLineHeight} from "../WSComponentStyle";
import PropTypes from 'prop-types'
import StyleSheet375 from 'react-native-program-stylesheet'

export default class WSSegmentationLine extends WSBaseComponent{

    constructor(props){
        super(props)

    }

    static defaultProps = {
        backgroundColor:kCuttingLineColor,
        backgroundColors:null,
        locations:[0,0.1,0.9],
        style:{
            left: StyleSheet375.getSize(15),
            right:0,
            height:kCuttionLineHeight/PixelRatio.get(),
        }
    }

    static propTypes = {
        backgroundColor:PropTypes.color,
        backgroundColors:PropTypes.array,
        locations: PropTypes.array,
        style: PropTypes.any
    }

    render(): React.ReactNode {
        let backgroundColors = this.props.backgroundColors
        if (this.props.backgroundColors === null && this.props.backgroundColor){
            backgroundColors = [this.props.backgroundColor,this.props.backgroundColor,this.props.backgroundColor]
        }

        return (
            <LinearGradient
                colors={backgroundColors}
                locations={this.props.locations}
                style={this.props.style}
            />
        );
    }

}