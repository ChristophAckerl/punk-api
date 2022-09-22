import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface IBeerSwitchProps {
  checked: boolean;
  func: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BeerSwitch({ checked, func }: IBeerSwitchProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={func}
            inputProps={{ "aria-label": "Show strong beers" }}
          />
        }
        label="Show strong beers"
      />
    </FormGroup>
  );
}
