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
//BASE URL for the Punk API
const PUNK_BASE_URL = "https://api.punkapi.com/v2/beers";

//Array to select which IDs to fetch from the API
const beerIdArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

//String buffer for future use
let beersToGet: string = "";

//Function to create the string of IDs to fetch from the API based on the Array;
function stringifyBeerIdArr() {
  beersToGet = beerIdArr.join("|");
}

stringifyBeerIdArr();

function BeerGrid() {
  const [beers, setBeers] = useState([]);
  const [checked, setChecked] = React.useState(false);

  //Handle the switch change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    //Fetch the beers from the API
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
          {checked
            ? //Checks if the switch is on or off
              beers
                //Filter the beers based on the ABV
                .filter((beer: IBeer) => beer.abv >= 5)
                //Map the filtered beers to the BeerCard component
                .map((beer: IBeer) => {
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
                })
            : beers
                .filter((beer: IBeer) => beer.abv < 5)
                .map((beer: IBeer) => {
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
                })}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default BeerGrid;
