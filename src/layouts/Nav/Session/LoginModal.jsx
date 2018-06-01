import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, message } from 'antd';
import constants from '../../../configs/constants';
import gStyles from '../../../general.less';
import csshake from 'csshake';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shake: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, loading, loginResult } = nextProps;
    if(this.props.loading && !loading) {
      if(loginResult.result === 'ok') {
        message.success(loginResult.msg, constants.msgDuration.success);
        this.handleHideModel();
        setTimeout(() => dispatch({
          type: 'session/fetch',
        }), constants.modalAnimationDurationFade);
      }
      else if(loginResult.result === 'failed') {
        message.error(loginResult.msg, constants.msgDuration.error);
        this.setState({ shake: true });
        setTimeout(() => this.setState({ shake: false }), constants.modalAnimationDurationShake);
      }
    }
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
          className={`${gStyles.modalForm} ${gStyles.modalHeightSm} ${this.state.shake ? 'shake-horizontal shake-constant' : ''}`}
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
