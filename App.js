import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';
import ObjectChooser from './ObjectChooser';
import HomeScreen from './HomeScreen';

import AboutPage from "./page/About.js";

import firebase from 'react-native-firebase';

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
console.disableYellowBox = true;

class Player extends React.Component {

  constructor() {
    super();
    this.state = {
      userCreds: {},
      uid: "",
    };
  }

  componentDidMount() {

    firebase.auth()
      .signInAnonymouslyAndRetrieveData()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());

          this.setState({
            userCreds: credential.user,
            uid: credential.user.uid,
          });

          // TODO -> save user creds in SharedPrefs -> to upload files in uid folder

          console.log("uid === " + this.state.uid);
          console.log("uid === " + this.state.userCreds.toJSON());
        }
      });

  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <YouTube
          apiKey={youtubeApiKey}
          videoId={navigation.state.params.videoId}
          play={true}
          fullscreen={true}
          showFullscreenButton={false}
          onChangeFullscreen={e => e.isFullscreen || navigation.goBack()}
          style={{ width: 0, height: 0 }}
        />
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
    Chooser: {
        screen: ObjectChooser,
    },
  Player: { screen: Player },
  About: AboutPage.navConfig
}, {
    headerMode: "none"
});
