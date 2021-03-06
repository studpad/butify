import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DropzonePure from  './DropzonePure';

import _ from 'lodash'

export default class PhotosBox extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      url_text: '',
      show_input: false
    };

    _.bindAll(this,
      'addFromComputerClick',
      'addFromInternetClick',
      'onDrop',
      'hideInput',
      'onChange'
    );
  }
  addFromComputerClick(){
    this.setState({show_input: false});
    this.refs.drop.onClick();
  }
  addFromInternetClick(){
    this.setState({show_input: true});
  }
  onDrop(files){
    var data = new FormData();
    data.append('file', files[0]);
    $.ajax({
      url: '/photos',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: (data) => {
        this.setState({url_text: '', show_input: false});
        this.props.addPhoto(data);
        console.log(data);
      },
      error: (data) => {
        console.error("PostModalContent::onDrop Can't create attachment", data);
      }
    });
  }
  hideInput(){
    this.setState({show_input: false});
  }
  onChange(e){
    var text = e.target.value;
    this.setState({url_text: text});
    let e_url = text.trim();
    if (e_url.endsWith('.jpg')  ||
        e_url.endsWith('.jpeg') ||
        e_url.endsWith('.png')  ||
        e_url.endsWith('.gif')) {

      $.ajax({
        url: '/photos',
        type: 'POST',
        data: {link: e_url},
        dataType: 'json',
        success: (data) => {
          this.props.addPhoto(data);
          this.setState({show_input: false, url_text: ''});
        },
        error: (data) => {
          Rolbar.debug(data)
        }
      });

    }
  }
  componentDidUpdate() {
    var node = this.refs.input;
    if (node) $(node).focus();
  }
  render(){
    let photos = this.props.photos || [];
    photos = photos.map((p, index) => {
      return (
        <div key={index} className="usual-post-photo action-create-element-post">
          <img
            onClick={this.props.removePhoto.bind(this, p.id)}
            className='remove-angle photo-remove-angle'
            src = '/images/close.png' />
          <img className='img-usual-post-photo' src={p.url} />
        </div>
      );
    });

    if (photos.length > 0 && !this.state.show_input){
      var bottom_button_group = (
        <div>
          <div className='add-photo-yet'>
            <div
              className='add-photo-device-yet'
              onClick={this.addFromComputerClick}>
              <img
                className='type-of-add-photo'
                src = '/images/add_photo_from_device.png' /> Добавить с компьютера
            </div>
            <div
              className='add-photo-link-yet'
              onClick={this.addFromInternetClick}>
              <img
                className='type-of-add-photo'
                src = '/images/add_photo_from_internet.png' /> Добавить из Интернета
            </div>
          </div>
          <div className='clearboth'>
          </div>
        </div>

      );
    }
    if (photos.length == 0 && !this.state.show_input) {
      var top_button_group = (
          <div className='form-new-post usual-post-contant'>
            <div className='form-wrap-new-post-type'>
              <div className='split-cells-choose-photo'>
                <div
                  className='split-cell'
                  onClick={this.addFromComputerClick}>
                  <img src = '/images/add_photo_from_device.png' />
                  <br/>
                  Загрузить фото с компьютера
                </div>
                <div
                  className='split-cell'
                  onClick={this.addFromInternetClick}>
                  <img src = '/images/add_photo_from_internet.png' />
                  <br/>
                  Добавить фото из Интернета
                </div>
              </div>
            </div>
          </div>
      );
    }

    if (this.state.show_input) {
      var imgClassname, divClassname;
      if (this.props.photos.length){
        imgClassname = 'remove-angle write-link-to-photo-remove-angle-slim'
        divClassname = 'write-link-to-photo-slim'
      } else {
        imgClassname = 'remove-angle all-remove-angle'
        divClassname = 'write-link-to-photo'
      }
      var url_input = (
        <div className='wrap-write-link-to-photo'>
          <img
            onClick={this.hideInput}
            className={imgClassname}
            src = '/images/close.png' />
          <div className={divClassname}>
            <input
              ref='input'
              value={this.state.url_text}
              className='input-new-post form-link input-sp form-control'
              placeholder='Вставьте URL-адрес'
              onChange={this.onChange}/>
          </div>
        </div>
      );
    }

    return (
      <div>
        <DropzonePure
          ref='drop'
          onDrop={this.onDrop}
          accept='image/*'/>
        {top_button_group}
        {photos}
        {url_input}
        {bottom_button_group}
      </div>
    );
  }
}
