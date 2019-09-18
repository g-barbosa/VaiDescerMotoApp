import React, from "react";
import { StyleSheet, View, Text, Button, TextInput,} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Header from './src/components/Header/index'
import BuscaBus from './src/components/BuscaBus/index'

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {linha:""}
  }
  render() {
    return (
      <View style={styles.itemsContainer}>
        <Ionicons name="md-bus" size={50} color="black" />
        <Header title='Vai Descer Motorista App'/>
        <TextInput style={styles.input} onChangeText={(linha) => this.setState({linha})} placeholder="digite o número da linha" />
        <MaterialCommunityIcons.Button name="bus-double-decker" color="black" backgroundColor="#836FFF" 
          onPress={() => this.props.navigation.navigate('Busca',{
            linha: this.state.linha
          })}>Procurar Ônibus
        </MaterialCommunityIcons.Button>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Giovanne Barbosa</Text>
        </View>
      </View>
    );
  }
}

class BuscaScreen extends React.Component {
  render() {
    const {navigation} = this.props
    const linha = navigation.getParam('linha')
    return (
      <BuscaBus linha={linha}/>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home : {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    }, 
    Busca: {
      screen: BuscaScreen,
      navigationOptions: {
        header: null,
      }
    }
  },{headerMode: 'screen'})

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#836FFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
  },
  itemsView:{
    backgroundColor: '#483D8B',
  },
  button: {
    marginTop: 30
  },
  input:{
    textAlign: 'center',
    height: 40,
    width: 160,
    borderRadius: 10,  
    borderWidth: 2,  
    borderColor: '#D3D3D3',  
    marginBottom: 10 
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:'#836FFF',
    height:40,
    alignItems:'center',
  },
  footerText: {
    color:'white',
    fontWeight:'bold',
    alignItems:'center',
    fontSize:10,
  },
})
export default createAppContainer(AppNavigator);