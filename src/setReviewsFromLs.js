function setReviewsFromLs(setData, data) {
  let i = 0;
  while (localStorage.getItem(`reviews${i}`) !== null) {
    let newState = [...data];
    const parsedReview = JSON.parse(localStorage.getItem(`reviews${i}`));
    newState.push(parsedReview);
    setData(newState);
    i++;
  }
}
export default setReviewsFromLs;
