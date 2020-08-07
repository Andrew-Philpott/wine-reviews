function setReviewsFromLs(setData, data) {
  let i = 0;
  let newState = [...data];
  while (localStorage.getItem(`reviews${i}`) !== null) {
    const parsedReview = JSON.parse(localStorage.getItem(`reviews${i}`));
    newState.push(parsedReview);
    setData(newState);
    i++;
  }
}
export default setReviewsFromLs;
