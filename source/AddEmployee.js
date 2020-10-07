import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import CustomTextInput from './components/TextInput';
import GetLocation from 'react-native-get-location';
import ImagePickerCrop from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { saveUserInfo, getUserDetails } from './store/localStorage';
import Share from "react-native-share";
import {
  resetState,
  updateUserAddress,
  updateUserEmail,
  updateUserMobile,
  updateUserName,
  updateUserLocation,
  updateUserImage,
} from './store/actions/app-action';

const mapStateToProps = state => ({
  userName: state.app.userName,
  userMobile: state.app.userMobile,
  userEmail: state.app.userEmail,
  userAddress: state.app.userAddress,
  userImgUrl: state.app.userImgUrl,
  userLocation: state.app.userLocation,
});

// const ActionCreators = Object.assign({}, changeCount);
const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(ActionCreators, dispatch),
  updateName: name => dispatch(updateUserName(name)),
  updateMobile: mobile => dispatch(updateUserMobile(mobile)),
  updateAddress: address => dispatch(updateUserAddress(address)),
  updateLocation: location => dispatch(updateUserLocation(location)),
  updateEmail: email => dispatch(updateUserEmail(email)),
  updateImage: img => dispatch(updateUserImage(img)),
  updateState: () => dispatch(resetState()),
});
class AddEmployee extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localdata: {},
    };
  }
  async componentDidMount() {
    // console.log('dadaada',getUserName((dad)=>console.log(dad)))
    let localdata = await getUserDetails();
    this.setState({ localdata })
    console.log('sasa', localdata);
    // console.log('getUserDetails',getUserDetails((data)=>console.log(data.userLocation)))
  }

  callImagePicker = mode => {
    const { updateImage } = this.props;
    if (mode === 'Camera') {
      ImagePickerCrop.openCamera({
        cropping: true,
        width: 300,
        height: 400,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        console.log('image', image)
        updateImage(image.path);
      });
    } else {
      ImagePickerCrop.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        console.log('image', image)
        updateImage(image.path);
      });
    }
  };

  getLocation() {
    const { updateLocation } = this.props;
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        updateLocation(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }

  onNext = async (placeholder, data) => {
    let {
      updateName,
      updateAddress,
      updateEmail,
      updateMobile,
      updateImage,
    } = this.props;
    console.log('pressed', data);
    if (placeholder === 'Upload Image') {
      await updateImage(data);
    } else if (placeholder === 'Enter name') {
      await updateName(data);
    } else if (placeholder === 'Enter email') {
      await updateEmail(data);
    } else if (placeholder === 'Enter phone') {
      await updateMobile(data);
    } else if (placeholder === 'Enter address') {
      await updateAddress(data);
      await this.saveUser();
    }
  };

  renderName = () => {
    const { userName } = this.props;
    let returnData = false;
    if (userName === '') returnData = true;
    return returnData;
  };

  renderEmail = () => {
    const { userName, userEmail } = this.props;
    if (userName !== '') {
      if (userEmail === '') {
        return true;
      } else return false;
    }
    return false;
  };

  initCheck = () => {
    let dd = getUserDetails();
    console.log('dsdsds', dd);
    if (getUserDetails()) return true;
    else return false;
  };

  renderImage = () => {
    const { userEmail, userImgUrl } = this.props;
    if (userEmail !== '') {
      if (userImgUrl === '') return true;
      else return false;
    }
    return false;
  };

  renderPhone = () => {
    const { userImgUrl, userMobile } = this.props;
    if (userImgUrl !== '') {
      if (userMobile === '') return true;
      else return false;
    }
    return false;
  };

  renderAddress = () => {
    const {
      userName,
      userEmail,
      userImage,
      userMobile,
      userAddress,
      userLocation,
    } = this.props;
    if (userMobile !== '') {
      if (userAddress === '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  renderImageView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 150,
            borderWidth: 1,
            borderRadius: 10,
          }}
          onPress={() => this.callImagePicker('Camera')}>
          <Text>Camera</Text>
        </TouchableOpacity>
        <View style={{ flex: 0.2 }} />
        <TouchableOpacity
          onPress={() => this.callImagePicker('Gallary')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 150,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <Text>From Gallary</Text>
        </TouchableOpacity>
      </View>
    );
  };

  saveUser = async () => {
    const {
      userName,
      userMobile,
      userEmail,
      userAddress,
      userImgUrl,
      userLocation,
    } = this.props;
    const userInfo = {
      userName: userName,
      userEmail: userEmail,
      userImgUrl: userImgUrl,
      userMobile: userMobile,
      userLocation: userLocation,
      userAddress: userAddress,
    };
    await saveUserInfo(userInfo);
  };

  shareFun = async () => {
    const { localdata } = this.state;
    const shareOption = {
      title: 'Share via',
      messages: 'some messagdsdsde',
      urls: [localdata.userImage, localdata.userImage, localdata.userImage],
      // url: localdata.userImage,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "910000000000",  // country code + phone number
      filename: 'tesdsdst',
    }
    try {
      // const shareResponse = await Share.shareSingle(shareOption); // only open whatsapp
      const shareResponse = await Share.open(shareOption); // other option also
      console.log('shareResponse=>', shareResponse)

    } catch (error) {
      console.log('error=>', error)
    }
  }

  finalView = () => {
    const {
      userName,
      userMobile,
      userEmail,
      userAddress,
      userImgUrl,
      userLocation,
    } = this.props;
    // this.saveUser();
    const { localdata } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: localdata.userImage }}
          style={{
            height: 140,
            width: 140,
            borderRadius: 280,
          }}
        />
        <Text>User Name: {localdata.userName}</Text>
        <Text>User Email : {localdata.userEmail}</Text>
        <Text>Phone Number : {localdata.userMobile}</Text>
        <Text>Address : {localdata.userAddress}</Text>
        <Text>Latitude : {JSON.parse(localdata.userLocation).latitude}</Text>
        <Text>Longitude : {JSON.parse(localdata.userLocation).longitude}</Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 150,
            borderWidth: 1,
            borderRadius: 10,
          }}
          onPress={() => this.shareFun()}>
          <Text>Share WhatsApp</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderView = () => {
    const {
      userName,
      userMobile,
      userEmail,
      userAddress,
      userImgUrl,
      userLocation,
    } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderName() ? (
          <CustomTextInput placeholder={'Enter name'} onNext={this.onNext} />
        ) : null}
        {this.renderEmail() ? (
          <CustomTextInput
            placeholder={'Enter email'}
            keyboardType={'email-address'}
            onNext={this.onNext}
          />
        ) : null}
        {this.renderImage() ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: userImgUrl }}
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 280,
                }}
              />
              {userImgUrl === '' ? this.renderImageView() : null}
              {userImgUrl !== '' ? (
                <View
                  style={{
                    alignSelf: 'center',
                    height: 50,
                    width: 150,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => this.onNext('Upload Image', userImgUrl)}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </>
        ) : null}
        {this.renderPhone() ? (
          <CustomTextInput
            maxLength={10}
            keyboardType={'number-pad'}
            placeholder={'Enter phone'}
            onNext={this.onNext}
          />
        ) : null}
        {this.renderAddress()
          ? (this.getLocation(),
            (
              <>
                <View
                  style={{
                    top: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>longitude={userLocation.longitude}</Text>
                  <Text>latitude={userLocation.latitude}</Text>
                </View>
                <CustomTextInput
                  placeholder={'Enter address'}
                  onNext={this.onNext}
                />
              </>
            ))
          : null}
        {userAddress !== '' ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: userImgUrl }}
              style={{
                height: 140,
                width: 140,
                borderRadius: 280,
              }}
            />
            <Text>User Name: {userName}</Text>
            <Text>User Email : {userEmail}</Text>
            <Text>Phone Number : {userMobile}</Text>
            <Text>Address : {userAddress}</Text>
            <Text>Latitude : {userLocation.latitude}</Text>
            <Text>Longitude : {userLocation.longitude}</Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 150,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => this.callImagePicker('Camera')}>
              <Text>Camera</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  render() {
    const {
      userName,
      userMobile,
      userEmail,
      userAddress,
      userImgUrl,
      userLocation,
    } = this.props;


    return this.state.localdata.userName ? this.finalView() : this.renderView();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);
