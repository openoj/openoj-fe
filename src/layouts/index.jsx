import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import Link from 'umi/link';
import NavContainer from './components/NavContainer';
import pages from '../configs/pages';
import constants from '../configs/constants';
import styles from './index.less';


class Index extends React.Component {
  fetchSession() {
    const { dispatch } = this.props;
    dispatch({ type: 'session/fetch' });
  }

  componentDidMount() {
    if(this.props.location.pathname !== pages.session.oauth) {
      this.fetchSession();
    }
  }

  render() {
    const { children, location } = this.props;
    const { Header, Content, Footer } = Layout;
    if(location.pathname === pages.session.oauth) {
      return <div>{children}</div>
    }
    return (
      <Layout>
        <Header>
          <Row>
            <Col>
              <Link to="/" className={styles.logo}>{constants.siteName}</Link>
            </Col>
            <Col>
              <NavContainer/>
            </Col>
          </Row>
        </Header>
        <Content>
          {children}
        </Content>
        <Footer className={styles.footer}>
          <p>© 2018 {constants.siteName}. All Rights Reserved.</p>
          <p>Based on <a href="https://github.com/openoj" target="_blank" rel="noopener noreferrer">OpenOJ</a></p>
        </Footer>
      </Layout>
    );
  }
}

export default connect()(Index);
