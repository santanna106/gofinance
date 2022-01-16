import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

//Define the Describe function
describe('Profile Screen', () => {
    it('should have placeholder correctly in user name input',() => {
        const { getByPlaceholderText } = render(<Profile />)
        const inputName = getByPlaceholderText('Nome');
        //checks if placeholder name exists
        expect(inputName).toBeTruthy();
    });
    
    it('should be load user data',() => {
        const { getByTestId } = render(<Profile />);
    
        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Gabriel');
        expect(inputSurname.props.value).toEqual('Andrade');
    
    
    });
    
    it('should exists title correctly',() => {
        const { getByTestId } = render(<Profile />);
    
        const textTitle = getByTestId('text-title');
    
        expect(textTitle.props.children).toContain('Perfil')
    });

});

