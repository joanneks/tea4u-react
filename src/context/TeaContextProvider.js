import React from 'react';
// import { useNavigate } from "react-router-dom";
import TeaContext from "./TeaContext";
import axios from 'axios';

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
        let packaging= teaResponse.data.packaging;
        let teaTypes= teaResponse.data.teaTypes;
        let brands= teaResponse.data.brands;
        let origins = teaResponse.data.placeOfOrigins;
        teaTypes[0] = [0,'All Types'];
        origins[0] = [0,'All Origins'];
        packaging[0] = [0,'All Packaging'];
        brands[0] = [0,'All Brands'];
        this.setState({
            tea: teaResponse.data.tea,
            teaTypes: teaTypes,
            brands: brands,
            packaging: packaging,
            placeOfOrigins: origins,
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
                  taste_profiles:searchQuery.tasteProfiles
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
            getTeaDetails: async (teaId) => {
                const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
                let teaResponse = await axios.get(url + "tea/" + teaId); 
                let tea = teaResponse.data.tea;
                console.log(tea)
                
                return tea;
            }
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
