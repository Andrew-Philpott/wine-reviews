import React from "react";
import logo from "./logo.svg";
import "./App.css";

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
  const [error, setError] = React.useState("");

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

  return <div className="App"></div>;
}

export default App;
