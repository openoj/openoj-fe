import React from 'react';
import withRouter from 'umi/withRouter';
import NavMenu from './NavMenu';
import ResponsiveNav from './ResponsiveNav';

const NavContainer = ({ location }) => (
  <ResponsiveNav
    activeLinkKey={location.pathname}
    navMenu={NavMenu}
    placement="bottom"
  />
);

export default withRouter(NavContainer);
