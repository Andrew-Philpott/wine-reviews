import React from "react";
import { MenuItem, TextField, Button } from "@material-ui/core";

export default ({ ...props }) => {
  const { values, errors, handleInputChange, handleSubmit } = props;

  return (
    <form
      className="review-form"
      method="POST"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Add a review</h1>
      <TextField
        type="text"
        fullWidth
        label="title"
        name="title"
        value={values.title}
        onChange={handleInputChange}
        variant="outlined"
        {...(errors.title === false && {
          error: true,
        })}
      />
      <TextField
        type="text"
        fullWidth
        label="variety"
        name="variety"
        value={values.variety}
        onChange={handleInputChange}
        variant="outlined"
        {...(errors.variety === false && {
          error: true,
        })}
      />
      <TextField
        type="text"
        fullWidth
        label="winery"
        name="winery"
        variant="outlined"
        value={values.winery}
        onChange={handleInputChange}
        {...(errors.winery === false && {
          error: true,
        })}
      />
      <TextField
        select
        fullWidth
        label="rating"
        name="rating"
        variant="outlined"
        value={values.rating}
        onChange={handleInputChange}
        {...(errors.rating === false && {
          error: true,
        })}
      >
        <MenuItem key="" value="">
          {""}
        </MenuItem>
        <MenuItem key={1} value={1}>
          1 Star
        </MenuItem>
        <MenuItem key={2} value={2}>
          2 Stars
        </MenuItem>
        <MenuItem key={3} value={3}>
          3 Stars
        </MenuItem>
        <MenuItem key={4} value={4}>
          4 Stars
        </MenuItem>
        <MenuItem key={5} value={5}>
          5 Stars
        </MenuItem>
      </TextField>
      <TextField
        type="text"
        fullWidth
        label="129.99"
        name="price"
        variant="outlined"
        value={values.price}
        onChange={handleInputChange}
        {...(errors.price === false && {
          error: true,
        })}
      />
      <TextField
        type="text"
        fullWidth
        label="Jean Holidash"
        name="taster"
        variant="outlined"
        value={values.taster}
        onChange={handleInputChange}
        {...(errors.taster === false && {
          error: true,
        })}
      />
      <TextField
        type="text"
        fullWidth
        label="United States"
        name="country"
        variant="outlined"
        value={values.country}
        onChange={handleInputChange}
        {...(errors.country === false && {
          error: true,
        })}
      />
      <Button className="blk-border-1" type="submit">
        Submit
      </Button>
      <Button className="blk-border-1">Cancel</Button>

      {errors && Object.values(errors).indexOf(false) !== -1 && (
        <p className="errors">Fields marked in red are required.</p>
      )}
    </form>
  );
};
