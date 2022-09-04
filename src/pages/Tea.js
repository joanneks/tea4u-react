import React, { useEffect } from 'react';
import NavbarInstance from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/tea.css';
import Container from 'react-bootstrap/Col';
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TeaContext from '../context/TeaContext';
import CartContext from '../context/CartContext';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import cart from '../css/images/cart2.png';
import more from '../css/images/more.png';
import search from '../css/images/search.png';
import filter from '../css/images/filter1.png';

export default function Tea(props) {
  const navigate = useNavigate();
  const teaContext = useContext(TeaContext);
  const cartContext = useContext(CartContext);

  const [searchQuery, setSearchQuery] = useState({
    name: '',
    min_cost: '',
    max_cost: '',
    brand: '',
    teaType: '',
    placeOfOrigin: '',
    packaging: '0',
    tasteProfiles: []
  });

  const [showFilterCount,setShowFilterCount] = useState(0);
  const [showFilter,setShowFilter] = useState('none');

  const updateFormField = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value
    })
  }

  const updateFormFieldMultiple = (e) => {
      console.log('searchQuery', searchQuery.tasteProfiles, 'e.target.options', e.target.options);
      let revisedTasteProfile = []
      let options = e.target.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          revisedTasteProfile.push(options[i].value);
        }
      }
      console.log('addRevised', revisedTasteProfile)
      setSearchQuery({
        ...searchQuery,
        tasteProfiles: revisedTasteProfile
      })
  }

  const addToCart = async (teaId) => {
    await cartContext.addToCart(teaId);
    navigate('/cart')
  }

  const showTeaInfo = (teaId) => {
    navigate(`/tea/${teaId}`)
  }
  useEffect(()=>{
  },[showFilter])

  const showFilters = () => {
      let clickCount = showFilterCount + 1;
      console.log('click',clickCount)
        
      if(clickCount%2 === 1){
        console.log('if',clickCount%2 === 1)
        setShowFilterCount(clickCount);
        setShowFilter('block');
      } else if(clickCount%2 === 0){
        console.log('else',clickCount%2 === 0)
        setShowFilterCount(clickCount);
        setShowFilter('none');
      }
  }

  return (
    <React.Fragment>
    <div style={{minHeight:'100vh'}}>
      <div>
        <NavbarInstance />
      </div>
      <div style={{height:'70px'}}></div>
      <Container className="tea-margin">
          <div>
              <div className="text-center justify-content-start">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 search-input">
                  <div className="form-control">
                    <input type="text" name="name" placeholder='SEARCH' style={{border:'none',padding:'0px',width:'70%'}} value={searchQuery.name} onChange={updateFormField} />
                    <span style={{float:'right'}}><img src={filter} id="filter1" alt="filter" style={{height:'20px',width:'20px'}} onClick={showFilters}/></span>
                    <span style={{float:'right'}}><img src={search} alt="search" style={{height:'20px',width:'20px',marginRight:'10px'}} onClick={() => { teaContext.searchTea(searchQuery) }}/></span>
                  </div>
                  <div style={{margin:'10px 0px 0px 10px'}}>
                    {/* <span>More Filters<img src={filter} id="filter" alt="filter" style={{height:'20px',width:'20px'}} onClick={showFilters}/></span> */}
                  </div>
                </div>

                <div className="text-center justify-content-start" style={{display:showFilter,marginLeft: '10px'}}>
                  <div className="search-input-cost">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                      <label>Price Range: </label>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 search-input">
                      <input type="text" name="min_cost" placeholder='Min.' className="form-control" value={searchQuery.min_cost} onChange={updateFormField} />
                    </div>
                    <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                      <span> to </span>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3 search-input">
                      <input type="text" name="max_cost" placeholder='Max.' className="form-control" value={searchQuery.max_cost} onChange={updateFormField} />
                    </div>
                  </div>
                  <div className="search-input-div">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                      <label>Packaging: </label>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 search-label" >
                      <select name="packaging" className="form-control" value={searchQuery.packaging} onChange={updateFormField}>
                        {teaContext.getAllPackaging().map(each => {
                          return (
                            <option key={each[0]} value={each[0]}>{each[1]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="search-input-div">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                    <label>Tea Type: </label>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 search-label" >
                      <select name="teaType" className="form-control" value={searchQuery.teaType} onChange={updateFormField}>
                        {teaContext.getAllTeaTypes().map(each => {
                          return (
                            <option key={each[0]} value={each[0]}>{each[1]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="search-input-div">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                      <label>Brand: </label>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 search-label" >
                      <select name="brand" style={{ marginRight: '20px' }} className="form-control" value={searchQuery.brand} onChange={updateFormField}>
                        {teaContext.getAllTeaBrands().map(each => {
                          return (
                            <option key={each[0]} value={each[0]}>{each[1]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="search-input-div">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                      <label>Tea Origin: </label>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 search-label" >
                    <select name="placeOfOrigin" style={{ marginRight: '20px' }} className="form-control" value={searchQuery.placeOfOrigin} onChange={updateFormField}>
                      {teaContext.getAllPlaceOfOrigins().map(each => {
                        return (
                          <option key={each[0]} value={each[0]}>{each[1]}</option>
                        )
                      })}
                    </select>
                    </div>
                  </div>
                  <div className="search-input-div">
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 search-label" >
                      <label>Taste Profiles: </label>
                    </div>
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 search-label" >
                      <select className="form-select" multiple={true} size="3" aria-label="size 3 select multiple" value={searchQuery.tasteProfiles} onChange={updateFormFieldMultiple}>
                        {teaContext.getAllTasteProfiles().map(each => {
                          return (
                            <option key={each[0]} value={each[0]}>{each[1]}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </Container>
      <Container className="tea-margin">
        <Row xs={1} md={2} lg={3} className="g-4">
          {teaContext.displayAllTea().map(each => {
            return (
              <Col key={each.id}>
                <div className="col d-flex justify-content-center">
                  <div>
                    <Card style={{width:'19rem'}} >
                      <Card.Img variant="top" src={each.image_url} className="card-img-top" alt={each.name} style={{ height: '16rem', width: '100%', objectFit: 'cover', }} />
                      <Card.Body style={{ backgroundColor: '#f3f2f1', height: '160px', padding: '20px',fontFamily:'Khula,sans-serif',fontWeight:'600' }}>
                        <Card.Title >
                          <div style={{ marginBottom: '8px', padding: '0px 5px 0px 5px',fontSize:'20px',height:'34px'}}>
                            <span style={{fontWeight:'500'}}>{each.brand.name}</span>
                            <span style={{ float: 'right'}}>
                              <img src={more} alt="moreTeaDetails" style={{ height: "34px", width: "34px",marginLeft:'10px' }} onClick={()=>{showTeaInfo(each.id)}}/>
                              <img src={cart} alt="addToCartBtn" style={{ height: "34px", width: "34px",marginLeft:'10px' }} onClick={()=>{addToCart(each.id)}}/>
                            </span>
                          </div>
                          <div style={{ height: '50px', margin: '20px 0px 30px 0px',padding: '0px 5px 0px 5px',fontWeight:'600' }}>
                            {each.name}
                            <div style={{ fontStyle: 'italic', fontSize: 'small', fontWeight: '400', marginTop: '5px' }}>{each.quantity === 0 ? 'Sold Out' : 'Available Stock: ' + each.quantity}</div>
                          </div>

                        </Card.Title>
                        <Card.Text style={{ marginTop: '15px' }}>
                          {/* {each.tasteProfile.map(eachTasteProfile => {
                            return (
                              <Badge key={eachTasteProfile.name} pill bg="light" text="dark" style={{ border: '1px solid grey', marginRight: '5px' }}>{eachTasteProfile.name} </Badge>
                            )
                          })} */}
                        </Card.Text>
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
