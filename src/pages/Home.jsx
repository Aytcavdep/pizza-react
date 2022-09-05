import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { useState, useEffect, useContext } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sort: sortType } = useSelector((state) => state.filter);
  const dispath = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchValue } = useContext(SearchContext);
  const search = searchValue ? `&search=${searchValue}` : "";

  const onChangeCategory = (id) => {
    dispath(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://63082d44722029d9ddc94328.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ``
        }&sortBy=${sortType.sortProperty}&order=${sortType.sort}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
