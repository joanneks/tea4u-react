import React from 'react';
import NavbarInstance from './Navbar';
import TeaContext from "../context/TeaContext";
import { useParams } from 'react-router-dom';
import{useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

function TeaDetails(props) {
    const teaContext = useContext(TeaContext);
    let { teaId } = useParams();
    const navigate = useNavigate(); 
    const [teaDetails,setTeaDetails] = useState({});
    const [teaPackaging,setTeaPackaging] = useState();
    const [teaBrand,setTeaBrand] = useState();
    const [teaType,setTeaType] = useState();
    const [teaPlaceOfOrigin,setTeaPlaceOfOrigin] = useState();
    const [teaTasteProfile,setTeaTasteProfile] = useState([]);

    useEffect(()=>{
        const getTeaDetails = async () =>{
            console.log('TEAID1111',teaId);
            let teaDetails = await teaContext.getTeaDetails(teaId);
            console.log('snowy',teaDetails);
            console.log('tasteProfile',teaDetails.tasteProfile);
            await setTeaDetails(teaDetails);
            await setTeaPackaging(teaDetails.packaging.name);
            await setTeaBrand(teaDetails.brand.name);
            await setTeaType(teaDetails.teaType.name);
            await setTeaPlaceOfOrigin(teaDetails.placeOfOrigin.name);
            await setTeaTasteProfile(teaDetails.tasteProfile);

        }
        getTeaDetails();
    },[])
    

  return (
    <React.Fragment>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{marginTop:'70px'}}>
          <h1>Tea Details</h1>
          <div style={{margin:'20px'}}>
            <div>
                <img src={teaDetails.image_url} alt={teaDetails.name} style={{objectFit:'cover', width:'60vw',maxHeight:'70vh'}}/>
            </div>
            <div>
                <div>{teaDetails.name}</div>
                <div>{teaDetails.cost}</div>
                <div>{teaPackaging}</div>
                <div>{teaBrand}</div>
                <div>{teaPlaceOfOrigin}</div>
                <div>{teaType}</div>
                {teaTasteProfile.map(each => {
                    return (
                    <Badge key={each.name} pill bg="light" text="dark" style={{ border: '1px solid grey', marginRight: '5px' }}>{each.name} </Badge>
                    )
                })}
                <div>{teaDetails.weight}</div>
                <div>{teaDetails.brew_tea_weight} {teaDetails.brew_sachet_quantity}</div>
                <div>{teaDetails.brew_temperature} °C {teaDetails.brew_time} min {teaDetails.brew_water_quantity} ml</div>
                <div>{teaDetails.description}</div>
                <div>Stock Available: {teaDetails.quantity}</div>

            </div>
          </div>
        </div>

    </React.Fragment>
    );
  }
  
  export default TeaDetails;