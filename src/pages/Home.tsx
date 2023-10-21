import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { AppDispatch, RootState } from "../redux/store";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { items, status } = useSelector((state: RootState) => state.pizza);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state: RootState) => ({
      categoryId: state.filter.categoryId,
      sortType: state.filter.sort.sortProperty,
      currentPage: state.filter.currentPage,
      searchValue: state.filter.searchValue,
    })
  );

  const category = categoryId > 0 ? categoryId : "";
  const sortBy = sortType.replace("-", "");
  const order = sortType.includes("-") ? "desc" : "asc";

  useEffect(() => {
    dispatch(fetchPizzas({ category, sortBy, order, currentPage }));
  }, [category, sortBy, order, currentPage]);

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить список пицц</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
