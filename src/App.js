import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://63082d44722029d9ddc94328.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((pizza) => {
                return <PizzaBlock key={pizza.id} {...pizza} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
