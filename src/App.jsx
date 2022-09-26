import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validationForm());
  }

  validationForm = () => {

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } = this.state

    const validationInputs = cardName.length > 0 && cardDescription.length > 0 && cardImage.length > 0 && cardRare.length > 0;

    const maxOfPoints = 90;
    const maxOfInputsSum = 210;

    const validInputs = parseInt(cardAttr1, 10) >= 0 && parseInt(cardAttr2, 10) >= 0 && parseInt(cardAttr3, 10) >= 0;

    const individualInputMaxLength = (Number(cardAttr1 >= 0 && Number(cardAttr1) <= maxOfPoints)) && (Number(cardAttr2 >= 0 && Number(cardAttr2) <= maxOfPoints)) && (Number(cardAttr3 >= 0 && Number(cardAttr3) <= maxOfPoints));

    const sumOfAttr = parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= maxOfInputsSum;

    const valitationAll = validationInputs && individualInputMaxLength && sumOfAttr;

    this.setState({
      isSaveButtonDisabled: !valitationAll
    })

  }

  render() {  

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form { ...this.state } onInputChange={ this.handleChange } />
        <Card 
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
