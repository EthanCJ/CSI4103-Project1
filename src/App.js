import './App.css';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Card } from 'react-bootstrap';
import { useState } from 'react';

export default function App(){
  const [starSign, setStarSign] = useState({
    signs:[
      {sign:"Aquarius", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Astrological_sign_Aquarius_at_the_Wisconsin_State_Capitol.jpg/180px-Astrological_sign_Aquarius_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Aries", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Astrological_sign_Aries_at_the_Wisconsin_State_Capitol.jpg/119px-Astrological_sign_Aries_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Cancer", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cancer_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Cancer_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Capricorn", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Capricornus_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Capricornus_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Gemini", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gemini_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Gemini_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Leo", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Leo_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Leo_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Libra", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Libra_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Libra_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Pisces", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pisces_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Pisces_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Scorpio", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Scorpio_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Scorpio_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Sagittarius", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sagittarius_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/180px-Sagittarius_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Taurus", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Taurus_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg/120px-Taurus_Astrological_Sign_at_the_Wisconsin_State_Capitol.jpg"},
      {sign:"Virgo", imgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Astrological_sign_Virgo_at_the_Wisconsin_State_Capitol.jpg/180px-Astrological_sign_Virgo_at_the_Wisconsin_State_Capitol.jpg"}],
    starResult:{
      color:"Blue",
      compatibility:"Taurus",
      current_date:"January 24, 2023",
      date_range:"Jan 20 - Feb 18",
      description:"You're not comfortable showing your feelings in public. In fact, you'd rather keep quiet than leave yourself open to ridicule. Everyone is feeling emotional now, though, and you're no exception. Go ahead and spout.",
      lucky_number:"1",
      lucky_time: "5pm",
      mood: "Excited"
    },
    currentSign:"Aquarius",
    currentImgSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Astrological_sign_Aquarius_at_the_Wisconsin_State_Capitol.jpg/180px-Astrological_sign_Aquarius_at_the_Wisconsin_State_Capitol.jpg",
    options : {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'c2ae621c8dmsh8ebae295f3ecff1p136770jsn515829f3e84b',
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
      }
    }
  });

  function updateStarSign(e){
    starSign.currentSign=e;
  }

  function updateStarSignResults(e){
    starSign.starResult=e;
  }

  function getImg(sign){
    starSign.signs.forEach(element => {
      if(element.sign === sign){
        return element.imgSrc
      }
    });
  }

  const handleChange= (e)=>{
    console.log("Fetch Astrology "+e);
    updateStarSign(e);
    starSign.currentImgSrc=getImg(starSign.currentSign);

    //Get response from API and store it
    fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign='+starSign.currentSign+'&day=today', starSign.options)
      .then(response => response.json())
      .then(data => updateStarSignResults(data))
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      {/*Comment Format for react */}

    <Card className="cardFormat">
      {/*Display As Card Title*/}
      <select name='dropdown' id="dropdown-basic-button" value={starSign} title={starSign.currentSign} onChange={handleChange}>
            {starSign.signs.map((sign) => <option value={sign.sign} onClick={starSign.currentSign="Leo"}>{sign.sign}</option>)}
            
             {/*<Dropdown.Item key='{this.state.signs[0]}' eventKey="{this.state.signs[0]}" onSelect={console.log("fire1")} value={this.state.signs[0]}>{this.state.signs[0].sign}</Dropdown.Item>
            <Dropdown.Item id='{this.state.signs[1]}' eventKey="{this.state.signs[1]}" onSelect={(e)=>this.setSelectedSign(e)} value={this.state.signs[1]}>{this.state.signs[1].sign}</Dropdown.Item>
            */}
        </select>

      <img className="headerPicture" src={starSign.currentImgSrc} alt={starSign.currentSign}></img>

      {/*Information In Card*/}
      <p>{starSign.starResult.date_range}</p>
      <p id='colorID'>Color: {starSign.starResult.color}</p>
      <p>Compatibility: {starSign.starResult.compatibility}</p>
      <p>"{starSign.starResult.description}"</p>
    </Card>
    </div>
  );
}