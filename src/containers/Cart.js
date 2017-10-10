import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { } from '../actions';

class Cart extends Component {
  constructor() {
    super();

  }

  render() {
    console.log('***Cart component:......', this.props)
    const categories = this.props.state.shop.categories;
    if (!categories.length) return <div></div>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 panel panel-default backTan">
            <h4>Cart Container</h4>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { state };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
