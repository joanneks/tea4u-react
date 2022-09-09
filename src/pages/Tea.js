import React, { useEffect } from 'react';
import NavbarInstance from './Navbar';
import NavbarBottom from './NavbarBottom';
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
import cart from '../css/images/cart.png';
import search from '../css/images/search.png';
import filter from '../css/images/filter.png';
import clearSearch from '../css/images/remove.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingPic from '../css/images/loading.gif';

export default function Tea(props) {
  const navigate = useNavigate();
  const teaContext = useContext(TeaContext);
  const cartContext = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [allTea, setAllTea] = useState([]);
  const [allTeaCount, setAllTeaCount] = useState();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const displayAllTea = async () => {
      setLoading(true);
      let allTeaResults = await teaContext.getAllTea()
      await setAllTea(allTeaResults);
      await setAllTeaCount(allTeaResults.length)

      setTimeout(async () => { await setLoading(false) }, 1000)
    }
    displayAllTea();
  }, [])

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

  const searchTea = async (searchQuery) => {
    setLoading(true);
    let searchTeaResults = await teaContext.searchTea(searchQuery);
    await setAllTea(searchTeaResults);
    await setAllTeaCount(searchTeaResults.length)
    setTimeout(async () => { await setLoading(false) }, 1000)
  }

  const [showFilterCount, setShowFilterCount] = useState(0);
  const [showFilter, setShowFilter] = useState('none');

  const updateFormField = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value
    })
  }

  const updateFormFieldMultiple = (e) => {
    let revisedTasteProfile = []
    let options = e.target.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        revisedTasteProfile.push(options[i].value);
      }
    }
    setSearchQuery({
      ...searchQuery,
      tasteProfiles: revisedTasteProfile
    })
  }
  
  const addToCart = async (teaId) => {
    const addToCartToast = toast.loading("Adding To Cart...");
    let customerId = JSON.parse(localStorage.getItem('customerId'));
    if(customerId){
      await cartContext.addToCart(teaId, 1);
      toast.update(addToCartToast, {
        render: `Item added to cart!`,
        type: "success",
        isLoading: false,
        autoClose: 1000
      });
      setTimeout(()=>{navigate('/cart')},1000);
    } else {
      toast.update(addToCartToast, {
        render: <span>Login required to add to cart. <a href="/login">Login now</a></span>,
        type: "error",
        isLoading: false,
        closeOnClick:true,
        autoClose: 1000
      });
    }
  }

  const showTeaInfo = (teaId) => {
    navigate(`/tea/${teaId}`)
  }
  useEffect(() => {
  }, [showFilter])

  const showFilters = () => {
    let clickCount = showFilterCount + 1;

    if (clickCount % 2 === 1) {
      setShowFilterCount(clickCount);
      setShowFilter('block');
    } else if (clickCount % 2 === 0) {
      setShowFilterCount(clickCount);
      setShowFilter('none');
    }
  }
  const clearSearchQuery = () => {
    setSearchQuery({
      name: '',
      min_cost: '',
      max_cost: '',
      brand: '',
      teaType: '',
      placeOfOrigin: '',
      packaging: '0',
      tasteProfiles: []
    })
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <div>
          <NavbarInstance />
        </div>
        <NavbarBottom />
        <ToastContainer/>
        <div style={{ height: '66px', display: 'flex', justifyContent: 'end' }}>
          {isShown && (
            <div id="hoverComment" style={{ position: 'absolute', marginTop: '70px', fontSize: '10px', borderRadius: '20px', border: '1px solid grey', padding: '3px', backgroundColor: '#f5f2ee' }}>
              Expand/Collapse
            </div>
          )}
        </div>
        <Container className="tea-margin">
          <div>
            <div className="text-center justify-content-start">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 search-input">
                <div className="form-control" style={{ padding: '6px 10px', fontFamily: 'Khula,sans-serif', fontWeight: '500' }}>
                  <input type="text" name="name" placeholder='SEARCH' style={{ fontSize: '17px', border: 'none', padding: '0px', width: '70%' }} value={searchQuery.name} onChange={updateFormField} />
                  <span style={{ float: 'right' }}>
                    <img src={clearSearch} alt="filter" style={{ height: '20px', width: '20px' }}
                      onClick={clearSearchQuery}
                    />
                  </span>
                  <span style={{ float: 'right' }}>
                    <img src={filter} id="filter1" alt="filter" style={{ height: '20px', width: '20px', marginRight: '10px' }}
                      onClick={showFilters}
                      onMouseEnter={() => setIsShown(true)}
                      onMouseLeave={() => setIsShown(false)}
                    />
                  </span>
                  <span style={{ float: 'right' }}><img src={search} alt="search" style={{ height: '20px', width: '20px', marginRight: '10px' }} onClick={() => { searchTea(searchQuery) }} /></span>
                </div>
              </div>

              <div className="text-center justify-content-start" style={{ display: showFilter, marginLeft: '10px' }}>
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

          <div style={{ textAlign: 'start', margin: '20px 0px 20px 10px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>{loading ? '' : allTeaCount + ' results(s) found'}</div>

          {loading ?
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img src={loadingPic} alt="loadingPic" style={{ position: 'absolute', height: '300px', margin: 'auto' }} />
            </div>
            :
            <div>

              <Row xs={1} md={2} lg={3} className="g-4">
                {allTea.map(each => {
                  return (
                    <Col key={each.id}>
                      <div className="col d-flex justify-content-center">
                        <div>
                          <Card style={{ width: '19rem' }} >
                            <Card.Img variant="top" src={each.image_url} className="card-img-top" alt={each.name} style={{ height: '16rem', width: '100%', objectFit: 'cover', }} onClick={() => { showTeaInfo(each.id) }} />
                            <Card.Body style={{ backgroundColor: '#f3f2f1', height: '210px', padding: '20px', fontFamily: 'Khula,sans-serif', fontWeight: '600' }}>
                              <Card.Title >
                                <div style={{ padding: '0px 5px 0px 5px', fontSize: '20px', height: '34px' }}>
                                  <span style={{ fontWeight: '500' }}>{each.brand.name}</span>
                                  <span style={{ float: 'right' }}>
                                    <img src={cart} alt="addToCartBtn" style={{ height: "28px", width: "28px", marginLeft: '10px', zIndex: '100' }} onClick={() => { addToCart(each.id) }} />
                                  </span>
                                </div>
                                <div style={{ height: '50px', marginBottom: '30px', padding: '0px 5px 0px 5px', fontWeight: '600' }} onClick={() => { showTeaInfo(each.id) }}>
                                  <div style={{ height: '50px' }}>{each.name}</div>
                                  <div style={{ fontStyle: 'italic', fontSize: 'small', fontWeight: '400', marginTop: '5px' }}>
                                    {each.quantity === 0 ? 'Sold Out' : <div>Available Stock:{each.quantity}</div>}
                                  </div>
                                  <div style={{ marginTop: '5px' }}>S${each.cost / 100}</div>
                                </div>

                              </Card.Title>
                              <Card.Text style={{ marginTop: '60px' }}>
                                {each.tasteProfile.map(eachTasteProfile => {
                                  return (
                                    <Badge key={eachTasteProfile.name} pill bg="light" text="dark" style={{ border: '1px solid grey', marginRight: '5px' }}>{eachTasteProfile.name} </Badge>
                                  )
                                })}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>

                    </Col>
                  )
                })}
              </Row>
            </div>
          }
        </Container>
      </div>

    </React.Fragment>
  )
}
