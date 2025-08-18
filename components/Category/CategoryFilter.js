import React, { useState } from "react";
import styles from "./Category.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useMediaQuery } from "@mui/material";

function CategoryFilter({
  CategoryDataBySlug,
  handleClickSubcatemenu,
  checkBoxState,
}) {
  const [open, setOpen] = useState(true);
  const screen = useMediaQuery("(max-width:600px)");
  // console.log(screen);
  return (
    <div className={styles.CategoryFilter}>
      <FormGroup aria-label="position" className={styles.CheckBoxFormGroup}>
        <FormLabel component="legend" className={styles.FormLabel}>
          {CategoryDataBySlug.name}
          {screen ? (
            <span onClick={() => setOpen(!open)}>
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          ) : (
            <></>
          )}
        </FormLabel>
        {open &&
          CategoryDataBySlug.category_filter.map((filter, index) => (
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  className={styles.Checkbox}
                  checkedIcon={<CheckIcon />}
                  checked={checkBoxState && checkBoxState[index] == true}
                />
              }
              label={filter.filter_name}
              labelPlacement="end"
              onChange={(event) => handleClickSubcatemenu(filter, event, index)}
              key={index}
            />
          ))}
      </FormGroup>
    </div>
  );
}

export default CategoryFilter;
