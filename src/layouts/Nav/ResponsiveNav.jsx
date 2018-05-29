import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { Popover, Icon } from 'antd';
import style from './styles.less';

// Powered by https://github.com/id-kemo/responsive-menu-ant-design


class ResponsiveNav extends Component {
  state = {
    viewportWidth: 0,
    menuVisible: false,
  };

  componentDidMount() {
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  handleMenuVisibility = (menuVisible) => {
    this.setState({ menuVisible });
  };

  saveViewportDimensions = throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth,
    })
  }, this.props.applyViewportChange);

  render() {
    const {navMenu: NavMenu, session} = this.props;
    if(this.state.viewportWidth >= this.props.mobileBreakPoint) {
      return <NavMenu activeLinkKey={this.props.activeLinkKey} session={session}/>;
    }

    return (
      <Popover
        content={<NavMenu
          onLinkClick={() => this.handleMenuVisibility(false)}
          activeLinkKey={this.props.activeLinkKey}
          session={session}
          mobileVersion
        />
        }
        trigger="click"
        placement={this.props.placement}
        visible={this.state.menuVisible}
        onVisibleChange={this.handleMenuVisibility}
      >
        <Icon
          className={style.iconHamburger}
          type="menu"
        />
      </Popover>
    );
  }
}

ResponsiveNav.propTypes = {
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  activeLinkKey: PropTypes.string,
  placement: PropTypes.string,
  NavMenu: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  session: PropTypes.object,
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 768,
  applyViewportChange: 250,
  placement: 'bottom',
};

export default ResponsiveNav
