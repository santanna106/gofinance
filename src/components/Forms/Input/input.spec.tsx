import React from 'react';
import { render }  from '@testing-library/react-native';

import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
);



describe('Component Input',() => {
    it('must have specific border color when active',()=>{
        const { getByTestId } = render(
            <Input
              testID='input-email'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              active
             />,
             {
                wrapper: Providers
             }
        );
        
        const imputComponent = getByTestId('input-email');
        expect(imputComponent.props.style[0].borderColor)
        .toEqual(theme.colors.attention);

        expect(imputComponent.props.style[0].borderWidth)
        .toEqual(3);

     

    });
});