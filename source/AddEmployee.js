import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from './components/TextInput';
import GetLocation from 'react-native-get-location';
import ImagePickerCrop from 'react-native-image-crop-picker';

export default class AddEmployee extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      phoneNumber: '',
      address: '',
      latitude: '',
      longitude: '',
      imageUrl: '',
    };
  }

  callImagePicker = mode => {
    if (mode === 'Camera') {
      ImagePickerCrop.openCamera({
        cropping: true,
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        this.setState({imageUrl: image.path});
      });
    } else {
      ImagePickerCrop.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        cropping: true,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        includeExif: true,
        avoidEmptySpaceAroundImage: true,
      }).then(image => {
        this.setState({imageUrl: image.path});
      });
    }
  };

  getLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        this.setState({
          longitude: location.longitude,
          latitude: location.latitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  onNext = (placeholder, data) => {
    console.log('pressed', data);
    if (placeholder === 'Upload Image') this.setState({image: data});
    if (placeholder === 'Enter name') this.setState({name: data});
    if (placeholder === 'Enter email') this.setState({email: data});
    if (placeholder === 'Enter phone') this.setState({phoneNumber: data});
    if (placeholder === 'Enter address') this.setState({address: data});
  };
  renderName = () => {
    const {name} = this.state;
    let returnData = false;
    if (name === '') returnData = true;
    return returnData;
  };
  renderEmail = () => {
    const {name, email} = this.state;
    if (name) {
      if (email === '') {
        return true;
      } else return false;
    }
    return false;
  };
  renderImage = () => {
    const {email, image} = this.state;
    if (email) {
      if (image === '') return true;
      else return false;
    }
    return false;
  };
  renderPhone = () => {
    const {image, phoneNumber} = this.state;
    if (image) {
      if (phoneNumber === '') return true;
      else return false;
    }
    return false;
  };
  renderAddress = () => {
    const {phoneNumber, address} = this.state;
    if (phoneNumber) {
      if (address === '') return true;
      else return false;
    }
    return false;
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
        <View style={{flex: 0.2}} />
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
                source={{uri: this.state.imageUrl}}
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 280,
                }}
              />
              {this.state.imageUrl === '' ? this.renderImageView() : null}
              {this.state.imageUrl ? (
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
                    onPress={() =>
                      this.onNext('Upload Image', this.state.imageUrl)
                    }>
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
                  <Text>longitude={this.state.longitude}</Text>
                  <Text>latitude={this.state.latitude}</Text>
                </View>
                <CustomTextInput
                  placeholder={'Enter address'}
                  onNext={this.onNext}
                />
              </>
            ))
          : null}
        {this.state.address ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: this.state.imageUrl}}
              style={{
                height: 140,
                width: 140,
                borderRadius: 280,
              }}
            />
            <Text>User Name: {this.state.name}</Text>
            <Text>User Email : {this.state.email}</Text>
            <Text>Phone Number : {this.state.phoneNumber}</Text>
            <Text>Address : {this.state.address}</Text>
            <Text>Latitude : {this.state.latitude}</Text>
            <Text>Longitude : {this.state.longitude}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
