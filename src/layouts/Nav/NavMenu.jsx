import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Link from 'umi/link';
import { Menu, Icon, Spin } from 'antd';
import constants from '../../configs/constants';
import gStyle from '../../general.less';
import style from './styles.less';

// Powered by https://github.com/id-kemo/responsive-menu-ant-design

class NavMenu extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'session/fetch' });
  }

  render() {
    const { mobileVersion, activeLinkKey, onLinkClick, className, loading, sessionStatus } = this.props;
    return (
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
          sessionStatus.logged_in ?
            <Menu.ItemGroup title={sessionStatus.user.username}>
              <Menu.Item key="/user">
                <Link to="/user" onClick={onLinkClick}>User</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={onLinkClick}>Logout</Menu.Item>
            </Menu.ItemGroup>
            :
            !loading ?
              <Menu.Item key="join" onClick={onLinkClick}>Join</Menu.Item>
              :
              <Menu.Item key="loading">
                <Spin spinning={loading} size="small" delay={constants.indicatorDisplayDelay}/>
              </Menu.Item>
          :
          sessionStatus.logged_in ?
            <Menu.SubMenu
              title={<span>{sessionStatus.user.username}<Icon type="down" className={gStyle.iconRight}/></span>}
              style={{ float: 'right' }}>
              <Menu.Item key="/user">
                <Link to="/user" onClick={onLinkClick}>User</Link>
              </Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu.SubMenu>
            :
            !loading ?
              <Menu.Item key="join" style={{ float: 'right' }}>Join</Menu.Item>
              :
              <Menu.Item key="loading" style={{ float: 'right' }}>
                <Spin spinning={loading} size="small" delay={constants.indicatorDisplayDelay}/>
              </Menu.Item>
        }
      </Menu>
    )
  }
}

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


function mapStateToProps(state) {
  const { status: sessionStatus } = state.session;
  return {
    loading: state.loading.models.session,
    sessionStatus,
  };
}

export default connect(mapStateToProps)(NavMenu);

