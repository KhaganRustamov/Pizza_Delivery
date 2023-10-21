import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { changePage } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

import styles from "./pagination.module.scss";

const Pagination: React.FC = () => {
  const page = useSelector((state: RootState) => state.filter.currentPage);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(changePage(e.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
