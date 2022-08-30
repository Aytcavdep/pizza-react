import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { useState, useEffect } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности (убыв.)",
    sortProperty: "rating",
    sort: "desc"
  });
  const search = searchValue ? `&searc=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63082d44722029d9ddc94328.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortType.sortProperty}&order=${sortType.sort}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categoryId, sortType]);

  /* Фильтрация по существующему массиву
  const pizzas = items.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    ).map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });
    */
  const pizzas = items.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
