import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

test('check if show correctly user input name button placeholder',() => {
    const { debug } = render(<Profile />)
    debug();
});