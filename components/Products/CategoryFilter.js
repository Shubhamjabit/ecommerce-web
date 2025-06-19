import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Products.module.scss";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function CategoryFilter() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <FormControl className={styles.FormControl}>
        <FormLabel
          className={styles.FormLabel}
          id="demo-radio-buttons-group-label"
        >
          Wrench Style
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Box"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Box"
            control={<Radio />}
            label="Box"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Combination"
            control={<Radio />}
            label="Combination"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Open-end"
            control={<Radio />}
            label="Open-end"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
      <FormControl className={styles.FormControl}>
        <FormLabel
          className={styles.FormLabel}
          id="demo-radio-buttons-group-label"
        >
          Wrench Style
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Box"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Box"
            control={<Radio />}
            label="Box"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Combination"
            control={<Radio />}
            label="Combination"
            labelPlacement="start"
          />
          <FormControlLabel
            value="Open-end"
            control={<Radio />}
            label="Open-end"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.AccordionButton}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Head Style</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetails}>
          <ul>
            <li>
              <Button variant="text">Head Style</Button>
            </li>
            <li>
              <li>
                <Button variant="text">Ratching</Button>
              </li>

              <Button variant="text">Finish</Button>
            </li>
            <li>
              <Button variant="text">Apperance</Button>
            </li>
            <li>
              <Button variant="text">Material</Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={styles.AccordionButton}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography>Ratching</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetails}>
          <ul>
            <li>
              <Button variant="text">Head Style</Button>
            </li>
            <li>
              <li>
                <Button variant="text">Ratching</Button>
              </li>

              <Button variant="text">Finish</Button>
            </li>
            <li>
              <Button variant="text">Apperance</Button>
            </li>
            <li>
              <Button variant="text">Material</Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className={styles.AccordionButton}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography>Finish</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetails}>
          <ul>
            <li>
              <Button variant="text">Head Style</Button>
            </li>
            <li>
              <li>
                <Button variant="text">Ratching</Button>
              </li>

              <Button variant="text">Finish</Button>
            </li>
            <li>
              <Button variant="text">Apperance</Button>
            </li>
            <li>
              <Button variant="text">Material</Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className={styles.AccordionButton}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Apperance</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetails}>
          <ul>
            <li>
              <Button variant="text">Head Style</Button>
            </li>
            <li>
              <li>
                <Button variant="text">Ratching</Button>
              </li>

              <Button variant="text">Finish</Button>
            </li>
            <li>
              <Button variant="text">Apperance</Button>
            </li>
            <li>
              <Button variant="text">Material</Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        className={styles.AccordionButton}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Material</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.AccordionDetails}>
          <ul>
            <li>
              <Button variant="text">Head Style</Button>
            </li>
            <li>
              <li>
                <Button variant="text">Ratching</Button>
              </li>

              <Button variant="text">Finish</Button>
            </li>
            <li>
              <Button variant="text">Apperance</Button>
            </li>
            <li>
              <Button variant="text">Material</Button>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CategoryFilter;
