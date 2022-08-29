import React from 'react';
import NavbarInstance from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Col';
import axios from 'axios';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TeaContext from '../context/TeaContext';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import cart from '../css/images/cart.png';

export default function Tea (props){
  const teaContext = React.useContext(TeaContext);
  

  const [searchQuery, setSearchQuery] = useState({
    name:'',
    min_cost:'',
    max_cost:'',
    brand:'',
    teaType:'',
    placeOfOrigin:'',
    packaging:'0',
    tasteProfile:[]
  });

  const updateFormField = (e) => {
    setSearchQuery({
        ...searchQuery,
        [e.target.name]: e.target.value
    })
  }

  const updateFormFieldMultiple = (e) => {
    if (searchQuery.tasteProfile.includes(e.target.value)){
      console.log('searchQuery',searchQuery.tasteProfile,'e.target.value', e.target.value);
      console.log('true or false',searchQuery.tasteProfile.includes(e.target.value.toString()))
      let indexToRemove = searchQuery.tasteProfile.indexOf(e.target.value);
      console.log('indexToRemove',indexToRemove)
      let revisedTasteProfile = [
        ...searchQuery.tasteProfile.slice(0, indexToRemove),
        ...searchQuery.tasteProfile.slice(indexToRemove + 1)
      ];
      console.log('removeRevised',revisedTasteProfile)
      setSearchQuery({
          ...searchQuery,
          tasteProfile: revisedTasteProfile
      })
      console.log('revisedSearchQuery',searchQuery.tasteProfile)
    } else {
        console.log('searchQuery',searchQuery.tasteProfile,'e.target.value', e.target.value);
        console.log('true or false',searchQuery.tasteProfile.includes(e.target.value.toString()))
        let revisedTasteProfile = searchQuery.tasteProfile;
        revisedTasteProfile.push(e.target.value);
        console.log('addRevised',revisedTasteProfile)
        setSearchQuery({
            ...searchQuery,
            tasteProfile: revisedTasteProfile
        })
    }
  }

  return (
    <React.Fragment>
      <div>
        <NavbarInstance/>
      </div>
      <div style={{marginTop:'70px',backgroundColor:'#d4e0e2'}}>
        <h1>Tea</h1>
        <Container>
          <Container style={{margin:'20px'}}>

          <div  style={{margin:'20px'}}>
            <div>
              <label style={{marginRight:'20px'}}>Product Name: </label>
              <input type="text" name="name" style={{width:'300px',marginRight:'20px'}} className="form-control" value={searchQuery.name} onChange={updateFormField}/>
              <label style={{marginRight:'20px'}}>Min. Cost: </label>
              <input type="text" name="min_cost" style={{marginRight:'20px'}} className="form-control" value={searchQuery.min_cost} onChange={updateFormField}/>
              <label style={{marginRight:'20px'}}>Max Cost: </label>
              <input type="text" name="max_cost" style={{marginRight:'20px'}} className="form-control" value={searchQuery.max_cost} onChange={updateFormField}/>
              <label style={{marginRight:'20px'}}>Packaging: </label>
              <div style={{display:'flex'}}>
              {teaContext.getAllPackaging().map(each => {
                  return(
                    <React.Fragment key={each[0]}>
                      <label style={{marginRight:'10px'}} >{each[1]}</label>
                      <input type="radio" style={{marginRight:'30px'}} className="form-check-input" name="packaging" value={each[0]} onChange={updateFormField} checked={searchQuery.packaging === each[0] ? true : false}/>
                    </React.Fragment>
                  )
                })}
              </div>
              <label style={{marginRight:'20px'}}>Tea Types: </label>
              <select name="teaType" style={{marginRight:'20px'}} className="form-control" value={searchQuery.teaType} onChange={updateFormField}>
                {teaContext.getAllTeaTypes().map(each => {
                  return(
                    <option key={each[0]} value={each[0]}>{each[1]}</option>
                  )
                })}
              </select>
              <label style={{marginRight:'20px'}}>Brands: </label>
              <select name="brand" style={{marginRight:'20px'}} className="form-control" value={searchQuery.brand} onChange={updateFormField}>
                {teaContext.getAllTeaBrands().map(each => {
                  return(
                    <option key={each[0]} value={each[0]}>{each[1]}</option>
                  )
                })}
              </select>
              <label style={{marginRight:'20px'}}>Place of Origins: </label>
              <select name="placeOfOrigin" style={{marginRight:'20px'}} className="form-control" value={searchQuery.placeOfOrigin} onChange={updateFormField}>
                {teaContext.getAllPlaceOfOrigins().map(each => {
                  return(
                    <option key={each[0]} value={each[0]}>{each[1]}</option>
                  )
                })}
              </select>
              <label style={{marginRight:'20px'}}>Taste Profiles: </label>
              <select className="form-select" size="3" multiple aria-label="size 3 select multiple" value={props.osCompatibilitySearch} onChange={updateFormFieldMultiple}>
                {teaContext.getAllTasteProfiles().map(each => {
                  return(
                    <option key={each[0]} value={each[0]}>{each[1]}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary" onClick={()=>{teaContext.searchTea(searchQuery)}}>Search</button>
          </div>
          </Container>
          <Row xs={1} md={2} lg={3} className="g-4">
                  {teaContext.displayAllTea().map(each => {
                      return (
                        <Col key={each.id}>
                            <div className="col d-flex justify-content-center">
                                <div>
                                    <Card style={{ width: '22rem' }} >
                                        <Card.Img variant="top" src={each.image_url} className="card-img-top" alt={each.name} style={{height:'16rem',width:'100%',objectFit:'cover',}}/>
                                        <Card.Body style={{backgroundColor:'#f7f3f2',height:'265px',padding:'20px'}}>
                                            <Card.Title >
                                              <div style={{marginBottom:'8px',paddingLeft:'5px',display:'flex'}}>{each.brand.name} 
                                                <span style={{float:'right',justifyContent:'center'}}>
                                                  <img src={cart} alt="addToCartBtn" style={{ height: "34px", width: "34px" }}/>
                                                </span>
                                              </div> 
                                              <div style={{height:'50px',marginBottom:'30px',paddingLeft:'5px'}}>
                                                {each.name}
                                                <div style={{fontStyle:'italic',fontSize:'small',fontWeight:'400',marginTop:'5px'}}>{each.quantity === 0 ? 'Sold Out' : 'Available Stock: '+ each.quantity }</div>
                                              </div>
                                              
                                            </Card.Title>
                                            <Card.Text style={{marginTop:'15px'}}>
                                              <span style={{marginBottom:'10px',marginTop:'10px',paddingLeft:'5px',display:'block'}}>{each.packaging.name} 
                                                <span>{each.sachet? ' (' + each.sachet + 'pcs)':''} </span>
                                                <span style={{float:'right'}}>Net weight: {each.weight? each.weight + 'g':''} </span>
                                              </span>
                                              {each.tasteProfile.map(eachTasteProfile => {
                                                return(
                                                  <Badge key={eachTasteProfile.name} pill bg="light" text="dark" style={{border:'1px solid grey',marginRight:'5px'}}>{eachTasteProfile.name} </Badge>
                                                )
                                              })}
                                            </Card.Text>
                                            <Button variant="primary" size="sm" >More Details</Button> <span style={{fontSize:'larger',fontWeight:'600',float:'right'}}>S${each.cost/100}</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>

                        </Col>
                      )
                  })}
          </Row>
        </Container>
      </div>

    </React.Fragment>
  )
}
