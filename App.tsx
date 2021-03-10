/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SecondOption from './screens/secondOption';
import FirstOption from './screens/firstOption';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NestedOneOption from './screens/nestedOneOption';

const App = () => {
  const DOMAIN_URL = 'https://kinspiretesting.page.link';

  async function buildLink(): Promise<string> {
    const link = DOMAIN_URL + '/?mail=' + 'minaahilimtiaz@gmail.com';
    const dynamicLink = await dynamicLinks().buildShortLink({
      link: link,
      domainUriPrefix: DOMAIN_URL,
      android: {packageName: 'com.dynamiclinkstest'},
    });
    console.log(dynamicLink);
    return dynamicLink;
  }

  const handleDynamicLink = (link: any) => {
    if (link?.url.includes(DOMAIN_URL)) {
      console.log('in handle dynamic link');
      console.log(link);
      const email = parseDynamicLinkUrl(link.url);
      console.log(email);
    }
  };

  function parseDynamicLinkUrl(url: string): string | null {
    const splitArray = url.split('?mail=');
    return splitArray.length > 1 ? splitArray[1] : null;
  }

  useEffect(() => {
    console.log('foreground');
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log('background');
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        handleDynamicLink(link);
      })
      .catch((err) => console.log(err.toString()));
  }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function FirstStackScreens() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="First Option" component={FirstOption} />
        <Stack.Screen name="FirstNested" component={NestedOneOption} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{activeTintColor: 'tomato', inactiveTintColor: 'gray'}}>
        <Tab.Screen name="First" component={FirstStackScreens} />
        <Tab.Screen name="Second" component={SecondOption} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
