import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import PropTypes from 'prop-types'

import {FaPlusCircle} from 'react-icons/all'
import CircularProgress from '@material-ui/core/CircularProgress';

export class FileUpload extends Component {

  state = {
    uploadedFiles: [],
    uploading: false,
  }

  onDrop = async (files) => {
    try {
    console.log('files :>> ', files);
    this.setState({uploading:true})
    const formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    const res = await axios.post('/api/users/uploadimage', formData, config)
    console.log('res.data :>> ', res.data);
    this.setState((prevState) => ({
      uploading:false,
      uploadedFiles: [
        ...prevState.uploadedFiles,
        res.data
      ]
    }), () => this.props.imageHandler(this.state.uploadedFiles))
    } catch (error) {
      console.log('error :>> ', error);
    }

  }

  removeFile = async (id) => {
    try {
      await axios.get(`/api/users/removeimage?public_id=${id}`)
      const uploadedFiles = this.state.uploadedFiles.filter(file => file.public_id !== id)
      this.setState({uploadedFiles}, () => {this.props.imageHandler(uploadedFiles)})
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  componentDidMount() {
    if (this.props.reset) this.setState( {uploadedFiles: []})
  }

  //static getDerivedStateFromProps(props, state) {
  //  if (props.reset) return state = {uploadedFiles: {}}
  //  return null
  //}

  showUploadedImages = () => 
    this.state.uploadedFiles.map(file =>(
      <div 
        key={file.public_id}
        className="dropzone_box"
        onClick={()=>this.removeFile(file.public_id)}
      >
        <div className="wrap"
          style={{background: `url(${file.url}) no-repeat`}}
        ></div>
      </div>
    ))
  

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(event) => this.onDrop(event) }
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({className:"dropzone_box"})}>
                  <input {...getInputProps()} />
                  <div className="wrap">
                  <FaPlusCircle />
                  </div>
                </div>
              )}
            </Dropzone> 
            {
              this.showUploadedImages()
            }
            {
              this.state.uploading
              ? <div className="dropzone_box"
              style={{textAlign: 'center', paddingTop: '60px'}}
              >
                <CircularProgress 
                  style={{color:'#00bcd4'}}
                  thickness={7}
                />
              </div>
              : null
            }
          </div>
        </section>
      </div>
    )
  }
}

FileUpload.propTypes = {
  reset: PropTypes.bool,
  imageHandler: PropTypes.func
}

export default FileUpload
