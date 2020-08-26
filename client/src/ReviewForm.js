import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";

export default ({ ...props }) => {
  const { values, errors, handleInputChange, handleSubmit } = props;
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.title === "Required." && {
              error: true,
            })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="variety"
            name="variety"
            value={values.variety}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.variety === "Required." && {
              error: true,
            })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="winery"
            name="winery"
            variant="outlined"
            value={values.winery}
            onChange={handleInputChange}
            {...(errors.winery === "Required." && {
              error: true,
            })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="points"
            name="points"
            variant="outlined"
            value={values.points}
            onChange={handleInputChange}
            {...(errors.points === "Required." && {
              error: true,
            })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="price"
            name="price"
            variant="outlined"
            value={values.price}
            onChange={handleInputChange}
            {...(errors.price === "Required." && {
              error: true,
            })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="taster"
            name="taster"
            variant="outlined"
            value={values.taster}
            onChange={handleInputChange}
            {...(errors.taster === "Required." && {
              error: true,
            })}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          style={{ marginRight: "10px" }}
          type="submit"
          className="button red-background mrgn-t8"
        >
          Cancel
        </Button>
        <Button type="submit" className="button blue-background mrgn-t8">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
