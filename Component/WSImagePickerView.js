import React,{Component} from 'react'
import{
	TouchableOpacity,
	Platform,
	ActivityIndicator,
	View,
	Text,
	Image,
} from 'react-native'
import Toast from 'react-native-root-toast'
// import ImagePicker from 'react-native-image-crop-picker'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-picker';
// const options = {
// 	title: '选择图片',
// 	cancelButtonTitle: '取消',
// 	takePhotoButtonTitle: '拍照',
// 	chooseFromLibraryButtonTitle: '图片库',
// 	cameraType: 'back',
// 	mediaType: 'photo',
// 	videoQuality: 'high',
// 	durationLimit: 10,
// 	maxWidth: 600,
// 	maxHeight: 600,
// 	aspectX: 2,
// 	aspectY: 1,
// 	quality: 0.8,
// 	angle: 0,
// 	allowsEditing: true,
// 	noData: false,
// 	storageOptions: {
// 		skipBackup: true,
// 		path: 'images'
// 	},
// 	permissionDenied:{
// 		title:'获取权限',
// 		text:'如果您不授权，将无法拍照或获取相册信息',
// 		reTryTitle:'去授权',
// 		okTitle:'好的'
// 	}
// }

const options = {
	title: 'Select Avatar',
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};

export default class WSImagePickerView extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			loading:false,
		}
	}

    showActionSheet = () => {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };

				this.processImage(response)
			}
		});
    }

    processImage = (image) => {
		let url = image.uri.slice(7)

    	this.props.onFileReceived(url,image.fileName)
    }

    render(){
    	return (
    		<TouchableOpacity style={this.props.style} onPress={()=>{
    			this.showActionSheet()
    		}}>
    			{this.props.children}
    		</TouchableOpacity>
    	)
    }


}

WSImagePickerView.defaultProps = {
	photos:[],
	type:'',
}
