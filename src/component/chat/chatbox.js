/*flow*/ 
import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	Dimensions,
	Keyboard,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import autobind from 'autobind-decorator'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


import { MessageContainer } from './MessageContainer';
import { InputToolbar } from './InputToolbar';
import ToolBar from './ToolBar';

const { width,height } = Dimensions.get('window');

export class ChatBox extends React.Component<*,*>{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isSpeak:false,
	  	showDashBoard:true
	  };

	  this._keyboardHeight=0;
	}

	componentWillMount() {  
    	this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));  
    	this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));  
    	this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));  
  	}  

  	
  	setKeyboardHeight(Height){
  		this._keyboardHeight=Height;
  	}
  	
  	getKeyboardHeight(){
  		return this._keyboardHeight
  	}

  	componentWillUnmount() {  
	    this.keyboardDidShowListener.remove();  
	    this.keyboardDidHideListener.remove();  
  	}  

  	_keyboardDidShow(event){
  
  		this.setKeyboardHeight(event.endCoordinates ? event.endCoordinates.height:event.end.height);
  		this.setState({
			...this.state,
			showDashBoard:true
		})
  	}
  	_keyboardWillShow(event){
  		this.setState({
			...this.state,
			showDashBoard:true
		})
  		console.log("event",event);
  		return
  	}

  	_keyboardDidHide(event){
  		console.log("event",event);
  		this.setKeyboardHeight(0);

  	}

	@autobind
	renderAudio(showTextInput,isSpeak){

		console.log(showTextInput,isSpeak);
		this.setState({
			...this.state,
			isSpeak
		})
		
	}


	_renderAudio=()=>{

		if(this.state.isSpeak){
			return (
				<View style={styles.AudioBox}>
					<FontAwesome name='microphone' size={100} color='#e4f1ff'/>
					<Text style={styles.speakText}>按住说话</Text>
				</View>
				)
		}
			
			return null
				
		}

	
	OperateDashBoard=(isShowEmoji)=>{

		this.setState({
			...this.state,
			showDashBoard:isShowEmoji
		})
		
	}


	_renderDashBoard(){

		if(!this.state.showDashBoard){		
		return (<ToolBar 
				style={styles.ToolBarBox} 
				ToolBarHeight={258} 
				onChangeText={this.props.onChangeText} 
				onChange={this.props.onChange}/>)
					
		}

		return null
}

	render():React.Node{
		console.log("render",this.state.showDashBoard)
		const { showDashBoard } = this.state.showDashBoard
		return(
			<View style={styles.container}>
				<MessageContainer 
				{...this.props}
				/>
				{this._renderAudio()}
				<InputToolbar
					style={styles.inputToolbar}
					placeholder={this.props.placeholder}
					autoFocus={this.props.autoFocus}
					maxHeight={this.props.inputMaxHeight}
					onChange={this.props.onChange}
					onChangeText={this.props.onChangeText}
					onEndEditing={this.props.onEndEditing}
					onSelectionChange={this.props.onSelectionChange}
					hasValue={this.props.hasValue}
					handleSubmit={this.props.handleSubmit}
					hadSend={this.props.hadSend}
					renderAudio={this.renderAudio}
					//dismissKeyboard={this.dismissKeyboard}
					OperateDashBoard={this.OperateDashBoard}
					//ToolBarHeight={this.state.ToolBarHeight}
				/>
				{Platform.OS==='ios' ? <KeyboardSpacer/>:null}
				
				{ this._renderDashBoard() }

			</View>
			)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1,
	},
	inputToolbar:{
		//alignSelf: 'flex-end'
	},
	AudioBox:{
		position:'absolute',
		bottom:height*0.45,
		left:width*0.25,
		width:width*0.5,
		height:width*0.5,
		borderRadius: width*0.04,
		backgroundColor: 'rgba(0,0 ,0 ,0.5 )',
		justifyContent: 'center',
		alignItems: 'center',
		//flexDirection: 'row',
	},
	speakText:{
		fontSize: 20,
		color:"#e4f1ff"
	},
	ToolBarBox:{
		flex:1
	}
})