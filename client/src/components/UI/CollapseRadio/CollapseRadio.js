import React, { Component } from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Collapse from '@material-ui/core/Collapse';
import { FormControlLabel } from '@material-ui/core';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export class CollapseRadio extends Component {

  state = {
    open: false,
    value: '0'
  }

  componentDidMount() {
    if (this.props.initState) {
      this.setState({open:this.props.initState})
    }
  }

  clickHandler = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  dropButtonHandler = () => (
    this.state.open 
    ? <FaAngleUp className="icon"/>
    : <FaAngleDown className='icon' />
  )

  renderList = () => (
    this.props.list
    ? this.props.list.map(item => (
      <FormControlLabel 
        key={item._id}
        value={`${item._id}`}
        control={<Radio/>}
        label={item.name}
      />  
    ))
    : null
  )

  changeHandler = (event) => {
    this.props.handleFilter(event.currentTarget.value)
    this.setState({value: event.currentTarget.value})
  }


  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{borderBottom: "1px solid #dbdbdb"}}>
          <ListItem 
            style={{padding: ".7rem 1.6rem .7rem 0"}}
            onClick={()=> this.clickHandler()}>
            <ListItemText 
              primary={this.props.title}
              className='collapse_title'
            />
            {this.dropButtonHandler()}
          </ListItem>
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
          <List 
            component="div"
            disablePadding

          >
            <RadioGroup
              aria-label="prices"
              name="prices"
              value={this.state.value}
              onChange={this.changeHandler}
            >
              {this.renderList()}
            </RadioGroup>
          </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

CollapseRadio.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  initState: PropTypes.bool,
  handleFilter: PropTypes.func
}

export default CollapseRadio
