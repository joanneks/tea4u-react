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
        teaByBrand:[],
        teaTypeFilter:{
            oolongTea:'',
            whiteTea:'',
            blackTea:'',
            puerhTea:'',
            greenTea:'',
            tisaneTea:'',
            herbalTea:''
        },
        teaBrandFilter:{
            kindreaTeas:'',
            teaSpoonOfLove:'',
            petaleTea:''
        },
        teaTypeFilterStatus:false,
        teaBrandFilterStatus:false
      }
    async componentDidMount() {
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/"
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
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
        const url = "https://3000-joanneks-tea4uexpressba-qiw1tvvgol5.ws-us64.gitpod.io/api/";
        // const url = "https://tea4u-express-tgc18.herokuapp.com/api/"
        const teaSearchUrl = url + "tea/";

        const teaContext = { 
            getTeaTypeFilter: (keyName,teaTypeId) => {
                this.setState({
                    teaBrandFilterStatus:false
                });
                let revisedTeaTypeFilter = this.state.teaTypeFilter;
                revisedTeaTypeFilter[keyName] = teaTypeId;
                this.setState(revisedTeaTypeFilter);
                this.setState({teaTypeFilterStatus:true});
            },
            getTeaBrandFilter: (keyName,teaBrandId) => {
                this.setState({
                    teaTypeFilterStatus:false,
                });
                let revisedTeaBrandFilter = this.state.teaBrandFilter;
                revisedTeaBrandFilter[keyName] = teaBrandId;
                this.setState(revisedTeaBrandFilter);
                this.setState({teaBrandFilterStatus:true});
            },
            getAllTea: async () => {
                let teaTypeFilterStatus = this.state.teaTypeFilterStatus;
                let teaBrandFilterStatus = this.state.teaBrandFilterStatus;
                let teaTypeFilter = this.state.teaTypeFilter;
                let teaBrandFilter = this.state.teaBrandFilter;
                if(teaTypeFilterStatus){
                    for(let each in teaTypeFilter){
                        console.log('LALLAL',each)
                        if(teaTypeFilter[each] !== ''){
                            let filteredTeaResponse = await axios.get(teaSearchUrl,{
                                params:{
                                    tea_type_id:teaTypeFilter[each]
                                }
                            });
                            let filteredTea = filteredTeaResponse.data.tea;
                            return filteredTea;
                        }
                    }
                }else if(teaBrandFilterStatus){
                    for(let each in teaBrandFilter){
                        console.log('KAKAKAK',each)
                        if(teaBrandFilter[each] !== ''){
                            let filteredTeaResponse = await axios.get(teaSearchUrl,{
                                params:{
                                    brand_id:teaBrandFilter[each]
                                }
                            });
                            let filteredTea = filteredTeaResponse.data.tea;
                            return filteredTea;
                        }
                    }
                } else{
                    let allTeaResponse = await axios.get(teaSearchUrl);
                    let allTea = allTeaResponse.data.tea;
                    return allTea;
                }
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
                return tea;
                // await this.setState({
                //     tea
                // });
            },
            getTeaByBrand: async(brandId) => {
                let teaSearchResults = await axios.get(teaSearchUrl, {
                    params: {
                    brand_id: brandId
                    }
                });
                console.log(teaSearchResults.data)
                let tea = teaSearchResults.data.tea;
                this.setState({
                    teaByBrand:tea
                })
                console.log(tea);
                return tea;
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
