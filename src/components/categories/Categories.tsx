import { useDispatch, useSelector } from "react-redux";

import { changeCategory } from "../../redux/slices/filterSlice";

import { RootState } from "../../redux/store";

import "./categories.scss";

const Categories: React.FC = () => {
  const category = useSelector((state: RootState) => state.filter.categoryId);
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
            className={category === i ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
