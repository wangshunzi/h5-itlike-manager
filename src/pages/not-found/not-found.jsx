import React, {Component} from 'react'
import {Button} from 'antd'
import './not-found.less'

export default class NotFound extends Component {
  render() {
    return (
      <div className='not-found'>
          <div>
            <Button type='primary' onClick={() => this.props.history.replace('/')} className={"backHome"}>
              回到首页
            </Button>
          </div>
      </div>
    )
  }
}
