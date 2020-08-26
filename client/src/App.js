import React from "react";
import "./App.css";
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Button,
  IconButton,
} from "@material-ui/core";
import setReviewsToLs from "./setReviewsToLS";
import setReviewsFromLs from "./setReviewsFromLs";
import usePagination from "./usePagination";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import Pagination from "./Pagination";
import SearchIcon from "@material-ui/icons/Search";
import useForm from "./useForm";

function App() {
  const [data, setData] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState("");
  const [filters, setFilters] = React.useState({
    country: "",
    search: "",
    results: 10,
  });
  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    title: "",
    variety: "",
    winery: "",
    points: "",
    price: "",
    taster: "",
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((filters) => ({ ...filters, [name]: value }));
  }

  function searchReviews(queryString) {
    if (queryString === "") {
      setResults([...data]);
    } else {
      let newState = [...data];
      let queryTypes = ["variety", "title", "winery", "tasterName"];
      let filteredReviews = [];
      queryTypes.forEach((element) => {
        filteredReviews = newState.filter((x) => x[element] === queryString);
        if (filteredReviews.length !== 0) {
          setResults(filteredReviews);
        }
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const jsonResponse = await response.json();
      setData([...data, jsonResponse]);
    } catch {
      setError(
        "Something went wrong on our end trying to add a review. Please try again later."
      );
    }
  }

  React.useEffect(() => {
    if (data.length === 0) {
      // if (localStorage.getItem("reviews0") === null) {
      (async () => {
        try {
          const response = await fetch("/api/reviews", {
            method: "GET",
          });
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
    }

    // else {
    //   setReviewsFromLs(setData, setResults, data);
    // }
    // }
  }, [data]);

  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    results,
    filters.results
  );

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={3}>
          <h1 id="header">Wine reviews</h1>
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={1} sm={3} md={3} lg={4} xl={4} />
        <Grid
          className="card"
          component={Paper}
          item
          xs={10}
          sm={6}
          md={6}
          lg={4}
          xl={4}
        >
          <Button className="float-right">Create Review</Button>
          <Grid container>
            <Grid item xs={12}>
              {error && <h1>{error}</h1>}
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <h2>TOTAL NUMBER OF REVIEWS</h2>
              <Grid
                container
                alignItems="center"
                justify="center"
                className="review-count"
              >
                <span>
                  {data && filters.country === ""
                    ? ""
                    : data &&
                      data.filter((x) => x.country === filters.country).length}
                </span>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={3} />
                <Grid item xs={8}>
                  <h2>Countries of Origin</h2>
                  {data ? (
                    <TextField
                      select
                      name="country"
                      value={filters.country}
                      onChange={handleFilterChange}
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
                      value={filters.country}
                      onChange={handleFilterChange}
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
            <Grid item xs={1} />
            <Grid spacing={1} style={{ marginTop: "80px" }} container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item sm={1} md={1} lg={1} xl={1} />
                  <Grid item xs={7} sm={6} md={6} lg={6} xl={6}>
                    <Grid alignItems="center" container>
                      <span style={{ marginRight: "2px", float: "left" }}>
                        Filters:
                      </span>
                      <TextField
                        type="text"
                        name="search"
                        className="search-box"
                        placeholder="Search term"
                        value={filters.search}
                        onChange={handleFilterChange}
                        variant="outlined"
                      />

                      <IconButton
                        style={{
                          borderRadius: "0px",
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingTop: "16px",
                          paddingBottom: "16px",
                        }}
                        onClick={() => searchReviews(filters.search)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={5} sm={4} md={4} lg={4} xl={4}>
                    <Grid alignItems="center" justify="flex-end" container>
                      <span style={{ marginRight: "2px", float: "left" }}>
                        Results:
                      </span>
                      <TextField
                        select
                        name="results"
                        className="results-filter"
                        value={filters.results}
                        onChange={handleFilterChange}
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
                    </Grid>
                  </Grid>
                  <Grid item sm={1} md={1} lg={1} xl={1} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ReviewsList results={results} currentData={currentData} />
              <Pagination
                currentPage={currentPage}
                maxPage={maxPage}
                prev={prev}
                jump={jump}
                next={next}
              />
            </Grid>
          </Grid>
          <ReviewForm
            values={values}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={1} sm={3} md={3} lg={4} xl={4} />
      </Grid>
    </div>
  );
}

export default App;
