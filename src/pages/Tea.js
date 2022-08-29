import React from 'react';
import NavbarInstance from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Col';
import axios from 'axios';
import TeaContext from '../context/TeaContext';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function Tea (props){
  const teaContext = React.useContext(TeaContext);
  teaContext.displayAllTea().map(each => {console.log(each)})
  

  return (
    <React.Fragment>
      <div>
        <NavbarInstance/>
      </div>
      <div style={{marginTop:'70px',backgroundColor:'#d4e0e2'}}>
        <h1>Tea</h1>
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4">
                  {teaContext.displayAllTea().map(each => {
                      return (
                        <Col key={each._id}>
                            <div className="col d-flex justify-content-center">
                                <div>
                                    <Card style={{ width: '22rem' }} >
                                        <Card.Img variant="top" src={each.image_url} className="card-img-top" alt={each.name} style={{height:'16rem',width:'100%',objectFit:'cover',}}/>
                                        <Card.Body style={{backgroundColor:'#f7f3f2',height:'265px',padding:'20px'}}>
                                            <Card.Title >
                                              <div style={{marginBottom:'8px',paddingLeft:'5px'}}>{each.brand.name}</div> 
                                              <div style={{height:'50px',marginBottom:'30px',paddingLeft:'5px'}}>
                                                {each.name}
                                                <div style={{fontStyle:'italic',fontSize:'small',fontWeight:'400',marginTop:'5px'}}>{each.quantity == 0 ? 'Sold Out' : 'Available Stock: '+ each.quantity }</div>
                                              </div>
                                              
                                            </Card.Title>
                                            <Card.Text style={{marginTop:'15px'}}>
                                              {/* <div style={{marginBottom:'10px'}}>
                                                {each.teaType.name} {each.placeOfOrigin.name}
                                              </div> */}
                                              <div style={{marginBottom:'10px',marginTop:'10px',paddingLeft:'5px'}}>{each.packaging.name} 
                                                <span>{each.sachet? ' (' + each.sachet + 'pcs)':''} </span>
                                                <span style={{float:'right'}}>Net weight: {each.weight? each.weight + 'g':''} </span>
                                              </div>
                                              {each.tasteProfile.map(eachTasteProfile => {
                                                return(
                                                  <Badge pill bg="light" text="dark" style={{border:'1px solid grey',marginRight:'5px'}}>{eachTasteProfile.name} </Badge>
                                                )
                                              })}
                                            </Card.Text>
                                            <Button variant="primary" size="sm" >More Details</Button> <span style={{fontSize:'larger',fontWeight:'600',float:'right'}}>S${each.cost/100}</span>
                                            {/* <span style={{ "float": "right" }}>
                                                <img src={editListing} alt="editListingBtn"
                                                    style={{ height: "34px", width: "34px" }}
                                                    onClick={() => { props.displayEditConfirmation(each) }}
                                                />
                                                <img src={deleteListing} alt="deleteListingBtn"
                                                    style={{ height: "30px", width: "30px" }}
                                                    onClick={() => { props.displayDeleteConfirmation(each) }}
                                                />
                                            </span> */}
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
