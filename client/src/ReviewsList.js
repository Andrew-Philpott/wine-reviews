import React from "react";

import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

export default ({ ...props }) => {
  const { results, currentData } = props;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Variety</TableCell>
            <TableCell>Winery</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Taster</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.length !== 0 &&
            currentData().map((result, index) => {
              if (result !== null) {
                return (
                  <TableRow key={index}>
                    <TableCell>{result.title && result.title}</TableCell>
                    <TableCell>{result.variety && result.variety}</TableCell>
                    <TableCell>{result.winery && result.winery}</TableCell>
                    <TableCell>{result.points && result.points}</TableCell>
                    <TableCell>{result.price && result.price}</TableCell>
                    <TableCell>{result.taster && result.taster}</TableCell>
                  </TableRow>
                );
              }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
