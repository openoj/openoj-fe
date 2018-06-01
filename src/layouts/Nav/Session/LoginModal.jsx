import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, message } from 'antd';
import constants from '../../../configs/constants';
import gStyles from '../../../general.less';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      login: props.loginResult,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.login.result === prevState.login.result) return null;
    return { login: nextProps.login };
  }

  handleShowModel = e => {
    if(e) {
      e.stopPropagation();
    }
    const { onShow } = this.props;
    if(onShow) {
      onShow();
    }
    this.setState({
      visible: true,
    });
  };

  handleHideModel = () => {
    this.setState({
      visible: false,
    });
  };

  logIn(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'session/login',
      payload: data,
    });
  }

  handleOk = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        // onOk(values);
        this.logIn(values);
        // this.handleHideModel();
      }
    });
  };

  render() {
    const { children, loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <a onClick={this.handleShowModel}>{children}</a>
        <Modal
          title="Log In"
          visible={this.state.visible}
          okText="Submit"
          confirmLoading={loading}
          onOk={this.handleOk}
          onCancel={this.handleHideModel}
          className={`${gStyles.modalForm} ${gStyles.modalHeightSm}`}
        >
          <Form layout="vertical" onSubmit={this.handleOk}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid email',
                }, {
                  required: true, message: 'Please input email',
                }],
              })(<Input/>)}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input password' }],
              })(<Input type="password"/>)}
            </Form.Item>

            <Form.Item>
              <a>Forgot Password</a> or <a href="">Register</a>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { login: loginResult } = state.session;
  return {
    loading: state.loading.effects['session/login'],
    loginResult,
  };
}

export default connect(mapStateToProps)(Form.create()(LoginModal));
