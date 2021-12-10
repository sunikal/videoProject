// import React, { useRef } from 'react';
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TouchableOpacity,
//     ScrollView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// import Video from 'react-native-video';
// import { AntDesign } from "react-native-vector-icons/MaterialIcons";

// import VideoPlayer from 'react-native-video-controls';

// import {useNavigation} from '@react-navigation/native';

// const VideoScreen=(props)=> {
//     const navigation = useNavigation();   
//     let video = props.route.params.videoObj;

//      let viewsString = video.views.toString();
//     if (video.views > 1000000) {
//         viewsString = (video.views / 1000000).toFixed(1) + "m";
//     } else if (video.views > 1000) {
//         viewsString = (video.views / 1000).toFixed(1) + "k";
//     }


     
//     return (
//      <View style={styles.container}>
//        {/* <VideoPlayer
//           source={{uri: video.videoUrl}}
//           showOnStart={true}
//           tapAnywhereToPause={true}
//           thumbnail
//           navigator={null}
//           toggleResizeModeOnFullscreen={true}
//         /> */}

//          <Video source={video.videoUrl}
//                  style={styles.fullScreen}
//                  rate={rate}
//                  paused={paused}
//                  volume={volume}
//                  muted={muted}
//                  resizeMode={resizeMode}
//                  onLoad={onLoad}
//                  onProgress={onProgress}
//                  onEnd={() => { console.log('Done!') }}
//                  repeat={true} />

//         <View style={styles.titleRow}>
//               <Image style={styles.avatar} source={{ uri: video.user.image }} />
//               <View style={styles.midleContainer}>
//                 <Text style={styles.title}>{video.title}</Text>
//                 <Text style={styles.subtitle}>
//                 {video.user?.name || "No name"} {viewsString} {video.createdAt}
//             </Text>
//             </View>
//             <Icon name="more-vert" size={20} color="#999999"/>
//         </View>
        
//       </View>
//     ); 
// }

// export default VideoScreen;

// const styles = StyleSheet.create({
//    container: {
//     flex: 1,
//     justifyContent: 'center'
//   },
//   videoCard: {
//     marginVertical: 15
//   },
//   titleRow: {
//     flex:1,  
//     flexDirection: 'row',
//     padding: 10,
//   },
//   midleContainer: {
//     marginHorizontal: 10,
//     flex:1
//   },
//   title: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: "500",
//     marginBottom: 5,
//   },
//   subtitle: {
//     color: 'grey',
//     fontSize: 14,
//     fontWeight: "500",
//   }
// });


'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
  };
  }

  

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                 style={styles.fullScreen}
                 rate={this.state.rate}
                 paused={this.state.paused}
                 volume={this.state.volume}
                 muted={this.state.muted}
                 resizeMode={this.state.resizeMode}
                 onLoad={this.onLoad}
                 onProgress={this.onProgress}
                 onEnd={() => { console.log('Done!') }}
                 repeat={true} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
