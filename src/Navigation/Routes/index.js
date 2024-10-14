import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from '../../ContextAPI';
import AuthRoutes from '../AuthRoutes';
import {routers} from '../../Constant';

const Stack = createStackNavigator();

const AppRoutes = ({navigation}) => {
  
  const renderRoutes = () => {
    <AuthRoutes Stack={Stack} />
  }
  return (
  
      <NavigationContainer>
        {renderRoutes()}
      </NavigationContainer>
      
  );
};
export default AppRoutes;
