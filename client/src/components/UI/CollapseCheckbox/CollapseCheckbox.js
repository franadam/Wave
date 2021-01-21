import React, { Component } from 'react'

import {FaAngleDown, FaAngleUp} from 'react-icons/all';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import PropTypes from 'prop-types'

export class CollapseCheckbox extends Component {

  state = {
    open: false,
    checked: []
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

  toggleHandler = id  => {
    const {checked} = this.state
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(id)
    }
    else {
      newChecked.splice(currentIndex, 1)
    }

  this.setState(
    {
      checked: newChecked
    },
    () => {this.props.handleFilter(newChecked)}
    )
  }

  renderList = () => (
    this.props.list
    ? this.props.list.map((item) => (
      <ListItem key={item._id} style={{padding:'10px 0 '}}>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <Checkbox 
            color='primary'
            onChange={() => this.toggleHandler(item._id)}
            checked={this.state.checked.indexOf(item._id) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ))
    : null
  )

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
          <List>
            {this.renderList()}
          </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

CollapseCheckbox.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
  initState: PropTypes.bool,
  handleFilter: PropTypes.func 
}

export default CollapseCheckbox
