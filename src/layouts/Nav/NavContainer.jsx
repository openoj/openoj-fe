import React from 'react';
import withRouter from 'umi/withRouter';
import NavMenu from './NavMenu';
import ResponsiveNav from './ResponsiveNav';

const NavContainer = ({ location }) => {
  // Test data
  let session = {
    logged_in: true,
    user: {
      email: 'test@email.com',
      username: 'test',
    }
  };
  return (
    <ResponsiveNav
      activeLinkKey={location.pathname}
      navMenu={NavMenu}
      placement="bottom"
      session={session}
    />
  );
};

export default withRouter(NavContainer);
