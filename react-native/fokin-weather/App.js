// file: App.js

import React from 'react';
// alert 사용하기 위한
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import Axios from 'axios';
import Weather from './Weather';

const API_KEY = "c8458517524180e85ee3cd47d5aa6022";

// React.Component 뒤에 () 붙이면 안된다..
export default class extends React.Component {
  
  state = {
    // 여기에 선언 안해줘도 아래의 this.setState 에서도 만들어질 수 있군
    isLoading: true
  }

  // 넘겨받은 값으로 api 이용해서 값들 출력
  getWeather = async (latitude, longitude) => {
      const { data: { main: { temp }, weather } } = await Axios.get(
        // 문자열 표시는 백틱(`)로 합니다. 그 안에 값 표시는 ${}
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );
      // 성공 했으니 state 값 변경
      this.setState({ 
        isLoading: false,
        condition: weather[0].main,
        temp: temp
      });
  }

  getLocation = async () => {
    try {
      // 에러 고의 발생시 테스트용
      // throw Error();

      // 1. 허락 먼저 받고
      await Location.requestPermissionsAsync();

      // 리턴값이 object라서 coords 로 들어가서 latitde, longitude 값 저장
      // 와 씨 이걸 coords 안의 값들을 { } 한 번 더 사용해서 집어넣었어야 했는데 ㅡ
      const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
        // getWeather() 로 위치 값들 넘기고
        this.getWeather(latitude, longitude);
        // 에러시에 알람 뜨고
    } catch (error) {
      Alert.alert("can't find you.", "So s{ad");
    }
  };
  
  // 로딩이 끝나고 getLocation() 실행시키고
  componentDidMount() {
    this.getLocation(); 
  }
  
  render() {

    const { isLoading, temp, condition } = this.state;

    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>
    );
  }
}