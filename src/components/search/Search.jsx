import { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { searchContext } from "../../App";

import styles from "./search.module.scss";

function Search() {
  const inputRef = useRef();

  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(searchContext);

  const onClear = () => {
    setValue("");
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
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Введите название пиццы"
      />

      {value && (
        <svg
          onClick={onClear}
          className={styles.clear}
          enableBackground="new 0 0 26 26"
          id="Слой_1"
          version="1.1"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0605469,13L24.7802734,2.2802734c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469  s-0.7675781-0.2929688-1.0605469,0L13,11.9394531L2.2802734,1.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0  s-0.2929688,0.7675781,0,1.0605469L11.9394531,13L1.2197266,23.7197266c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266L13,14.0605469l10.7197266,10.7197266  C23.8662109,24.9267578,24.0576172,25,24.25,25s0.3837891-0.0732422,0.5302734-0.2197266  c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.0605469,13z"
            fill="#1D1D1B"
          />
        </svg>
      )}
    </div>
  );
}

export default Search;
