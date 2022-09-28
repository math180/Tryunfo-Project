import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validationForm());
  };

  validationForm = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const validationInputs = cardName.length > 0 && cardDescription.length
    > 0 && cardImage.length > 0 && cardRare.length > 0;

    const maxOfPoints = 90;
    const maxOfInputsSum = 210;

    const individualInputMaxLength = (Number(cardAttr1 >= 0 && Number(cardAttr1)
     <= maxOfPoints)) && (Number(cardAttr2 >= 0 && Number(cardAttr2)
      <= maxOfPoints)) && (Number(cardAttr3 >= 0 && Number(cardAttr3) <= maxOfPoints));

    const sumOfAttr = parseInt(cardAttr1, 10)
    + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= maxOfInputsSum;

    const valitationAll = validationInputs && individualInputMaxLength && sumOfAttr;

    this.setState({
      isSaveButtonDisabled: !valitationAll,
    });
  };

  saveBtn = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cards,
    } = this.state;

    const newArray = [...cards, {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    }];
    this.setState({
      cards: newArray,
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  };

  superTrunfoValidation = () => {
    const { cards } = this.state;

    const isST = cards.some((card) => card.cardTrunfo === true);

    const cond = isST === true ? 'Você já tem um Super Trunfo em seu baralho' : isST;

    return cond;
  };

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
      isSaveButtonDisabled,
      cards,
    } = this.state;

    const showCards = cards.map((card) => (
      <Card
        key={ card.cardName }
        cardName={ card.cardName }
        cardDescription={ card.cardDescription }
        cardAttr1={ card.cardAttr1 }
        cardAttr2={ card.cardAttr2 }
        cardAttr3={ card.cardAttr3 }
        cardImage={ card.Image }
        cardRare={ card.cardRare }
        cardTrunfo={ card.cardTrunfo }
      />
    ));

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.saveBtn }
          hasTrunfo={ this.superTrunfoValidation }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }

        />
        <div>
          { showCards.length > 0 ? showCards : '' }
        </div>
      </div>
    );
  }
}

export default App;
