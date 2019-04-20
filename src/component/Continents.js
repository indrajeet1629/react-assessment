import React, { Component, Fragment, unstable_Profiler } from "react";
import { Grid, Button } from "@material-ui/core";
import SelectSearch from "react-select-search";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { find } from "lodash";
import ReactCountryFlag from "react-country-flag";
import Twemoji from "react-emoji-render";

export default class Continent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continents: undefined,
      selectedContinent: undefined,
      selectedCountries: undefined
    };
    this.baseState = {
      selectedCountries: undefined
    };
  }
  callJSON = () => {
    let jsondata = require("../helpers/continents.json");
    var promise = new Promise((resolve, reject) => {
      resolve(jsondata);
    });
    return promise;
  };

  componentDidMount() {
    this.callJSON()
      .then(data => {
        this.setState({
          continents: data
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  getContinets = data => {
    let continents = [];
    for (var continent of data) {
      let continentObj = Object.assign(
        {},
        {
          name: continent.continent,
          value: continent.continent
        }
      );
      continents.push(continentObj);
    }
    return continents;
  };

  selectContinent = ({ value }) => {
    this.setState({
      selectedContinent: value
    });
  };

  clearFlags = () => {
    this.setState({
      selectedCountries: this.baseState.selectedCountries
    });
  };

  getCountries = () => {
    const { selectedContinent, continents } = this.state;
    let continentObj = find(continents, ["continent", selectedContinent]);
    if (continentObj) {
      // alert(JSON.stringify(continentObj.countries));
      let countries = [];
      for (var country of continentObj.countries) {
        let countryObj = Object.assign({}, country, {
          label: country.name,
          value: country.name,
          flag: country.flag.toString().toLowerCase()
        });
        countries.push(countryObj);
      }
      return countries;
    } else {
      return null;
    }
  };

  selectCountries = value => {
    this.setState({
      selectedCountries: value
    });
  };

  render() {
    console.log("this.state.conto");
    return (
      <Fragment>
        <Grid
          xs={12}
          lg={12}
          style={{ alignItems: "center", justifyContent: " center" }}
        >
          <h1>Flag Picker</h1>
          <span>
            This App will help you to learn flags around the world in{" "}
            <span style={{ textDecoration: "underline" }}>3 Steps</span>
          </span>
        </Grid>

        <Grid container style={{ marginTop: "3%", padding: "100px" }}>
          <Grid xs={4} md={4} style={{ textAlign: "center" }}>
            <h2>Step 1</h2>
            <h5>Select Continent</h5>
            {this.state.continents && (
              <div className="transformClass">
                <SelectSearch
                  options={this.getContinets(this.state.continents)}
                  value="sv"
                  name="language"
                  placeholder="Choose your language"
                  value={this.state.selectedContinent}
                  onChange={value => this.selectContinent(value)}
                />
              </div>
            )}
            {this.state.selectedContinent && <h5>Selected Continent</h5>}
            {this.state.selectedContinent && (
              <h2>{this.state.selectedContinent}</h2>
            )}
          </Grid>
          {this.state.selectedContinent && (
            <Grid xs={4} md={4}>
              <h2>Step 2</h2>
              <h5>Now, Select a country</h5>
              <ReactMultiSelectCheckboxes
                placeholder="Choose your language"
                options={this.getCountries()}
                onChange={value => this.selectCountries(value)}
              />
            </Grid>
          )}
          {this.state.selectedCountries && (
            <Grid xs={4} md={4}>
              <h2>Selected flags</h2>
              <Grid>
                {this.state.selectedCountries.map((country, index) => {
                  console.log("ABCD".toLowerCase());
                  return <Twemoji text={country.flag} />;
                })}
              </Grid>

              <Button
                variant="contained"
                color="primary"
                onClick={() => this.clearFlags()}
              >
                Clear flags
              </Button>
            </Grid>
          )}
        </Grid>
      </Fragment>
    );
  }
}
