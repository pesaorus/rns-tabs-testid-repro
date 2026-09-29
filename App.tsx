import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tabs } from 'react-native-screens';

// true: mount Tabs.Host 1.5s after launch (fails). false: mount it on the first render (passes).
const DEFER_MOUNT = true;

const TABS = ['home', 'cards', 'settings'];

export default function App() {
  const [ready, setReady] = useState(!DEFER_MOUNT);
  const [navStateRequest, setNavStateRequest] = useState({ selectedScreenKey: 'home', baseProvenance: 0 });
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <Tabs.Host
      navStateRequest={navStateRequest}
      onTabSelected={({ nativeEvent }: any) =>
        setNavStateRequest({ selectedScreenKey: nativeEvent.selectedScreenKey, baseProvenance: nativeEvent.provenance })
      }>
      {TABS.map((key) => (
        <Tabs.Screen key={key} screenKey={key} title={key} tabBarItemTestID={`tab-${key}`}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text testID={`content-${key}`}>{key} screen</Text>
          </View>
        </Tabs.Screen>
      ))}
    </Tabs.Host>
  );
}
