import { useDispatch, useSelector } from "react-redux";

import { changeCategory } from "../../redux/slices/filterSlice";

import "./categories.scss";

function Categories() {
  const category = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => dispatch(changeCategory(i))}
            className={category === i ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
