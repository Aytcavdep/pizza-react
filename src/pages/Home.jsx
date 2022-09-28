import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useContext, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const navigate = useNavigate();
  const { categoryId, sort: sortType, currentPage } = useSelector(selectFilter);
  const dispath = useDispatch();

  const { items, status } = useSelector(selectPizzaData);

  const { searchValue } = useContext(SearchContext);
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangeCategory = (id) => {
    dispath(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispath(setCurrentPage(number));
  };

  //если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //если был первый рендер, то проверяем параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispath(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  //если был первый рендер, то запрашивать пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      dispath(fetchPizzas({ search, categoryId, currentPage, sortType }));
    }
    isSearch.current = false;
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
      {status === 'error' ? (
        <div className="content_error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
