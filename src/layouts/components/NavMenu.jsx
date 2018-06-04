import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Link from 'umi/link';
import { Menu, Icon, Spin, message } from 'antd';
import constants from '../../configs/constants';
import LoginModal from './Session/JoinModal';
import gStyles from '../../general.less';
import styles from './ResponsiveNav.less';

// Powered by https://github.com/id-kemo/responsive-menu-ant-design

class NavMenu extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, loading, logoutResult } = nextProps;
    if(this.props.loading && !loading) {
      if(logoutResult.result === 'succeeded') {
        message.success(logoutResult.msg, constants.msgDuration.success);
        dispatch({
          type: 'session/reset',
          payload: 'logout',
        });
      }
    }
  }

  logOut = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'session/logout',
    });
  };

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
          loading ?
            <Menu.Item key="loading">
              <Spin spinning={loading} size="small" delay={constants.indicatorDisplayDelay}/>
            </Menu.Item>
            :
            sessionStatus.logged_in ?
              <Menu.ItemGroup title={sessionStatus.user.username}>
                <Menu.Item key="/user">
                  <Link to="/user" onClick={onLinkClick}>User</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={() => {
                  onLinkClick();
                  this.logOut();
                }}>Log Out</Menu.Item>
              </Menu.ItemGroup>
              :
              <Menu.Item key="join">
                <LoginModal onShow={onLinkClick}>Join</LoginModal>
              </Menu.Item>
          :
          loading ?
            <Menu.Item key="loading" style={{ float: 'right' }}>
              <Spin spinning={loading} size="small" delay={constants.indicatorDisplayDelay}/>
            </Menu.Item>
            :
            sessionStatus.logged_in ?
              <Menu.SubMenu
                title={<span>{sessionStatus.user.username}<Icon type="down" className={gStyles.iconRight}/></span>}
                style={{ float: 'right' }}>
                <Menu.Item key="/user">
                  <Link to="/user">User</Link>
                </Menu.Item>
                <Menu.Item key="logout" onClick={this.logOut}>Log Out</Menu.Item>
              </Menu.SubMenu>
              :
              <Menu.Item key="join" style={{ float: 'right' }}>
                <LoginModal>Join</LoginModal>
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
  className: styles.nav,
};


function mapStateToProps(state) {
  const { status: sessionStatus, logout: logoutResult } = state.session;
  return {
    loading: !!state.loading.effects['session/fetch'] || !!state.loading.effects['session/logout'],
    sessionStatus,
    logoutResult,
  };
}

export default connect(mapStateToProps)(NavMenu);
