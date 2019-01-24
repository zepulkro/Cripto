import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Resultado from './componentes/Resultado';
import axios from 'axios';

class App extends Component {

  state = {
    monedas: [],
    cotizacion: {},
    monedaCotizada: ''
  }

  async componentDidMount() {
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          monedas: respuesta.data.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // cotizar una cripto en base a una moneda
  obtenerValoresCripto = async (monedas) => {
    const {moneda, cripto} = monedas;

    const url = `https://api.coinmarketcap.com/v2/ticker/${cripto}/?convert=${moneda}/`;
  
    await axios.get(url)
      .then(respuesta => {
        this.setState({
          cargando: true
        })
        setTimeout(() => {          
          this.setState({
            cotizacion: respuesta.data.data,
            monedaCotizada: moneda,
            cargando: false
          })
        },2000);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {

    const cargando = this.state.cargando;

    let resultado;

    if(cargando) {
      resultado =
        <div class="spinner">
          <div class="rect1"></div>        
          <div class="rect2"></div>        
          <div class="rect3"></div>        
          <div class="rect4"></div>        
          <div class="rect5"></div>        
        </div>
    } else {
      resultado = 
        <Resultado 
          cotizacion = {this.state.cotizacion}
          monedaCotizada ={this.state.monedaCotizada}
        />
    }

    return (
      <div className="App">
        <Header 
          titulo="Cotiza Criptomonedas al Instante"
          />
          <div className="row justify-content-center">
            <div className="col-md-6 bg-light pb-4 contenido-principal">
              <Formulario
                monedas = {this.state.monedas}
                obtenerValoresCripto={this.obtenerValoresCripto}
              />
              {resultado}
            </div>
          </div>
      </div>
    );
  }
}

export default App;
