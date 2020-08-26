import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

export default ({ ...props }) => {
  const { data, currentData } = props;

  if (data) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Variety</TableCell>
              <TableCell>Winery</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Taster</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length !== 0 &&
              currentData().map((result, index) => {
                if (result !== null) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{result.title && result.title}</TableCell>
                      <TableCell>{result.variety && result.variety}</TableCell>
                      <TableCell>{result.winery && result.winery}</TableCell>
                      <TableCell>{result.rating && result.rating}</TableCell>
                      <TableCell>{result.price && result.price}</TableCell>
                      <TableCell>{result.taster && result.taster}</TableCell>
                      <TableCell>{result.country && result.country}</TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <h1>Loading reviews...</h1>;
  }
};
