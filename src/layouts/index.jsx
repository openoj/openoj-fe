import { Layout, Row, Col } from 'antd';
import Link from 'umi/link';
import style from './index.less';
import NavContainer from './Nav/NavContainer';
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
    <Footer></Footer>
  </Layout>
);
