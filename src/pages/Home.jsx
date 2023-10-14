import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

import { searchContext } from "../App";

function Home() {
  const { categoryId, sortType, currentPage } = useSelector((state) => ({
    categoryId: state.filter.categoryId,
    sortType: state.filter.sort.sortProperty,
    currentPage: state.filter.currentPage,
  }));

  const { searchValue } = useContext(searchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? categoryId : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "desc" : "asc";

    axios
      .get(
        `https://65264185917d673fd76be60b.mockapi.io/items?category=${category}&page=${currentPage}&limit=8&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

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
}

export default Home;
