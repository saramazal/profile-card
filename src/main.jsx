import React from 'react';
import './App.css';

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img for="photo-upload" src={src}/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/> 
  </label>


const Name =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="name">
      name:
    </label>
    <input 
      id="name" 
      type="text" 
      onChange={onChange} 
      maxlength="25" 
      value={value} 
      placeholder="Name" 
      required/>
  </div>

  
const Title =({
  onChange,
  value
})=>
  <div className="field">
    <label htmlFor="title">
      title:
    </label>
    <input 
      id="title" 
      type="text" 
      onChange={onChange} 
      maxLength="35" 
      value={value} 
      placeholder="Title" 
      required/>
  </div>


const Profile =({
  onSubmit,
  src,
  name,
  title,
})=>
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap" >
          <img for="photo-upload" src={src}/>
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="title">{title}</div>
      <button type="submit" className="edit">Edit Profile </button>
    </form>
  </div>
     
      
const Edit =({
  onSubmit,
  children,
})=>
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
        {children}
      <button type="submit" className="save">Save </button>
    </form>
  </div>

class CardProfile extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    name:'',
    title:'',
    active: 'edit'
  }

  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }
  editName = e =>{
    const name = e.target.value;
    this.setState({
      name,
    });
  }
  
  editTitle = e => {
    const title = e.target.value;
    this.setState({
      title,
    });
  }
  
  handleSubmit= e =>{
    e.preventDefault();
    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    })
  }
  
  render() {
    const {imagePreviewUrl, 
           name, 
           title, 
           active} = this.state;
    return (
      <div>
        {(active === 'edit')?(
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
            <Name onChange={this.editName} value={name}/>
            <Title onChange={this.editTitle} value={title}/>
          </Edit>
        ):(
          <Profile 
            onSubmit={this.handleSubmit} 
            src={imagePreviewUrl} 
            name={name} 
            title={title}/>)}
        
      </div>
    )
  }
}

ReactDOM.render(
  <CardProfile/>,
  document.getElementById('root')
)