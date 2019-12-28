import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import PropTypes from 'prop-types';

import Row from '../components/row'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    backgroundColor: '#FAFAFA'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  row: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
  },
  fab: {
    backgroundColor: '#4E8DEB'
  }
});


const propTypes = {

    style: PropTypes.shape({
        container: styles.fab,

    }),
};


var rad = function(x) {
  return x * Math.PI / 180;
};



var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};


export default class MasterView extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'black',
    title: 'O que há por perto ?',
    headerTitleStyle:{
      color: 'black',
      fontWeight: 'regular'
    },
    headerStyle: {
     backgroundColor:'#F5F5F5'
   }
   //headerRight:  <ActivityIndicator style={{marginRight: 15}} animating={navigation.state.params.isAnimating} size="small" color="white" />
  });

  constructor(props){
    super(props);
    this.handler = this.handler.bind(this)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      latitude: '48.5187',
      longitude: '27.5986',
      error: null,
    }
  }

  handler(someValue) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.setState({
     dataSource: ds.cloneWithRows([]),
     latitude: '48.5187',
      longitude: '27.5986',
      error: null
    })
    this.getMyPos();
  }

  componentWillMount() {

    // this.fetchData();
  }

  componentDidMount() {
    this.getMyPosStart();
  }

  async getMyPosStart(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
      },
      (error) => {
        
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000000 },
    );
  }


  async getMyPos(){
    var startPos = Date.now();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        var endPos = Date.now();
        console.log("&TEST&GET_LOCATION&" + (endPos - startPos)); 

        this.fetchData()
      },
      (error) => {
        alert(error.message);
        this.setState({ error: error.message });
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000000 },
    );
  }

  async fetchData(){
    try{
      var startTime = Date.now();

      let response = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ this.state.latitude+","+this.state.longitude+"&radius=50000&key=AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk")
      
      var endTime = Date.now();
      console.log("&TEST&GET_LIST&" + (endTime - startTime)); 
      
      var startTimeData = Date.now();

      let responseJson = await response.json();

      var that = this
      responseJson.results.forEach(function(element){
        element.distance = Math.round(getDistance(element.geometry.location,{lng: that.state.longitude, lat: that.state.latitude}))
      });
      this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson.results)});

      var endTimeData = Date.now();
      console.log("&TEST&DATA_PREP_LIST&" + (endTimeData - startTimeData)); 

    } catch(error){
      console.error(error);
    }
  }


  // render() {
  //   return (
  //     <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Latitude: {this.state.latitude}</Text>
  //       <Text>Longitude: {this.state.longitude}</Text>
  //       {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
  //       <ActionButton icon="refresh"  onPress={ this.handler.bind(this) } style={{container: { backgroundColor: '#4E8DEB'} }} />
  //     </View>
  //   );
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
        contentInset={{bottom:15}}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow = {
           (rowData) => (
             <TouchableHighlight
              onPress={() => navigate('DetailView', {data: rowData})}
              >
               <View>
                <Row lat={this.state.latitude} lng={this.state.longitude} name={rowData.name} distance={rowData.distance} gender={rowData.geometry ? rowData.geometry.location : undefined} />
              </View>
            </TouchableHighlight>
           )
        }
        />
        <ActionButton icon="refresh"  onPress={ this.handler.bind(this) } nativeID="fab" accessibilityLabel="fab" style={{container: { backgroundColor: '#4E8DEB'} }} />
      </View>
    );
  }
}
