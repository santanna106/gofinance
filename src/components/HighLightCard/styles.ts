import styled,{css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import theme from '../../global/styles/theme';

interface TypeProsps {
    type:'up' | 'down' | 'total';
}




export const Container = styled.View<TypeProsps>`
    background-color:${({theme,type}) => 
        type === 'total' ? theme.colors.secundary : theme.colors.shape};

    width:${RFValue(300)}px;
    border-radius:5px;

    margin-right:16px;
    padding:19px 23px;
    padding-bottom:${RFValue(42)}px;

    ${(props) => props.type === 'total' && css`
        color:${({theme}) => theme.colors.shape};
    ` };
`;

export const Header = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;

export const Title = styled.Text<TypeProsps>`
    color:${({theme,type}) => 
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    font-family:${({theme}) => theme.fonts.regular};
    font-size:${RFValue(14)}px;

`;

export const Icon = styled(Feather)<TypeProsps>`
    font-size:${RFValue(40)}px;
    ${({type}) => type === 'up' && css`
        color:${({theme}) => theme.colors.sucess};
    ` };
    ${({type}) => type === 'down' && css`
        color:${({theme}) => theme.colors.attention};
    ` };

    ${({type}) => type === 'total' && css`
        color:${({theme}) => theme.colors.shape};
    ` };
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProsps>`
    font-family:${({theme}) => theme.fonts.medium};
    font-size:${RFValue(32)}px;

    color:${({theme,type}) => 
        type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    margin-top:38px;
`;

export const LastTransaction  = styled.Text<TypeProsps>`
    font-family:${({theme}) => theme.fonts.regular};
    font-size:${RFValue(12)}px;

    color:${({theme,type}) => 
        type === 'total' ? theme.colors.shape : theme.colors.text};
`;