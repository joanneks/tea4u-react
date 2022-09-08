import React from 'react';
import NavbarInstance from './Navbar';
import TeaContext from "../context/TeaContext";
import CartContext from "../context/CartContext";
import { useParams } from 'react-router-dom';
import{useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/teaDetails.css';
import loadingPic from '../css/images/loading.gif';

function TeaDetails(props) {
    const teaContext = useContext(TeaContext);
    const cartContext = useContext(CartContext);
    let { teaId } = useParams();
    const navigate = useNavigate(); 
    const [teaDetails,setTeaDetails] = useState({});
    const [teaPackaging,setTeaPackaging] = useState();
    const [teaBrand,setTeaBrand] = useState();
    const [teaType,setTeaType] = useState();
    const [teaPlaceOfOrigin,setTeaPlaceOfOrigin] = useState();
    const [teaTasteProfile,setTeaTasteProfile] = useState([]);
    const [quantity,setQuantity] = useState(1);
    const [addToCartError,setAddToCartError]=useState();
    const [loading,setLoading] = useState(false);

    const updateFormField = (e) => {
      setQuantity(e.target.value)
    }

    useEffect(()=>{
        const getTeaDetails = async () =>{
          setLoading(true);
            let teaDetails = await teaContext.getTeaDetails(teaId);
            await setTeaDetails(teaDetails);
            await setTeaPackaging(teaDetails.packaging.name);
            await setTeaBrand(teaDetails.brand.name);
            await setTeaType(teaDetails.teaType.name);
            await setTeaPlaceOfOrigin(teaDetails.placeOfOrigin.name);
            await setTeaTasteProfile(teaDetails.tasteProfile);

            setTimeout(async()=>{await setLoading(false)},300)
        }
        getTeaDetails();
    },[])
    
  const addToCart = async (teaId,quantity) => {
    if(quantity > teaDetails.quantity){
      console.log(teaId)
      setAddToCartError("Quantity input is more than the stock available.")
      console.log(quantity,teaDetails.quantity)
    } else if (quantity <= teaDetails.quantity && quantity > 0){
      console.log('cempedak')
      let cartItem = await cartContext.getCartItems(teaId);
      if(cartItem){
        let cartItemQuantity = cartItem.quantity;
        let cartItemNewQuantity = parseInt(cartItemQuantity) + parseInt(quantity);
        console.log(cartItemNewQuantity)
        if(cartItemNewQuantity > teaDetails.quantity){
          setAddToCartError("Item already exists in cart. Quantity added now will accumulate to more than the stock available.")
        }else{
          await cartContext.addToCart(teaId,quantity);
          navigate('/cart')
        }
      } else{
        console.log('lychee')
        await cartContext.addToCart(teaId,quantity);
        navigate('/cart')
      }
    }
  }

  return (
    <React.Fragment>
      <div style={{minHeight:'100vh'}}>
        <div>
          <NavbarInstance/>
        </div>
        <div style={{height:'56px'}}></div>
        {
          loading ? 
          <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
          <img src={loadingPic} alt="loadingPic" style={{position:'absolute',height:'300px',margin:'auto'}}/>
          </div>
          :
          <div style={{display:'flex',flexWrap:'wrap'}}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6"><img src={teaDetails.image_url} alt={teaDetails.name} style={{objectFit:'cover', width:'100%',maxHeight:'100vh'}}/></div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 tea-details-padding">
              <div style={{margin:'20px 0px 20px 0px'}}>
                <div style={{fontSize:'38px',fontFamily:'Khula,sans-serif',fontWeight:'500'}}>{teaDetails.name}</div>
                <div style={{fontSize:'25px',fontFamily:'Khula,sans-serif',fontWeight:'300'}}>S${teaDetails.cost/100}</div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'45%'}}>TYPE:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaType}</div>
                </div>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'50%'}}>ORIGIN:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaPlaceOfOrigin}</div>
                </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'45%'}}>WEIGHT:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaDetails.weight}g</div>
                </div>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'50%'}}>STOCK:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',textAlign:'center'}}>{teaDetails.quantity}</div>
                </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div className="teaDetailsLabel" style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600'}}>BRAND:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>{teaBrand}</div>
                </div>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div className="teaDetailsLabel1" style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600'}}>PACKAGING:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400'}}>
                    {teaPackaging}
                    {teaDetails.brew_sachet_quantity === 0 ? '' : teaDetails.brew_sachet_quantity}
                  </div>
                </div>
              </div>
              <div style={{display:'flex',flexWrap:'wrap',margin:'20px 0px 20px 0px'}}>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%',marginBottom:'5px'}}>INSTRUCTIONS:</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_temperature} °C</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_water_quantity} ml</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{teaDetails.brew_time} min</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'20%'}}>I</div>
                  <div style={{fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>
                    {teaDetails.brew_tea_weight}g {teaDetails.brew_sachet_quantity === 0 ? ' ': '('+teaDetails.brew_sachet_quantity+'sachets)'}
                  </div>
                </div>
                <div className="col-6" style={{display:'flex',flexWrap:'wrap'}}>
                  <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%',marginBottom:'5px'}}>TASTE PROFILE</div>
                  <div style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'600',width:'100%'}}>
                    {teaTasteProfile.map(each => {
                        return (
                          <div key={each.name} style={{fontSize:'16px',fontFamily:'Khula,sans-serif',fontWeight:'400',width:'80%'}}>{each.name},</div>
                        )
                    })}
                  </div>
                </div>
              </div>
              <div id="cart" style={{display:'flex',flexWrap:'wrap'}}>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 my-3" style={{display:'flex',verticalAlign:'middle'}}>
                    <div style={{display:'inline-block', width:'34px', height:'34px', fontWeight:'400',fontSize:'20px',textAlign:'center',
                      backgroundColor:'#4c4c4c',color:'white'}}
                      onClick={()=>{quantity>1?setQuantity(parseInt(quantity-1)):setQuantity(1)}}
                    >
                      -
                    </div>
                    <div style={{display:'inline-block'}}>
                      <input type="text" name="quantity" style={{border:'none',width:'80px',padding:'5px',textAlign:'center'}}
                        value={quantity}
                        onChange={updateFormField}
                      />
                    </div>
                    <div style={{display:'inline-block', width:'34px', height:'34px', fontSize:'20px',textAlign:'center',
                      backgroundColor:'#4c4c4c',color:'white'}}
                      onClick={()=>{teaDetails.quantity > quantity ? setQuantity(parseInt(quantity)+1) : setQuantity(teaDetails.quantity)}}
                    >
                      +
                    </div>
                    <div style={{color:'red'}}>{addToCartError}</div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 my-3" 
                    style={{display:'inline-block', height:'34px', fontWeight:'400',fontSize:'15px',padding:'5px',textAlign:'center',backgroundColor:'#4c4c4c',color:'white'}}
                    onClick={()=>{addToCart(teaDetails.id,quantity)}}
                  >
                    ADD TO CART
                  </div>
                </div>
              <div style={{margin:'30px 0px 20px 0px',fontSize:'15px',fontFamily:'Khula,sans-serif',fontWeight:'500',textAlign:'justify'}}>{teaDetails.description}</div>       
            </div>
          </div>
        }
          
      </div>
    </React.Fragment>
    );
  }
  
  export default TeaDetails;