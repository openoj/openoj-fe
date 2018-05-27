import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { Menu } from 'antd';
import style from './styles.less';

// Powered by https://github.com/id-kemo/responsive-menu-ant-design


const NavMenu = ({ mobileVersion, activeLinkKey, onLinkClick, className }) => (
  <Menu
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    selectedKeys={[`${activeLinkKey}`]}
    className={className}
  >
    <Menu.Item key="/problems">
      <Link to="/problems" onClick={onLinkClick}>Problem</Link>
    </Menu.Item>
    <Menu.Item key="/statuses">
      <Link to="/statuses" onClick={onLinkClick}>Statuses</Link>
    </Menu.Item>
  </Menu>
);

NavMenu.propTypes = {
  mobileVersion: PropTypes.bool,
  activeLinkKey: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
  className: PropTypes.string,
};

NavMenu.defaultProps = {
  mobileVersion: false,
  className: style.nav,
};

export default NavMenu;
