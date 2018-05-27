import React from 'react';
import withRouter from 'umi/withRouter';
import NavMenu from './NavMenu';
import ResponsiveNav from './ResponsiveNav';

const NavContainer = ({ location }) => {
  return (
    <ResponsiveNav
      activeLinkKey={location.pathname}
      navMenu={NavMenu}
      placement="bottomLeft"
    />
  );
};

export default withRouter(NavContainer);
