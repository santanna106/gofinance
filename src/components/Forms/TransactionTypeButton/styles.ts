import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    flex-direction:row;

    align-items:center;
    justify-content:center;

    border: 1px solid ${({theme}) => theme.colors.text};
    border-radius:5px;

    padding:16px 59px;
`;

export const Icon = styled(Feather)`
    font-size:${RFValue(24)}px;
    margin-right:12px;
`;

export const Title = styled.Text`
    font-size:${RFValue(14)}px;
    font-family:${({theme}) => theme.fonts.regular};
`;