import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { changeSort } from "../../redux/slices/filterSlice";

import "./sort.scss";

import sortIcon from "../../assets/img/sort.png";

interface ISort {
  name: string;
  sortProperty: string;
}

export const sortList: ISort[] = [
  { name: "популярности", sortProperty: "-rating" },
  { name: "возрастающей цене", sortProperty: "price" },
  { name: "убывающей цене", sortProperty: "-price" },
  { name: "алфавиту", sortProperty: "title" },
];

const Sort: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const sort = useSelector((state: any) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const onSelectList = (item: ISort) => {
    dispatch(changeSort(item));
    setShowList(false);
  };

  useEffect(() => {
    const handleBodyClick = (e: any) => {
      if (!sortRef.current?.contains(e.target)) {
        setShowList(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <img src={sortIcon} width="20" height="20"></img>
        <b>Сортировка по:</b>
        <span onClick={() => setShowList(!showList)}>{sort.name}</span>
      </div>
      {showList && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, i) => (
              <li
                key={i}
                onClick={() => onSelectList(item)}
                className={
                  sort.sortProperty === item.sortProperty ? "active" : ""
                }
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
