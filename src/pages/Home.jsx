import { useEffect, useState } from "react";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? categoryId : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "desc" : "asc";

    fetch(
      `https://65264185917d673fd76be60b.mockapi.io/items?page=${currentPage}&&limit=8&&category=${category}&&sortBy=${sortBy}&&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
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
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}

export default Home;
