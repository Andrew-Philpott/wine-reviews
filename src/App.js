import React, { useState } from "react";
import "./App.css";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import setReviewsToLs from "./setReviewsToLS";
import setReviewsFromLs from "./setReviewsFromLs";
import usePagination from "./usePagination";

function App() {
  const [data, setData] = React.useState([]);
  const [inputs, setInputs] = useState({
    country: "",
    search: "",
    results: 10,
    queryString: "",
  });
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState("");
  let currentResults = usePagination(data, inputs.results);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function searchReviews(queryString = inputs.queryString) {
    let newState = [...data];
    let filteredReviews = [];

    while (filteredReviews.length === 0) {
      filteredReviews = newState.filter((x) => x.variety === queryString);
      filteredReviews = newState.filter((x) => x.title === queryString);
      filteredReviews = newState.filter((x) => x.winery === queryString);
      filteredReviews = newState.filter((x) => x.tasterName === queryString);
      break;
    }
    setResults(filteredReviews);
    return;
  }

  React.useEffect(() => {
    if (data.length === 0) {
      if (localStorage.getItem("reviews0") === null) {
        (async () => {
          try {
            const response = await fetch(
              "https://lightninglaw.azurewebsites.net/api/reviews",
              {
                method: "GET",
              }
            );
            const data = await response.json();
            setData(data);
            setReviewsToLs(data);
          } catch {
            setError(
              "We're sorry. Something went wrong on our end. Please try again later."
            );
          }
        })();
      } else {
        setReviewsFromLs(setData, data);
      }
    }
  }, [data]);

  console.log(data);
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={6}>
          <h1>TOTAL NUMBER OF REVIEWS</h1>
          <Grid style={{ height: "500px", border: "2px solid black" }}>
            <h1>number</h1>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h1>Countries of Origin</h1>
          {data ? (
            <TextField
              select
              name="country"
              value={inputs.country}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {Object.values([...new Set(data.map((x) => x.country))]).map(
                (x, index) => {
                  return (
                    <MenuItem key={index} value={x}>
                      {x}
                    </MenuItem>
                  );
                }
              )}
            </TextField>
          ) : (
            <TextField
              select
              name="countries"
              value={inputs.country}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem key={1} value="">
                {""}
              </MenuItem>
            </TextField>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            Filters:{" "}
            <TextField
              type="text"
              name="search"
              placeholder="Search term"
              value={inputs.search}
              onChange={handleChange}
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4}>
                <Button onClick={() => searchReviews()}>SEARCH</Button>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={{ float: "right" }}
                  select
                  name="results"
                  value={inputs.results}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem key={10} value={10}>
                    10
                  </MenuItem>
                  <MenuItem key={20} value={20}>
                    20
                  </MenuItem>
                  <MenuItem key={30} value={30}>
                    30
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
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
                {data.length !== 0 &&
                  currentResults.currentData().map((result, index) => {
                    if (result !== null) {
                      return (
                        <TableRow key={index}>
                          <TableCell>{result.title && result.title}</TableCell>
                          <TableCell>
                            {result.variety && result.variety}
                          </TableCell>
                          <TableCell>
                            {result.winery && result.winery}
                          </TableCell>
                          <TableCell>
                            {result.points && result.points}
                          </TableCell>
                          <TableCell>{result.price && result.price}</TableCell>
                          <TableCell>
                            {result.tasterName && result.tasterName}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
