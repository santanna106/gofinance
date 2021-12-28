import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components';
import {StatusBar} from 'react-native';

import {Routes} from './src/routes';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'
import {AuthProvider, useAuth} from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStoreIsLoading} = useAuth();

  if(!fontsLoaded || userStoreIsLoading){
    return  <AppLoading />
  }

  return (  
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}


