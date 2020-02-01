import React from 'react';
import Http from '../../modules/Http.class.js';

export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <input type="file" accept=".xlsl,.xlsx" name="选择excel" onInput={this.upload.bind(this)} />
    )
  }

  upload (e) {
    Http.send({
      url: 'table',
      method: 'post',
      data: {
        file: e.target.files[0]
      }
    }).success(data => {
    })
  }

}
