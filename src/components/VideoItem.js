import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createThumbnail } from "react-native-create-thumbnail";
import Video from 'react-native-video';


const VideoItem=({item,onClickVideo})=> {
    
    let video = item;
    const minutes = Math.floor(video.duration/60);
    const seconds = video.duration % 60 ;

    let viewsString = video.views.toString();
    if (video.views > 1000000) {
        viewsString = (video.views / 1000000).toFixed(1) + "m";
    } else if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(1) + "k";
    }

    return (
          <TouchableOpacity onPress={()=>{onClickVideo(video)}} >
            <View style={styles.videoCard}>
            <View >
               
                <Image style={styles.thumbnail} source={require("../../src/images/bigb.jpg")} />
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{minutes}:{seconds < 10 ? "0" : ""}{seconds}</Text>
                </View>
            </View>
            <View style={styles.titleRow}>
                 <Image style={styles.avatar} source={{ uri: video.user.image }} />
                 <View style={styles.midleContainer}>
                    <Text style={styles.title}>{video.title}</Text>
                   <Text style={styles.subtitle}>
                    {video.user?.name || "No name"} {viewsString} {video.createdAt}
                </Text>
                </View>
                <Icon name="more-vert" size={20} color="#999999"/>
            </View>
           
            </View>
             </TouchableOpacity>

        ); 
}


export default VideoItem;

const styles = StyleSheet.create({
    
  videoCard: {
    marginVertical: 15
  },
  thumbnail: { 
    width: '100%', 
    aspectRatio: 20/9,
  },
  timeContainer: {
    backgroundColor: '#00000099',
    height: 25,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleRow: {
    flex:1,  
    flexDirection: 'row',
    padding: 10,
  },
  midleContainer: {
    marginHorizontal: 10,
    flex:1
  },
  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  subtitle: {
    color: 'grey',
    fontSize: 14,
    fontWeight: "500",
  }
});