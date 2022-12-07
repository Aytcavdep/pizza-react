import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import React, { useCallback, useEffect, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { FilterSliceState } from '../redux/filter/types';

const Home: React.FC = () => {
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const navigate = useNavigate();
  const {
    categoryId,
    sort: sortBy,
    currentPage,
    searchValue,
  } = useSelector(selectFilter);
  const dispath = useAppDispatch();

  const { items, status } = useSelector(selectPizzaData);

  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangeCategory = useCallback((idx: number) => {
    dispath(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispath(setCurrentPage(page));
  };

  //если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortBy.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortBy, currentPage]);

  //если был первый рендер, то проверяем параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort =
        sortList.find((obj) => obj.sortProperty === params.sortProperty) ||
        sortList[0];
      dispath(
        setFilters({
          ...params,
          sort,
        } as FilterSliceState)
      );
      isSearch.current = true;
    }
  }, []);
  //если был первый рендер, то запрашивать пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      dispath(
        //@ts-ignore
        fetchPizzas({ search, categoryId, currentPage, sortBy })
      );
    }
    isSearch.current = false;
  }, [categoryId, sortBy, searchValue, currentPage]);

  /* Фильтрация по существующему массиву
  const pizzas = items.filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    ).map((pizza) => {
      return <PizzaBlock key={pizza.id} {...pizza} />;
    });
    */
  const pizzas = items.map((pizza: any) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content_error-info">
          <h2>
            Произошла ошибка <span>😕</span>
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
        onChangePage={(number: number) => onChangePage(number)}
      />
    </div>
  );
};

export default Home;
