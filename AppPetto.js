import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Button, View, AppRegistry, Image, Text } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroARCamera,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroQuad,
  ViroAnimations
} from '@viro-community/react-viro';

import RNFetchBlob from "rn-fetch-blob";

ViroAnimations.registerAnimations({
  animateText: {
    properties: {
      positionY: "+=1"
    },
    duration: 1000
  },
  animateShip: {
    properties: {
      positionY: "+=20"
    },
    duration: 1000
  },
});

const InitAppSceneAR = (props) => {

  console.log(props.uriImage);


  function onInitialized(state, reason) {

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      // setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }




  return (


    <ViroARScene onTrackingUpdated={onInitialized}>

      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
      source={require('./hugme-bean.glb')}
      
        // source={{
        //   uri: Platform.OS === 'android'
        //     ? 'file://' + props.uriImage
        //     : '' + props.uriImage
        // }}
        position={[0, 0, -2]}
        scale={[1, 1, 1]}
        type="GLB"
      />

    </ViroARScene>

  );
};

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postn: 0,
      uriImage: null
    }
    this.scene = React.createRef()
  }

  componentDidMount() {

    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: "glb",
      path: dirs.DocumentDir + "/hugme-bean.glb",
    })
      .fetch("GET", "https://github.com/phungtran95/model_samples/raw/main/hugme-bean.glb", {

      })
      .then((res) => {
        console.log("The file saved to ", res.path());
        this.setState({
          uriImage: res.path()
        })
      });

  };


  render() {
    return (
      <View style={{ flex: 1 }}>

        {
          this.state.uriImage ?
            <ViroARSceneNavigator
              ref={(c) => this.scene = c}
              autofocus={true}
              initialScene={{
                scene: InitAppSceneAR,
                passProps: { uriImage: this.state.uriImage }
              }}
              style={styles.f1}
            /> : <Text style={styles.helloWorldTextStyle}>Loading AR</Text>
        }


      </View>
    );
  }
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default App;