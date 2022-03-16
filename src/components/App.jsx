import React from "react";
 import ImageGallery from './ImageGallery/ImageGallery';
 import Searchbar from './Searchbar';

 
export  default class App extends React.Component {
  state={
    imageName:"",
    
  }
  handleFormSubmit =(imageName)=>{
    this.setState({imageName})
  }
  
  render(){
    return (
      <div>
     <Searchbar onSubmit ={this.handleFormSubmit }/>
     <ImageGallery imageName={this.state.imageName} />
     </div>
    )
  }
 
};
