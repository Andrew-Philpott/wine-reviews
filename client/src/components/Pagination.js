import React from "react";
import { Grid, Button } from "@material-ui/core";

export default ({ ...props }) => {
  const { prev, jump, next, currentPage, maxPage } = props;
  return (
    <Grid className="pagination">
      <Button onClick={() => prev()}>{"<<"}</Button>
      <React.Fragment>
        {currentPage === 1 ? (
          <React.Fragment>
            <span>{currentPage}</span>
            {currentPage + 1 <= maxPage && (
              <React.Fragment>
                <span>{" | "}</span>
                <Button onClick={() => jump(currentPage + 1)}>
                  <span>{currentPage + 1}</span>
                </Button>
              </React.Fragment>
            )}
            {currentPage + 2 <= maxPage && (
              <React.Fragment>
                <span>{" | "}</span>
                <Button onClick={() => jump(currentPage + 2)}>
                  <span>{currentPage + 2}</span>
                </Button>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {currentPage - 1 >= 1 && (
              <Button onClick={() => jump(currentPage - 1)}>
                <span>{currentPage - 1}</span>
              </Button>
            )}
            <span>{" | "}</span>
            <span>{currentPage}</span>
            {currentPage + 1 <= maxPage && (
              <React.Fragment>
                <span>{" | "}</span>
                <Button onClick={() => jump(currentPage + 1)}>
                  <span>{currentPage + 1}</span>
                </Button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
      <Button onClick={() => next()}>{">>"}</Button>
    </Grid>
  );
};
