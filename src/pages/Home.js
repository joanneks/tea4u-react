import React from 'react';
import '../css/home.css';
import NavbarInstance from './Navbar';
import NavbarBottom from './NavbarBottom';
import Carousel from 'react-bootstrap/Carousel';
import header from '../css/images/home.jpeg';
import header1 from '../css/images/home1.webp';
import kindred from '../css/images/kindred.webp';
import teaspo from '../css/images/teaspo.jpeg';
import petale from '../css/images/petale.jpeg';
import { useContext } from "react";
import TeaContext from "../context/TeaContext";
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
  const teaContext = useContext(TeaContext);
  const filterByTeaType = async (teaType,teaTypeId) => {
    let teaTypeFilter = await teaContext.getTeaTypeFilter(teaType,teaTypeId);
    // let teaTypeFilter = await teaContext.getTeaTypeFilter('oolongTea',1);
    let teaSearchResults = await teaContext.getAllTea();
    navigate('/tea')
  }
  const filterByTeaBrand = async (teaBrand,teaBrandId) => {
    await teaContext.getTeaBrandFilter(teaBrand,teaBrandId);
    await teaContext.getAllTea();
    navigate('/tea')
  }

  return (
    <React.Fragment>
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <NavbarBottom/>
        <div style={{height:'46px'}}></div>
        <div style={{fontFamily:'Indie Flower',position:'relative'}}>
          <div id="headerCaption" >
            <div style={{marginBottom:'15px'}}>Life is like <span style={{display:'block'}}>a cup of tea</span></div>
            <div style={{marginBottom:'15px'}}>The longer it brews, <span style={{display:'block'}}>the richer it gets</span></div>
            <div style={{marginBottom:'0px'}}>Experience our collection &<span style={{display:'block'}}>get a taste of it yourself!</span></div>
          </div>
          <img src={header1} id="headerPic" alt="headerPic"/>
        </div>
        <div>
          <div id="titleHeader" >WHY SHOP WITH US?</div>
          <div id="paddingHome" >Get the best of all worlds by ordering tea from different brands with just 1 delivery fee!</div>
          <div style={{fontFamily:'Caveat',fontSize:'25px',fontWeight:'500',textAlign:'center',margin:'10px 0px 20px 0px'}}>LIGHT TEA-IPS FOR YOU : <span id="clickNow">Click on anything below to shop now!</span></div>
        </div>

        <div style={{fontFamily:'Caveat'}}>
          <div id="titleHeader">SHOP TEA TYPES</div>
          <div id="homeTeaTypes" style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
            <div id="teaTypeName" style={{backgroundColor:'#e5e3ec'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('oolongTea',1)}}>Oolong Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#e3eaec'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('whiteTea',4)}}>White Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#e4e2df'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('blackTea',3)}}>Black Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#e4dad7'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('puerhTea',2)}}>Pu Erh Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#eaf2c1'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('greenTea',5)}}>Green Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#e3ece5'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('tisaneTea',6)}}>Tisane Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#ebece5'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('herbalTea',7)}}>Herbal Tea</div></div>
            <div id="teaTypeName" style={{backgroundColor:'#efe4d4'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('bloomingTea',8)}}>Blooming Tea</div></div>
          </div>
        </div>
        <div style={{fontFamily:'Caveat'}}>
          <div  id="titleHeader">SHOP BRANDS</div>
          <Carousel>
            <Carousel.Item onClick={()=>{filterByTeaBrand('kindreaTeas',1)}}>
              <h3 id="brandName">Kindred Teas</h3>
              <img src={kindred} className="d-block w-100" style={{minHeight:'180px',maxHeight:'480px',objectFit:'cover'}} alt="kindredTeas"/>
            </Carousel.Item>
            <Carousel.Item onClick={()=>{filterByTeaBrand('teaSpoonOfLove',3)}}>
              <h3 id="brandName">Tea Spoon of Love</h3>
              <img src={teaspo} className="d-block w-100" style={{minHeight:'180px',maxHeight:'480px',objectFit:'cover'}} alt="teaSpoonOfLove"/>
            </Carousel.Item>
            <Carousel.Item onClick={()=>{filterByTeaBrand('petaleTea',7)}}>
              <h3 id="brandName">Petale Tea</h3>
              <img src={petale} className="d-block w-100" style={{minHeight:'180px',maxHeight:'480px',objectFit:'cover'}} alt="petaleTea"/>
            </Carousel.Item>
          </Carousel>
          <div style={{height:'40px'}}></div>

          
        </div>
      </div>

    </React.Fragment>
    );
  }
  
  export default Home;