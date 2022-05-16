/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Smartlook, {
  SmartlookSensitiveComponent,
} from 'smartlook-react-native-wrapper';
Smartlook.setupAndStartRecording('4529952071cad49a93e6eba5f5dc25b4a4d9b040');

interface Item {
  id: number;
  title: string;
}

const data: Item[] = new Array(50).fill(0).map((_: any, i: number) => ({
  id: i + 1,
  title: 'Bananas',
}));

const HEADER_HEIGHT = 200;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <View
        style={[
          styles.item,
          {marginTop: index === 0 ? 200 : 0},
          {backgroundColor: index % 2 === 0 ? 'lighrgray' : 'white'},
        ]}>
        <Text>
          {item.id} - {item.title}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Animated.FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        ListHeaderComponent={
          <Animated.View
            style={[
              styles.listHeader,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT],
                      outputRange: [0, -HEADER_HEIGHT + 40],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <Animated.View
              style={[
                {height: HEADER_HEIGHT, width},
                {
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, HEADER_HEIGHT],
                        outputRange: [0, HEADER_HEIGHT - 40],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <SmartlookSensitiveComponent isSensitive={true}>
                <Text>Hello</Text>
              </SmartlookSensitiveComponent>
            </Animated.View>
          </Animated.View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 60,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  listHeader: {
    backgroundColor: 'red',
    position: 'absolute',
    borderWidth: 1,
  },
  listHeaderComponentStyle: {
    height: 1,
  },
});

export default App;
