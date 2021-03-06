import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ReviewForm from "./components/ReviewForm";
import useForm from "./components/hooks/useForm";
import Landing from "./components/Landing";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [filters, setFilters] = React.useState({
    country: "",
    search: "",
    results: 10,
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues) temp.title = fieldValues.title ? true : false;
    if ("variety" in fieldValues)
      temp.variety = fieldValues.variety ? true : false;
    if ("winery" in fieldValues)
      temp.winery = fieldValues.winery ? true : false;
    if ("rating" in fieldValues)
      temp.rating = fieldValues.rating ? true : false;
    if ("price" in fieldValues) temp.price = fieldValues.price ? true : false;
    if ("taster" in fieldValues)
      temp.taster = fieldValues.taster ? true : false;
    if ("country" in fieldValues)
      temp.country = fieldValues.country ? true : false;

    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    {
      title: "",
      variety: "",
      winery: "",
      rating: "",
      price: "",
      taster: "",
      country: "",
    },
    validate
  );

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((filters) => ({ ...filters, [name]: value }));
  }

  function searchReviews(queryString) {
    if (queryString === "") {
      return [];
    } else {
      let newState = [...data];
      let queryTypes = ["variety", "title", "winery", "tasterName"];
      let filteredReviews = [];
      queryTypes.forEach((element) => {
        filteredReviews = newState.filter((x) => x[element] === queryString);
        if (filteredReviews.length !== 0) {
          return filteredReviews;
        }
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((jres) => {
        setData([...data, jres]);
      })
      .catch(() =>
        setError(
          "Something went wrong on our end trying to add a review. Please try again later."
        )
      );
  }

  React.useEffect(() => {
    if (data.length === 0) {
      (async () => {
        try {
          const response = await fetch("/api/reviews", {
            method: "GET",
          });
          const data = await response.json();
          setData(data);
        } catch {
          setError(
            "We're sorry. Something went wrong on our end. Please try again later."
          );
        }
      })();
    }
  }, [data]);

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={4}>
          <h1 id="header">Wine reviews</h1>
        </Grid>
        <Grid item xs={8} />
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
          <Grid item xs={12}>
            {error && <h1>{error}</h1>}
          </Grid>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Landing
                  searchReviews={searchReviews}
                  handleFilterChange={handleFilterChange}
                  data={data}
                  filters={filters}
                />
              </Route>
              <Route exact path="/new">
                <ReviewForm
                  values={values}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              </Route>
              <Redirect from="*" to="/" />
            </Switch>
          </BrowserRouter>
        </Grid>
        <Grid item xs={1} sm={3} md={3} lg={4} xl={4} />
      </Grid>
    </div>
  );
}

export default App;
