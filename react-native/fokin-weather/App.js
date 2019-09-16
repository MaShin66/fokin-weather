import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

export default class extends React.Component {
  
  state = {
    isLoading: true
  }

  getLocation = async () => {
    try {
      // 에러 고의 발생시 테스트용
      // throw Error();
      await Location.requestPermissionsAsync();
      const { 
        coords: latitude, longitude } = await Location.getCurrentPositionAsync();
        this.setState({
          isLoading: false
        });
    } catch (error) {
      Alert.alert("can't find you.", "So sad");
    }
  }
  
  componentDidMount() {
    this.getLocation(); 
  }
  
  render() {

    const { isLoading } = this.state;

    return isLoading ? <Loading /> : null;
  }
}