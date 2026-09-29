# react-native-screens: `tabBarItemTestID` missing on iOS 26 tab buttons when `Tabs.Host` mounts late

Minimal repro for a react-native-screens issue. On iOS 26, when `Tabs.Host` mounts after the first render
(here: 1.5 s after launch), XCUITest never sees `tabBarItemTestID` on the tab bar buttons, even after a
tab is tapped. Mounting `Tabs.Host` on the first render works.

- react-native-screens 4.28.0 (also reproduces on 4.26.0)
- React Native 0.86.3, Expo SDK 57, New Architecture, Hermes
- Xcode 26.6, iPhone 17 simulator, iOS 26.5

## Run

```sh
npm install
npx expo run:ios --configuration Release
maestro test maestro/tab-testid.yaml
```

The flow fails at `assertVisible: id: "tab-cards"`. Set `DEFER_MOUNT = false` in `App.tsx`, rebuild,
and the same flow passes.
