import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection } from './components/common';
import { LoginForm } from './components/loginForm';

export default class App extends React.Component {
  state = {
    loggedIn: null
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDhLbysA1ojB7oNwQmlEay6r-7pQSgJSlA',
      authDomain: 'angularfire2-9d906.firebaseapp.com',
      databaseURL: 'https://angularfire2-9d906.firebaseio.com',
      projectId: 'angularfire2-9d906',
      storageBucket: 'angularfire2-9d906.appspot.com',
      messagingSenderId: '115246924469'
    });

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      this.setState({ loggedIn: true })
    } else {
      this.setState({ loggedIn: false })
    }
  })
  }

  onLogout(){
    console.log("Logging out...")
    firebase.auth().signOut();
    this.setState({loggedIn: false})
  }

  renderContent(){
    if(this.state.loggedIn){
        return  (
          <CardSection>
          <Button onPress={this.onLogout.bind(this)}>Logout</Button>
               </CardSection>
          )
    } else {
      return <LoginForm />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Todo App" />
        {this.renderContent()}
      </View>
    );
  }
}