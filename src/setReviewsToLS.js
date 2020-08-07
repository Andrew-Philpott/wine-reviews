function setReviewsToLs(reviews) {
  for (let i = 0; i < reviews.length; i++) {
    const stringify = JSON.stringify(reviews[i]);
    localStorage.setItem(`reviews${i}`, stringify);
  }
}
export default setReviewsToLs;
