import React, { Component } from 'react'
import { View, FlatList, Text, Linking, Button, RefreshControl} from 'react-native'
import puxaApi from '../../api/PuxaApi'
import { Entypo } from '@expo/vector-icons'
import styles from './styles'

class BuscaBus extends Component {
  state = { 
    linha:"...",
    veiculos: [],
    redirect: false,
    refreshing: false
  };

  dataBus = () => {
    puxaApi(this.props.linha)
    .then(response => {
      let info = []
      info.push(response)
      let linhas = info[0].linhas[0]
      let linha = linhas["codigo"]
      let veiculos = linhas["veiculos"]
      this.setState({
        linha: linha,
        veiculos: veiculos,
        redirect: true,
        refreshing: false
      })
    })
  }

  async componentDidMount(){
    this.dataBus()
  }

    _onRefresh = () => {
      this.setState({refreshing: true})
      this.dataBus()
    }

  render() {
    return(
      <View style={styles.back} >
      <Text style={styles.titulo}>LINHA {this.state.linha} EMTU</Text>
        <FlatList
          data={this.state.veiculos}
          extraData={this.state}
          keyExtractor={item => item.version}
          renderItem={({item}) => {
            return (
              <View  style={styles.item}>
                <Text style={styles.text}>Sentido: {item.sentidoLinha}</Text>
                <Text style={styles.text}>Ponto: {item.seqPonto}</Text>
                  <Entypo.Button name="location" size={32} color="black" backgroundColor="#836FFF"
                    onPress={()=>{ Linking.openURL('https://www.google.com.br/maps/place/'+item.latitude+','+item.longitude)}}>
                    Ver no mapa
                  </Entypo.Button>
              </View>
            )
          }}
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    )
  } 
}

BuscaBus.navigationOptions = {
  title: 'BuscaBus',
}

export default BuscaBus;