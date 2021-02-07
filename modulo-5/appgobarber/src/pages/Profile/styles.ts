import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 108 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 15px 0;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 64px;
`;

export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-self: center;
  border-color: #ff9000;
  border-width: 1px;
`;

export const UserAvatarContainer = styled.View`
  position: relative;
`;

export const UpdateUserAvatarWithCameraButton = styled.TouchableOpacity`
  position: absolute;
  left: 100px;
  bottom: -10px;
`;

export const UpdateUserAvatarWithGalleryButton = styled.TouchableOpacity`
  position: absolute;
  right: 100px;
  bottom: -10px;
`;
