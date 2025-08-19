import Sunny from '../assets/icons/sunny.svg?react';
import Clear from '../assets/icons/moon.svg?react';
import PartlyCloudy from '../assets/icons/cloudy.svg?react';
import Cloudy from '../assets/icons/clouds.svg?react';
import Overcast from '../assets/icons/overcast.svg?react';
import Mist from '../assets/icons/misty-cloud.svg?react';
import Rain from '../assets/icons/light-rain.svg?react';
import LightRain from '../assets/icons/rain.svg?react';
import Snowing from '../assets/icons/snowing.svg?react';
import Sleet from '../assets/icons/sleet.svg?react';
import HeavyRain from '../assets/icons/rain-storm.svg?react';
import Blizzard from '../assets/icons/blizzard.svg?react';
import Hail from '../assets/icons/hail.svg?react';
import SnowWind from '../assets/icons/snow-wind.svg?react';
import ThunderRain from '../assets/icons/lightening-cloud-rain.svg?react';
import ThunderSnow from '../assets/icons/lightening-snow.svg?react';
import Thunder from '../assets/icons/lightening-cloud.svg?react';
import Temp from '../assets/icons/celcius.svg?react';
import RainProb from '../assets/icons/raining.svg?react';
import Wind from '../assets/icons/crosswinds.svg?react';
import Water from '../assets/icons/liquid-drop.svg?react';

export function GetWeatherIcon(code: number, text: string | null) {
  if (code === 1000) {
    if (text === 'Sunny') {
      return Sunny;
    }
    if (text === 'Clear') {
      return Clear;
    }
  }
  if (code === 1003) {
    return PartlyCloudy;
  }
  if (code === 1006) {
    return Cloudy;
  }
  if (code === 1009) {
    return Overcast;
  }
  if ([1030, 1135, 1147].includes(code)) {
    return Mist;
  }
  if ([1063, 1080, 1183, 1198, 1240, 1150, 1153, 1072, 1168].includes(code)) {
    return LightRain;
  }
  if ([1186, 1189, 1171].includes(code)) {
    return Rain;
  }

  if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
    return Snowing;
  }
  if ([1066, 1204, 1207, 1249, 1252].includes(code)) {
    return Sleet;
  }
  if ([1192, 1195, 1243, 1246, 1201].includes(code)) {
    return HeavyRain;
  }
  if (code === 1117) {
    return Blizzard;
  }
  if ([1237, 1261, 1264].includes(code)) {
    return Hail;
  }
  if (code === 1114) {
    return SnowWind;
  }
  if ([1273, 1276].includes(code)) {
    return ThunderRain;
  }
  if ([1279, 1282].includes(code)) {
    return ThunderSnow;
  }
  if (code === 1087) {
    return Thunder;
  }

  if (code === 0) {
    return Temp;
  }
  if (code === 1) {
    return RainProb;
  }
  if (code === 2) {
    return Wind;
  }
  if (code === 3) {
    return Water;
  }

  return Sunny;
}
