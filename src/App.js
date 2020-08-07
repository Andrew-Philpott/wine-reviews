import React, { useState } from "react";
import "./App.css";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import { array } from "yargs";

function getReviewsFromLocalStorage() {
  let reviews = localStorage.getItem("reviews");
  let parsedReviews = null;
  if (reviews) {
    parsedReviews = JSON.parse(reviews);
    return parsedReviews;
  } else {
    return null;
  }
}

function setReviewsToLocalStorage(data) {
  for (let i = 0; i < data.length; i++) {
    const stringify = JSON.stringify(data[i]);
    localStorage.setItem(`reviews${i}`, stringify);
  }
}

function App() {
  const [data, setData] = React.useState(null);
  const [inputs, setInputs] = useState({
    country: "",
  });
  const [countries, setCountries] = React.useState([]);
  const [error, setError] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  React.useEffect(() => {
    if (data === null) {
      const reviews = getReviewsFromLocalStorage();
      if (reviews === null) {
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
        setData(reviews);
      }
    }
  }, []);
  console.log(countries);
  console.log(localStorage.getItem(""));
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
              {countries.values((x) => {
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
            <div style={{ float: "left" }}></div>
            <div style={{ float: "right" }}></div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
