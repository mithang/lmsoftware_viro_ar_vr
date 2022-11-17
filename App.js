import React, { useState, useRef } from 'react';
import { StyleSheet, Button, View, AppRegistry } from 'react-native';
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

const HelloWorldSceneAR = (props) => {

  const txtElement = useRef();


  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }


  const clickMe = async () => {
    console.log('clickMe', "clickMe");


  }

  return (
    // <ViroARScene onTrackingUpdated={onInitialized}>
    //   <ViroText
    //     text={text}
    //     scale={[0.5, 0.5, 0.5]}
    //     position={[0, 0, -1]}
    //     style={styles.helloWorldTextStyle}
    //   />
    // </ViroARScene>

    // <ViroARScene>
    //   <ViroText
    //     text="demo"
    //     scale={[0.5, 0.5, 0.5]}
    //     position={[0, 0, -1]}
    //     style={styles.helloWorldTextStyle}
    //   />
    // </ViroARScene>


    <ViroARScene onTrackingUpdated={onInitialized}>

      <ViroAmbientLight color="#FFFFF]" />
      <Viro3DObject source={require('./maggellan_ex.vrx')}
        position={[0.0, 3600*1.5, -3600]}
        scale={[1, 1, 1]}
        type="VRX"
        // animation={{
        // name: 'animateShip', run: true, loop: true}}
      />
      {/* <ViroARCamera position={[-1, 0, 0]} active={true} /> */}
      {/* <ViroARCamera position={[0, 0, 0]} rotation={[0, 0, 45]} active={true}/> */}
      <ViroText ref={txtElement} style={styles.baseText} text="Sample Text: Y:" position={[0, 15, -10]}
      // animation={{
      //   name: 'animateText', run: true, loop: true, onFinish: () => {
      //     console.log('onFinish');
      //     console.log(txtElement.current.props.position[0], txtElement.current.props.position[1], txtElement.current.props.position[2]);

      //   }
      // }}
      />

      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroARPlaneSelector>
        <ViroNode position={[0, -.5, 0]} dragType="FixedToWorld" onDrag={() => { }} >

          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />
          <Viro3DObject
            source={require('./emoji_smile.vrx')}
            position={[0, .1, 0]}
            scale={[.2, .2, .2]}
            type="VRX"
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={['billboardY']}
            resources={[require('./emoji_smile_diffuse.png'),
            require('./emoji_smile_specular.png'),
            require('./emoji_smile_normal.png')]}
            onClick={clickMe}
          />
          <ViroQuad
            rotation={[-90, 0, 0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2} />
        </ViroNode>
      </ViroARPlaneSelector> */}
      {/* <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => { }} >
      <Viro3DObject
        source={require('./emoji_smile.vrx')}
        position={[0, .1, 0]}
        scale={[.2, .2, .2]}
        type="VRX"
      />
    </ViroNode> */}
    </ViroARScene>

  );
};

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postn: 0
    }
    this.scene = React.createRef()
  }
  startRecordVideoClick = async () => {
    console.log('_arScene', this.scene.arSceneNavigator);
    let fileName = 'CustomApp-Video-' + Date.now();
    await this.scene.arSceneNavigator?.startVideoRecording(fileName, true, (e) => {
      console.log(e);
    });

  }
  stopRecordVideoClick = async () => {
    console.log('_arScene', this.scene.arSceneNavigator);
    await this.scene.arSceneNavigator?.stopVideoRecording()  // <-- Yeww! It works
  }
  takeScreenshot = async () => {
    console.log('_arScene', this.scene.arSceneNavigator?.takeScreenshot);
    let fileName = 'CustomApp-image-' + Date.now();
    await this.scene.arSceneNavigator?.takeScreenshot(fileName, true) // <-- Yeww! It works

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          ref={(c) => this.scene = c}
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
          style={styles.f1}
        />
        <Button title="Start Record Video" onPress={this.startRecordVideoClick} />
        <Button title="Stop Record Video" onPress={this.stopRecordVideoClick} />
        <Button title="Screenshot" onPress={this.takeScreenshot} />
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