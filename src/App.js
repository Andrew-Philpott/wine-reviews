import React, { useState, useEffect } from "react";
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
  Container,
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
    search: "",
  });
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const searchReviews = (queryString) => {
    if (queryString === "") {
      setResults([...data]);
    } else {
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
    }

    return;
  };

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
            setResults(data);
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
  let currentResults = usePagination(data, inputs.results);
  console.log(data);
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <h1>TOTAL NUMBER OF REVIEWS</h1>
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{ height: "200px", border: "2px solid black" }}
              >
                <span style={{ fontSize: "12vw" }}>
                  {data && inputs.country === ""
                    ? ""
                    : data &&
                      data.filter((x) => x.country === inputs.country).length}
                </span>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={3} />
                <Grid item xs={8}>
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
                      {Object.values([
                        ...new Set(data.map((x) => x.country)),
                      ]).map((x, index) => {
                        return (
                          <MenuItem key={index} value={x}>
                            {x}
                          </MenuItem>
                        );
                      })}
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
                <Grid item xs={1} />
              </Grid>
            </Grid>
            <Grid style={{ marginTop: "80px" }} container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Grid container>
                  <Grid item xs={9}>
                    <Grid alignItems="center" container>
                      <span style={{ marginRight: "10px" }}>Filters:</span>
                      <TextField
                        type="text"
                        name="search"
                        style={{ width: "60%", marginRight: "10px" }}
                        placeholder="Search term"
                        value={inputs.search}
                        onChange={handleChange}
                        variant="outlined"
                      />

                      <Button
                        variant="outlined"
                        onClick={() => searchReviews(inputs.search)}
                      >
                        SEARCH
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Results:</span>
                      <TextField
                        select
                        name="results"
                        value={inputs.results}
                        onChange={handleChange}
                        variant="outlined"
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
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} />
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
                              <TableCell>
                                {result.title && result.title}
                              </TableCell>
                              <TableCell>
                                {result.variety && result.variety}
                              </TableCell>
                              <TableCell>
                                {result.winery && result.winery}
                              </TableCell>
                              <TableCell>
                                {result.points && result.points}
                              </TableCell>
                              <TableCell>
                                {result.price && result.price}
                              </TableCell>
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
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}

export default App;
