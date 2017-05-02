import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAFX1AAPLC00jhHassExU7e3JaR11fHo3I',
      authDomain: 'auth-1979b.firebaseapp.com',
      databaseURL: 'https://auth-1979b.firebaseio.com',
      projectId: 'auth-1979b',
      storageBucket: 'auth-1979b.appspot.com',
      messagingSenderId: '304487743286'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()} >
                Log out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ marginTop: 50 }}>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
