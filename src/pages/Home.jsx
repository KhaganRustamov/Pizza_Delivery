import { useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/categories/Categories";
import Sort, { sortList } from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

import { searchContext } from "../App";

import { changeFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, setItems } from "../redux/slices/pizzaSlice";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.pizza.items);
  const { categoryId, sortType, currentPage } = useSelector((state) => ({
    categoryId: state.filter.categoryId,
    sortType: state.filter.sort.sortProperty,
    currentPage: state.filter.currentPage,
  }));

  const { searchValue } = useContext(searchContext);
  const [isLoading, setIsLoading] = useState(true);

  const getPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? categoryId : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "desc" : "asc";

    try {
      dispatch(fetchPizzas({ category, sortBy, order, currentPage }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, setSearchParams]);

  useEffect(() => {
    if (!isSearch.current && !searchParams.toString()) {
      const params = Object.fromEntries(searchParams.entries());
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      if (sort) {
        dispatch(
          changeFilters({
            ...params,
            sort,
          })
        );
      }
      isSearch.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    getPizzas();
  }, []);

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock {...item} key={item.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
