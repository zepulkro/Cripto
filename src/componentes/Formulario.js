import React, { Component } from 'react';
import OptionSelect from './OptionSelect';

class Fomulario extends Component {

    monedaRef = React.createRef();
    criptoRef = React.createRef();

    cotizarMonedas = (e) => {
        e.preventDefault();

        // crea el objeto
        const cotizacion = {
            moneda: this.monedaRef.current.value,
            cripto: this.criptoRef.current.value
        }

        // enviar por props
        this.props.obtenerValoresCripto(cotizacion);
    }

    render() { 
        return ( 
            <form onSubmit={this.cotizarMonedas}>
                <div className="form-group">
                    <label>Moneda:</label>   
                    <select ref={this.monedaRef} className="form-control">
                        <option value="" disabled defaultValue>Elige tu moneda</option>
                        <option value="USD">Dolar Estadounidense</option>
                        <option value="PEN">Sol Peruano</option>
                        <option value="EUR">Euros</option>
                        <option value="ARS">Peso Argentino</option>
                    </select>       
                </div>
                <div className="form-group">
                    <label>Criptomodena</label>
                    <select ref={this.criptoRef} className="form-control">
                        {Object.keys (this.props.monedas ).map(key => (
                            <OptionSelect
                            key={key}
                                moneda={this.props.monedas[key]}
                            />
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Cotizar"/>
                </div>
            </form>
         );
    }
}
 
export default Fomulario;
 
