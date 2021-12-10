import React, {useState,useEffect,createRef} from 'react';
import {View,Text,StatusBar,TextInput,StyleSheet,ActivityIndicator,Image,Linking,TouchableOpacity,Platform,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import VideoItem from './components/VideoItem';
import data from './data.json';

const HomeScreen =()=> {

  
  const navigation = useNavigation();  


  const onClickVideo =(item)=>{
     navigation.navigate('VideoScreen',{videoObj:item});
  } 
   
  return (
     <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.rightNav}>
            <Text style={styles.header}>Videos</Text>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
          data={data.items}
          renderItem={({item}) => (
              <VideoItem
              item={item}
              onClickVideo ={onClickVideo}
              />
          )}
          keyExtractor={(item)=>item.id}
          ItemSeparatorComponent={()=><View style={{height:0.5,backgroundColor:'#E5E5E5'}}/>}

           />
        </View>
       
      </View>
    );
}


export default HomeScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    height: 55,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row'
  },
  navItem: {
    marginLeft: 25
  },
  body: {
    flex: 1
  },
  tabBar: {
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 11,
    color: '#3c3c3c',
    paddingTop: 4
  },
  header:{
    fontSize:20,
    fontWeight:'bold'
  }
});