import styled from "styled-components";
import Button from '@material-ui/core/Button';
import {BiChevronRightCircle} from "react-icons/bi";

// interface ImageTest{
//     length: number;
// };

const StyledButton = styled(Button)`
background-color: white !important;
color:black !important;
`;

// const Image = styled.img`
//   width: ${(props:ImageTest) => props.length}vw;
//   height: ${(props:ImageTest) => props.length}vw;
//   border-radius: 50%;
//   `;

function MainHome(){

    return(
        <div style={{backgroundColor:'black', width:'100vw', position:'relative', top:'0'}}>
            <div className= "mainContainer" >
                <div className="imgContainer">
                    <span id='mainImg1'><img alt ='SoloveCharater1' src='Solove1.jpg'></img></span>
                    <span id='mainImg2'><img alt ='SoloveCharater2' src='Solove3.jpg'></img></span>
                    <span id='mainImg3'><img alt ='SoloveCharater3gif' src='Solove2.gif'></img></span>
                </div>
                <div className="textContainer">
                    <h1>Welcome to </h1>
                    <img src="solovewhite.png" alt="Solove" width="320px"></img>
                    <p>Solove Supports all the loves in the world.<br/>Join our world and create a new relationship</p>
                    <StyledButton type="submit" formTarget='_blank' href="https://opensea.io">Click to shop<BiChevronRightCircle/></StyledButton>
                </div>
            </div>
        </div>
    )
}
export default MainHome;