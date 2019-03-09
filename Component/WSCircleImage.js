import React, {Component} from "react";
import {
    Image,
    View
} from 'react-native'
import PropTypes from 'prop-types';

/**
 *设置圆形图片
 */
export default class WSCircleImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadError: false,
        }
    }

    static propTypes = {
        errorImage: PropTypes.any,// 加载错误图片，可不传
        defaultImage: PropTypes.any,//预加载图片
        size: PropTypes.number,//宽度
        urlImage: PropTypes.source,//图片地址
    }

    render() {
        const {errorImage, defaultImage, urlImage, size} = this.props;

        return (
            <Image
                style={{width: size, height: size, borderRadius: size / 2,}}
                imageStyle={{borderRadius: size / 2}}
                source={this.state.isLoadError ? errorImage  : (urlImage === undefined ? defaultImage : urlImage)}
                onError={() => {
                    this.setState({
                        isLoadError: true,
                    })
                }}
                onLoadEnd={() => {
                }}
            />
        )
    }
}
WSCircleImage.defaultProps = {
    size: 100,
}