import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  AppRegistry,
} from 'react-native';
import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
} from 'react-native-collapsing-toolbar'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import NestedScrollView from 'react-native-nested-scroll-view'

const data = Array(1).fill().map((_, index) => ({key: index.toString()}))

const HEADER_HEIGHT = 250
const { width, height } = Dimensions.get('window')



export default class DetailView extends Component {
  static navigationOptions = ({ navigation }) => ({

    header: null
 });

//
  async fetchData(){
    try{
      const { params } = this.props.navigation.state;
      var startTime = Date.now();

      var placeId = params.data.place_id
      let response = await fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&fields=website,rating,price_level,formatted_phone_number&key=AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk")

      var endTime = Date.now();
      console.log("&TEST&GET_DETAILS&" + (endTime - startTime)); 
    
      var startTimeData = Date.now();

      let responseJson = await response.json();
      console.log("&TEST&:"+JSON.stringify(responseJson));
      this.setState({rating: responseJson.result.rating});
      this.setState({priceLevel: responseJson.result.price_level});

      var endTimeData = Date.now();
      console.log("&TEST&DATA_PREP_DETAIL&" + (endTimeData - startTimeData)); 

    } catch(error){
      console.error(error);
    }
  }

 state = {
    icon: null,
    scrollY: new Animated.Value(0),
    rating: '-',
    category: '-',
    priceLevel: '-',
  };

  componentWillMount() {

    this.fetchData();
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if(params.data.photos.length > 0)
    {
      this.setState({photoRef: params.data.photos[0].photo_reference});
    }
    this.setState({category: params.data.types[0]});

    // Load icon from react-native-vector-icons manually
    Icon.getImageSource('md-arrow-back', 24, '#ffffff').then((source) => {
      this.setState({ icon: source })
    })
  }

  captureAppBarRef = (ref) => {
    this.appBar = ref
  }

  handleActionSelected = (action) => {
    return action === 0 ? this.appBar.show()
         : action === 1 ? this.appBar.hide()
         : null
  }

  handleOffsetChanged = (e) => {
    Animated.event(
      [{ nativeEvent: { offset: this.state.scrollY }}]
    )(e, this.state)
  }

//
  renderScroll(props) {
    return (
      <NestedScrollView {...props} style={styles.nestedScroll} />
    )
  }

  render() {

    const { scrollY, icon } = this.state
    const rotateZ = scrollY.interpolate({
      inputRange:  [0, 100],
      outputRange: ["0deg", "-50deg"],
    })
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar translucent  />
        <View style={styles.statusBar} />
        <CoordinatorLayout>
          <AppBarLayout
            ref={this.captureAppBarRef}
            onOffsetChanged={this.handleOffsetChanged}
            style={styles.appbar}>
            <CollapsingToolbarLayout
              title={params.data.name}
              contentScrimColor='#F5F5F5'
              expandedTitleColor='black'
              collapsedTitleTextColor='black'
              expandedTitleGravity='BOTTOM'
              scrimVisibleHeightTrigger={100}
              scrimAnimationDuration={400}
              expandedTitleMarginStart={22}
              expandedTitleMarginBottom={40}
              scrollFlags={
                  AppBarLayout.SCROLL_FLAG_SCROLL
                | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED}>
              <CollapsingParallax parallaxMultiplier={0.6}>
                <View collapsable={false} style={styles.parallaxView}>
                  <Image source={require('../assets/images/drawer6.jpg')} style={styles.image} />
                  <Image source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+this.state.photoRef+'&key=AIzaSyBcdlVKxY37xaCF6dg2IUKnu1SeLfww4uk'}} style={styles.image} />


                  <Text style={styles.text}>{params.data.distance}m</Text>
                </View>
              </CollapsingParallax>
              <Icon.ToolbarAndroid
                iconColor='white'
                onActionSelected={this.handleActionSelected}
                onIconClicked={goBack}
                actions={[]}
                navIconName={'md-arrow-back'}
              />
            </CollapsingToolbarLayout>
          </AppBarLayout>
          <NestedScrollView style={styles.nestedScroll}>

          <View style={{
            flex: 1,
            flexDirection: 'column',

          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'stretch',
              margin: 20,
            }}>
              <View style={{alignItems: 'center', flexDirection: 'column' ,flexGrow: 1, height: 50}} >
                <MaterialIcon name="phone" size={24} color="#3480EF" />
                <Text style={styles.navButtons}>CALL</Text>
              </View>
              <View style={{alignItems: 'center', flexDirection: 'column' ,flexGrow: 1, height: 50}} >
                <MaterialIcon name="public" size={24} color="#3480EF" />
                <Text style={styles.navButtons}>WEBSITE</Text>
              </ View >
            </View>
            <View style={{
              flexDirection: 'row', height: 50, alignItems: 'center',
              marginLeft: 20,
            }}>
                <Icon name="md-cart" size={26} color="#3480EF" />
                <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 22}} > Nível de Preço 3 de 5</Text>
            </View>

            <View style={{
              flexDirection: 'row', height: 50, alignItems: 'center',
              marginLeft: 20,
            }}>
                <Icon name="md-star" size={26} color="#3480EF" />
                <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 22}} > Avaliação {this.state.rating} de 5</Text>
            </View>

            <View style={{
              flexDirection: 'row', height: 50, alignItems: 'center',
              marginLeft: 20,
            }}>
                <MaterialIcon name="verified-user" size={26} color="#3480EF" />
                <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 22}} >{this.state.category}</Text>
            </View>
          </View>
          </NestedScrollView>
        </CoordinatorLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height - HEADER_HEIGHT,
  },
  appbar: {
    height: HEADER_HEIGHT,
    backgroundColor: 'white',
    shadowOpacity: 1,
    shadowOffset: {
      height: 1,
    },
    elevation: 2,
    shadowRadius: 1,
  },
  nestedScroll: {
    backgroundColor: '#F9F9F9',
  },
  toolbar: {
    height: 56,
  },
  parallaxView: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 2,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width,
    height: HEADER_HEIGHT - 80,
    position: 'absolute',
    top: 0,
    backgroundColor: '#fff',
    opacity: 1,
  },
  text: {
    fontSize: 14,
    color:'#000',
    position: 'absolute',
    bottom: 10,
    left: 22,
  },
  navButtons: {
    color: '#3480EF',
    marginTop:8,
  },
  reactImage: {
    width: 80,
    height: 80,
    opacity: 0.8,
  },
  statusBar: {
    height: 24,
  },
});
