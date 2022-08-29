import React from 'react';
// import { useNavigate } from "react-router-dom";
import TeaContext from "./TeaContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default class TeaProvider extends React.Component{
    state = {
        tea:[],
        
      }
    async componentDidMount() {
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/"
        let teaResponse = await axios.get(url + "tea");
        console.log(teaResponse);
        // let searchFieldsResponse = await axios.get(url + "products/fields");
        this.setState({
            tea: teaResponse.data.tea,
        })
    };
    render(){
        const url = "https://3000-joanneks-tea4uexpressba-azji6dgmjtq.ws-us63.gitpod.io/api/";
        const displayAllTeaUrl = url + "tea/";
        
        const teaContext = { 
            displayAllTea: () => {
                return this.state.tea;
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
