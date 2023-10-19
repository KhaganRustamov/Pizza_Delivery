import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { changePage } from "../../redux/slices/filterSlice";

import styles from "./pagination.module.scss";

const Pagination = () => {
  const page = useSelector((state: any) => state.filter.currentPage);
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
