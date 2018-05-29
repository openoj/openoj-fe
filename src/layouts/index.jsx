import { Layout, Row, Col } from 'antd';
import Link from 'umi/link';
import NavContainer from './Nav/NavContainer';
import gStyle from '../general.less';
import style from './index.less';

const { Header, Content, Footer } = Layout;


export default ({ children }) => (
  <Layout>
    <Header>
      <Row>
        <Col>
          <Link to="/" className={style.logo}>OpenOJ</Link>
        </Col>
        <Col>
          <NavContainer/>
        </Col>
      </Row>
    </Header>
    <Content>
      {children}
    </Content>
    <Footer className={gStyle.textCenter}>
      <p>© 2018 <a href="https://github.com/openoj" target="_blank" rel="noopener noreferrer">OpenOJ</a>.
        All Rights Reserved.
      </p>
    </Footer>
  </Layout>
);
