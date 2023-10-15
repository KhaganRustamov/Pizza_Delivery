import { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { searchContext } from "../../App";

import styles from "./search.module.scss";

import search from "../../assets/img/search.png";
import clear from "../../assets/img/delete.png";

const Search = () => {
  const inputRef = useRef();

  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(searchContext);

  const onClear = () => {
    setValue("");
    setSearchValue("");
    inputRef.current.focus();
  };

  const testDebounce = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 500),
    []
  );

  const onChangeInput = (e) => {
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
