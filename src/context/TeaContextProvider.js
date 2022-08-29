import React from 'react';
// import { useNavigate } from "react-router-dom";
import TeaContext from "./TeaContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default class TeaProvider extends React.Component{
    state = {
        tea:[],
        teaTypes:[],
        brands:[],
        packaging:[],
        placeOfOrigins:[],
        tasteProfiles:[],
        
      }
    async componentDidMount() {
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
        let teaResponse = await axios.get(url + "tea");
        console.log(teaResponse);
        // let searchFieldsResponse = await axios.get(url + "products/fields");
        this.setState({
            tea: teaResponse.data.tea,
            teaTypes: teaResponse.data.teaTypes,
            brands: teaResponse.data.brands,
            packaging: teaResponse.data.packaging,
            placeOfOrigins: teaResponse.data.placeOfOrigins,
            tasteProfiles: teaResponse.data.tasteProfiles
        })
    };
    render(){
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        const teaSearchUrl = url + "tea/";
        
        const teaContext = { 
            displayAllTea: () => {
                return this.state.tea;
            },
            searchTea: async (searchQuery) => {
              let teaSearchResults = await axios.get(teaSearchUrl, {
                params: {
                  name: searchQuery.name,
                  min_cost: searchQuery.min_cost,
                  max_cost: searchQuery.max_cost,
                  brand_id: searchQuery.brand,
                  tea_type_id: searchQuery.teaType,
                  place_of_origin_id: searchQuery.placeOfOrigin,
                  packaging_id: searchQuery.packaging,
                  taste_profile_id:searchQuery.tasteProfile
                }
              });
              console.log(teaSearchResults.data)
              let tea = teaSearchResults.data.tea;
              console.log(tea);
              await this.setState({
                tea
              });
            },
            getAllTeaBrands: () => {
                return this.state.brands
            },
            getAllTeaTypes: () => {
                return this.state.teaTypes
            },
            getAllPackaging: () => {
                return this.state.packaging
            },
            getAllPlaceOfOrigins: () => {
                return this.state.placeOfOrigins
            },
            getAllTasteProfiles: () => {
                return this.state.tasteProfiles
            },
        }
        return(
            <React.Fragment>
                <TeaContext.Provider value={teaContext}>
                    {this.props.children}
                </TeaContext.Provider>
            </React.Fragment>
        )
    }
}
