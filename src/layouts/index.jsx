import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import Link from 'umi/link';
import NavContainer from './Nav/NavContainer';
import constants from '../configs/constants';
import gStyles from '../general.less';
import styles from './styles.less';


class Index extends React.Component {
  fetchSession() {
    const { dispatch } = this.props;
    dispatch({ type: 'session/fetch' });
  }

  componentDidMount() {
    this.fetchSession();
  }

  render() {
    const { children } = this.props;
    const { Header, Content, Footer } = Layout;
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
        <Footer className={gStyles.textCenter}>
          <p>© 2018 <a href="https://github.com/openoj" target="_blank" rel="noopener noreferrer">OpenOJ</a>.
            All Rights Reserved.
          </p>
        </Footer>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { status: sessionStatus } = state.session;
  return {
    loading: state.loading.models.session,
    sessionStatus,
  };
}

export default connect(mapStateToProps)(Index);
