import { ChangeEvent, useCallback, useRef, useState } from "react";

// @ts-ignore
import debounce from "lodash.debounce";

import { changeSearchValue } from "../../redux/slices/filterSlice";

import styles from "./search.module.scss";

import search from "../../assets/img/search.png";
import clear from "../../assets/img/delete.png";
import { useDispatch } from "react-redux";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");

  const onClear = () => {
    setValue("");
    dispatch(changeSearchValue(""));
    inputRef.current?.focus();
  };

  const testDebounce = useCallback(
    debounce((value: string) => {
      dispatch(changeSearchValue(value));
    }, 500),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    testDebounce(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img src={search} alt="search" className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Введите название пиццы"
      />

      {value && (
        <img
          onClick={onClear}
          className={styles.clear}
          src={clear}
          alt="clear"
        ></img>
      )}
    </div>
  );
};

export default Search;
