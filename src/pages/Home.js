import React from 'react';
import '../css/home.css';
import NavbarInstance from './Navbar';
import Carousel from 'react-bootstrap/Carousel';
import header from '../css/images/home.jpeg';
import kindred from '../css/images/kindred.webp';
import teaspo from '../css/images/teaspo.jpeg';
import petale from '../css/images/petale.jpeg';
import { useState, useContext } from "react";
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
        <div style={{height:'57px'}}></div>
        <div style={{fontFamily:'Indie Flower',position:'relative'}}>
          <div style={{position:'absolute',margin:"25px 0px 0px 25px",fontSize:'18px',fontWeight:'500',fontWeight:'600',fontFamily:'Indie Flower'}}>
            <div style={{marginBottom:'15px'}}>Life is like <span style={{display:'block'}}>a cup of tea</span></div>
            <div style={{marginBottom:'15px'}}>The longer it brews, <span style={{display:'block'}}>the richer it gets</span></div>
            <div style={{marginBottom:'0px'}}>Experience our collection &<span style={{display:'block'}}>get a taste of it yourself!</span></div>
          </div>
          <img src={header} alt="bg" style={{width:'100%'}}/>
        </div>
        <div>
          <div style={{fontFamily:'Caveat',fontWeight:'600',fontSize:'28px',textAlign:'center', marginTop:'30px'}}>WHY SHOP WITH US?</div>
          <div style={{fontFamily:'Khula, sans-serif',fontSize:'15px',textAlign:'justify',padding:'20px 30px'}}>Get the best of all worlds by ordering tea from different brands with just 1 delivery fee!</div>
        </div>

        <div style={{fontFamily:'Caveat'}}>
          <div style={{fontSize:'28px',fontWeight:'700',textAlign:'center', marginTop:'20px'}}>SHOP TEA TYPES</div>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',fontSize:'25px'}}>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#e5e3ec'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('oolongTea',1)}}>Oolong Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#e3eaec'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('whiteTea',4)}}>White Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#e4e2df'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('blackTea',3)}}>Black Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#e4dad7'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('puerhTea',2)}}>Pu Erh Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#eaf2c1'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('greenTea',5)}}>Green Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#e3ece5'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('tisaneTea',6)}}>Tisane Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#ebece5'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('herbalTea',7)}}>Herbal Tea</div></div>
            <div style={{height:'100px',width:'150px',backgroundColor:'#e4e2df',display:'flex',border:'1px solid lightgrey',backgroundColor:'#efe4d4'}}><div style={{margin:'auto'}} onClick={()=>{filterByTeaType('bloomingTea',8)}}>Blooming Tea</div></div>
          </div>
        </div>
        <div style={{fontFamily:'Caveat'}}>
          <div style={{fontSize:'30px',fontWeight:'700',textAlign:'center', marginTop:'40px'}}>SHOP BRANDS</div>
          <Carousel>
            <Carousel.Item onClick={()=>{filterByTeaBrand('kindreaTeas',1)}}>
              <h3 style={{color: 'black', position: 'absolute',backgroundColor:'white',opacity:'80%',padding:'5px 10px',borderRadius:'10px',margin:'10px 0px 0px 20px'}}>Kindred Teas</h3>
              <img src={kindred} className="d-block w-100" style={{minHeight:'180px',objectFit:'cover'}} alt="kindredTeas"/>
            </Carousel.Item>
            <Carousel.Item onClick={()=>{filterByTeaBrand('teaSpoonOfLove',3)}}>
              <h3 style={{color: 'black', position: 'absolute',backgroundColor:'white',opacity:'80%',padding:'5px 10px',borderRadius:'10px',margin:'10px 0px 0px 20px'}}>Tea Spoon of Love</h3>
              <img src={teaspo} className="d-block w-100" style={{minHeight:'180px',objectFit:'cover'}} alt="teaSpoonOfLove"/>
            </Carousel.Item>
            <Carousel.Item onClick={()=>{filterByTeaBrand('petaleTea',7)}}>
              <h3 style={{color: 'black', position: 'absolute',backgroundColor:'white',opacity:'80%',padding:'5px 10px',borderRadius:'10px',margin:'10px 0px 0px 20px'}}>Petale Tea</h3>
              <img src={petale} className="d-block w-100" style={{minHeight:'180px',objectFit:'cover'}} alt="petaleTea"/>
            </Carousel.Item>
          </Carousel>
          <div style={{fontSize:'25px',textAlign:'center',marginTop:'40px'}}>LIGHT TEA-IPS FOR YOU</div>

          
        </div>
      </div>

    </React.Fragment>
    );
  }
  
  export default Home;