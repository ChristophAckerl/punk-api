import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import BeerCard from "./beerCard";
import BeerSwitch from "./switch";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface IBeer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  food_pairing: string;
  abv: number;
}

const PUNK_BASE_URL = "https://api.punkapi.com/v2/beers";

const beerIdArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let beersToGet: string = "";

function stringifyBeerIdArr() {
  beersToGet = beerIdArr.join("|");
}

stringifyBeerIdArr();

function BeerGrid() {
  const [beers, setBeers] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    axios.get(`${PUNK_BASE_URL}?ids=${beersToGet}`).then((response) => {
      setBeers(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <BeerSwitch checked={checked} func={handleChange} />
      <Box sx={{ flexGrow: 1, width: "80%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {beers.map((beer: IBeer) => {
            if (checked && beer.abv >= 5) {
              return (
                <Grid item xs={4} sm={4} md={4} key={beer.id}>
                  <BeerCard
                    name={beer.name}
                    tagline={beer.tagline}
                    description={beer.description}
                    image_url={beer.image_url}
                    food_pairing={beer.food_pairing[0]}
                  />
                </Grid>
              );
            } else if (!checked && beer.abv < 5) {
              return (
                <Grid item xs={4} sm={4} md={4} key={beer.id}>
                  <BeerCard
                    name={beer.name}
                    tagline={beer.tagline}
                    description={beer.description}
                    image_url={beer.image_url}
                    food_pairing={beer.food_pairing[0]}
                  />
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default BeerGrid;
