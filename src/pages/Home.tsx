import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";

import Categories from "../components/categories/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from "../components/pagination/Pagination";

// import { changeFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const isMounted = useRef(false);
  // const isSearch = useRef(false);
  const dispatch = useDispatch();

  const { items, status } = useSelector((state:any) => state.pizza);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state:any) => ({
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
    dispatch
    //@ts-ignore
    (fetchPizzas({ category, sortBy, order, currentPage }));
  }, [category, sortBy, order, currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     setSearchParams({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage, setSearchParams]);

  // useEffect(() => {
  //   if (!isSearch.current && !searchParams.toString()) {
  //     const params = Object.fromEntries(searchParams.entries());
  //     const sort = sortList.find(
  //       (obj) => obj.sortProperty === params.sortProperty
  //     );
  //     if (sort) {
  //       dispatch(
  //         changeFilters({
  //           ...params,
  //           sort,
  //         })
  //       );
  //     }
  //     isSearch.current = true;
  //   }
  // }, [searchParams]);

  // useEffect(() => {
  //   if (!isSearch.current) {
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, currentPage]);

  // useEffect(() => {
  //   getPizzas();
  // }, []);

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    .filter((item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item: any) => <PizzaBlock {...item} key={item.id} />);

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
