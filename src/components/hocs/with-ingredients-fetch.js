import React from 'react';

const withIngredientsFetch = (WrappedComponent) => {
  return class WithIngredientsFetch extends React.Component {
    state = {
      ingredients: [],
      isLoading: false,
      hasError: false,
    };

    componentDidMount() {
      this.fetchIngredients();
    }

    fetchIngredients = () => {
      this.setState({ isLoading: true });
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Ошибка при загрузке данных');
          }
        })
        .then((data) => {
          this.setState({ ingredients: data, isLoading: false });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ hasError: true, isLoading: false });
        });
    };

    render() {
      const { ingredients, isLoading, hasError } = this.state;
      return (
        <WrappedComponent ingredients={ingredients} isLoading={isLoading} hasError={hasError} {...this.props} />
      );
    }
  };
};

export default withIngredientsFetch;