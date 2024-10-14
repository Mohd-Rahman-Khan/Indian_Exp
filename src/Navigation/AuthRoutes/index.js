import React, { Fragment } from 'react';
import { routers } from '../../Constant';
import { Splash,Login } from '../../Screen';

const screenData = [
  {
    id: 1,
    name: routers.SPLASH,
    component: Splash,
  },
  {
    id: 2,
    name: routers.LOGIN,
    component: Login,
  }
];

const AuthRoutes = ({Stack}) => {
    return(
       <Stack.Navigator
       initialRouteName={routers.SPLASH}
       screenOptions={{
        headerShown: false,
        Color: '#774CFA',
        cardStyle: {
          backgroundColor: '#774CFA',
        },
      }}
       >
        {
            screenData.map((screen, index) => {
                return (
                    <Fragment key={`${screen.name}-${index}`} >
                        <Stack.Screen 
                            name={screen.name}
                            component = {screen.component}
                        />
                    </Fragment>
                )
            })
        }
       </Stack.Navigator>
    )
}
export default AuthRoutes
