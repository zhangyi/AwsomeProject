/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ActivityIndicatorIOS,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

// var MOCKED_MOVIES_DATA = [
//   {title : 'Title', year : '2015', posters : {
//     thumbnail : 'http://i.imgur.com/UePbdph.jpg'
//   }}
// ];

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var AwsomeProject = React.createClass({
    getInitialState : function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
            // movies : null,
            dataSource: ds,
            loaded : false,
        }
    },
    componentDidMount : function() {
        this.fetchData();
    },
    fetchData : function() {
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            // this.setState({
            //     movies : responseData.movies,
            // })
            this.setState({
                dataSource : this.state.dataSource.cloneWithRows(responseData.movies),
                loaded : true,
            });
        })
        .done();
    },
    render: function() {
        // if (!this.state.movies) {
        //   return this.renderLoadingView();
        // }

        // var movie = this.state.movies[0];
        // return this.renderMovie(movie);

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
              dataSource={this.state.dataSource} 
              renderRow={this.renderMovie} 
              style={styles.listView}
            />
        );
    },
    renderLoadingView : function() {
        return (
            <View style={[styles.container]}>
                <View style={styles.loading}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'nowrap'}}>
                    <ActivityIndicatorIOS style={{marginRight:10}}/>
                    <Text style={styles.loadingText}>
                        Loading movies...
                    </Text>
                  </View>
                </View>
            </View>
        )
    },
    renderMovie : function(movie) {
        return (
            <View style={[styles.container, styles.space,]}>
                <Image source={{uri : movie.posters.thumbnail}} style={styles.thumbnail} />
                <View style={styles.rightContainer}>
                  <Text style={styles.title}>{movie.title}</Text>
                  <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
});

//https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail : {
      width : 53,
      height : 81,
  },
  rightContainer : {
    flex : 1,
    paddingLeft : 5,
    // backgroundColor : '#ffffff',
    // justifyContent : 'center',
    // flexDirection : 'column',
    // textAlign : 'left',
  },
  title : {
    fontSize : 20,
    marginBottom : 8,
    textAlign : 'left',
  },
  year : {
    textAlign : 'left',
  },
  loading : {
    backgroundColor : '#000000',
    opacity : 0.8,
    borderRadius : 8,
    padding : 20,
    // alignSelf : 'center',
  },
  loadingText : {
    color : '#ffffff',
    fontSize : 14,
    textAlign : 'center',
  },
  listView : {
      // paddingTop : 20,
      backgroundColor : '#F5FCFF',
  },
  space : {
      padding : 5,
      borderBottomWidth : 1,
      borderBottomColor : '#cccccc',
      borderStyle : 'solid',
      backgroundColor : '#ffffff'
  }
});

AppRegistry.registerComponent('AwsomeProject', () => AwsomeProject);
