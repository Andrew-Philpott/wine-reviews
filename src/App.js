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
  Link,
} from "@material-ui/core";
import { func } from "prop-types";

function App() {
  const [data, setData] = React.useState(null);
  const [inputs, setInputs] = useState({
    country: "",
    search: "",
    results: 10,
  });
  const [countries, setCountries] = React.useState([]);
  const [error, setError] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function setReviewsToLocalStorage(reviews) {
    for (let i = 0; i < reviews.length; i++) {
      setData([...data, reviews[i]]);
      const stringify = JSON.stringify(reviews[i]);
      localStorage.setItem(`reviews${i}`, stringify);
    }
  }

  function setReviewsFromLocalStorage() {
    let i = 0;
    let reviewsFromStorage = localStorage.getItem(`reviews${i}`);
    while (reviewsFromStorage !== null) {
      const parsedReview = JSON.parse(reviewsFromStorage);
      setData([data, parsedReview]);
    }
  }

  React.useEffect(() => {
    if (data === null) {
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
            setCountries([...new Set(data.map((x) => x.country))]);
            setReviewsToLocalStorage(data);
          } catch {
            setError(
              "We're sorry. Something went wrong on our end. Please try again later."
            );
          }
        })();
      } else {
        (async () => {
          setReviewsFromLocalStorage();
        })();
      }
    }
  }, []);

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
          <h1>Countires of Origin</h1>
          {countries ? (
            <TextField
              select
              name="countries"
              value={inputs.country}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {Object.values(countries).map((x) => {
                console.log(x);
                return (
                  <MenuItem key={1} value={x}>
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
        <Grid container>
          <Grid item xs={6}>
            Filters:{" "}
            <TextField
              type="text"
              name="search"
              value={inputs.search}
              onChange={handleChange}
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4}>
                {" "}
                <Button>SEARCH</Button>
              </Grid>
              <Grid item xs={8}>
                {" "}
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
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {data &&
                  data.map((x, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{x.title}</TableCell>
                        <TableCell>{x.variety}</TableCell>
                        <TableCell>{x.winery}</TableCell>
                        <TableCell>{x.points}</TableCell>
                        <TableCell>{x.price}</TableCell>
                        <TableCell>
                          <Link> {x.description}</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
