import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import gStyle from '../../general.less';
import style from './styles.less';

// Powered by https://github.com/id-kemo/responsive-menu-ant-design


const NavMenu = ({ mobileVersion, activeLinkKey, onLinkClick, className, session }) => (
  <Menu
    mode={mobileVersion ? 'vertical' : 'horizontal'}
    selectedKeys={[`${activeLinkKey}`]}
    className={className}
  >
    <Menu.Item key="/problems">
      <Link to="/problems" onClick={onLinkClick}>Problems</Link>
    </Menu.Item>
    <Menu.Item key="/statuses">
      <Link to="/statuses" onClick={onLinkClick}>Statuses</Link>
    </Menu.Item>
    {mobileVersion ?
      session.logged_in ?
        <Menu.ItemGroup title={session.user.username}>
          <Menu.Item key="/user">
            <Link to="/user" onClick={onLinkClick}>User</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={onLinkClick}>Logout</Menu.Item>
        </Menu.ItemGroup> :
        <Menu.Item key="join" onClick={onLinkClick}>Join</Menu.Item>
      :
      session.logged_in ?
        <Menu.SubMenu title={<span>{session.user.username}<Icon type="down" className={gStyle.iconRight}/></span>}
                      style={{ float: 'right' }}>
          <Menu.Item key="/user">
            <Link to="/user" onClick={onLinkClick}>User</Link>
          </Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu.SubMenu> :
        <Menu.Item key="join" style={{ float: 'right' }}>Join</Menu.Item>
    }
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
