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
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'57px'}}></div>
        
        <div style={{display:'flex',flexWrap:'wrap'}}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6"><img src={teaDetails.image_url} alt={teaDetails.name} style={{objectFit:'cover', width:'100%'}}/></div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 tea-details-padding">
            <div style={{margin:'20px 0px 20px 0px'}}>
              <div style={{fontSize:'30px',fontFamily:'Khula,sans-serif',fontWeight:'500'}}>{teaDetails.name}</div>
              <div style={{fontSize:'23px',fontFamily:'Khula,sans-serif',fontWeight:'300'}}>S${teaDetails.cost/100}</div>
            </div>

            
            <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'45%'}}>TYPE:</div>
                <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaType}</div>
              </div>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'50%'}}>ORIGIN:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaPlaceOfOrigin}</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'45%'}}>WEIGHT:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaDetails.weight}g</div>
              </div>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'50%'}}>STOCK:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',textAlign:'center'}}>{teaDetails.quantity}</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>BRAND:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaBrand}</div>
              </div>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>PACKAGING:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>
                  {teaPackaging}
                  {teaDetails.brew_sachet_quantity === 0 ? '' : teaDetails.brew_sachet_quantity}
                </div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>INSTRUCTIONS:</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_temperature} °C</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_water_quantity} ml</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_time} min</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>
                  {teaDetails.brew_tea_weight}g {teaDetails.brew_sachet_quantity === 0 ? ' ': '('+teaDetails.brew_sachet_quantity+'sachets)'}
                </div>
              </div>
              <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>TASTE PROFILE</div>
                <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>
                  {teaTasteProfile.map(each => {
                      return (
                        <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{each.name},</div>
                      )
                  })}
                </div>
              </div>
            </div>
            <div style={{margin:'30px 0px 20px 0px',fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'300',textAlign:'justify'}}>{teaDetails.description}</div>
          </div>
        </div>
          
      </div>
    </React.Fragment>
    );
  }
  
  export default TeaDetails;