import React, { useState } from "react";
import "./App.css";
import { Grid, TextField } from "@material-ui/core";

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

function App() {
  const [data, setData] = React.useState([]);
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
    if (data.length === 0) {
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
            localStorage.setItem("reviews", JSON.stringify(data));
            setData(data);
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
          <TextField
            select
            name="countries"
            value={inputs.country}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          ></TextField>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
