import React, { Component, Fragment, unstable_Profiler } from "react";
import { Grid } from "@material-ui/core";
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

        <Grid container>
          <Grid xs={4}>
            {this.state.continents && (
              <SelectSearch
                options={this.getContinets(this.state.continents)}
                value="sv"
                name="language"
                placeholder="Choose your language"
                value={this.state.selectedContinent}
                onChange={value => this.selectContinent(value)}
              />
            )}
          </Grid>
          <Grid xs={4}>
            {this.state.selectedContinent && (
              <ReactMultiSelectCheckboxes
                placeholder="Choose your language"
                options={this.getCountries()}
                onChange={value => this.selectCountries(value)}
              />
            )}
          </Grid>
          <Grid xs={4}>
            {this.state.selectedCountries &&
              this.state.selectedCountries.map((country, index) => {
                console.log("ABCD".toLowerCase());
                return <Twemoji text={country.flag} />;
              })}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
