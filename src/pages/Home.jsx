import { useContext, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/categories/Categories";
import Sort, { sortList } from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

import { searchContext } from "../App";

import { changeFilters } from "../redux/slices/filterSlice";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const dispatch = useDispatch();

  const { categoryId, sortType, currentPage } = useSelector((state) => ({
    categoryId: state.filter.categoryId,
    sortType: state.filter.sort.sortProperty,
    currentPage: state.filter.currentPage,
  }));

  const { searchValue } = useContext(searchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? categoryId : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "desc" : "asc";

    try {
      const res = await axios.get(
        `https://65264185917d673fd76be60b.mockapi.io/items?category=${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}`
      );
      setItems(res.data);
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
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    fetchPizzas();
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
