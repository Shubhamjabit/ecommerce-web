/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// const countries = [
//   {
//     code: "AU",
//     label: "Australia",
//   },

//   {
//     code: "CA",
//     label: "Canada",
//   },

//   {
//     code: "US",
//     label: "United States",
//   },
// ];
const countries = [
  {
    code: "AU",
    label: "Australia",
  },
];
function CountryView({ styles }) {
  const [value, setValue] = useState(countries[0]);

  return (
    <div className={styles.Countryview}>
      <img
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${value && value.code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${
          value && value.code.toLowerCase()
        }.png 2x`}
        alt={value && value.label}
        className={styles.Icon}
      />
      <Autocomplete
        onKeyPress={(e) => {
          e.preventDefault();
        }}
        disableClearable
        id="country-select-demo"
        value={value && value}
        sx={{ width: "100%" }}
        options={countries}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size="small"
        className={styles.Autocomplete}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${
                option && option.code.toLowerCase()
              }.png`}
              srcSet={`https://flagcdn.com/w40/${
                option && option.code.toLowerCase()
              }.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
              readOnly: true, // to prevent edit
            }}
          />
        )}
      />
    </div>
  );
}

export default CountryView;
