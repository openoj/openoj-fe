import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Button, message } from 'antd';
import setStatePromise from '../../../utils/setStatePromise';
import constants from '../../../configs/constants';
import styles from './LoginModal.less';
import gStyles from '../../../general.less';
import 'csshake';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shake: false,
      shakeTimer: null,
      firstShow: true,
      contentVisible: true,
      tab: 'login'
    };
    this.setStatePromise = setStatePromise.bind(this);
  }

  tabs = {
    login: {
      title: 'Login',
      body: () => {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form layout="vertical" onSubmit={this.handleSubmit}>
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
              <a onClick={e => {
                this.switchTab(e, 'forgotPassword')
              }}>Forgot Password</a> or <a href="">Register</a>
            </Form.Item>

            <Form.Item className={gStyles.displayNone}>
              <Button htmlType="submit"/>
            </Form.Item>
          </Form>
        )
      },
    },
    register: {
      title: 'Register',
      body: '',
    },
    forgotPassword: {
      title: 'Forgot Password',
      body: () => {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid email',
                }, {
                  required: true, message: 'Please input email',
                }],
              })(<Input/>)}
            </Form.Item>

            <Form.Item label="Code">
              {getFieldDecorator('code', {
                rules: [{
                  required: true, message: 'Please input code',
                }],
              })(<Input/>)}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input password' }],
              })(<Input type="password"/>)}
            </Form.Item>

            <Form.Item>
              Go back to <a onClick={e => {
              this.switchTab(e, 'login')
            }}>Login</a>
            </Form.Item>

            <Form.Item className={gStyles.displayNone}>
              <Button htmlType="submit"/>
            </Form.Item>
          </Form>
        )
      },
    },
  };

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
        if(this.state.shakeTimer) {
          clearTimeout(this.state.shakeTimer);
        }
        this.setState({ shake: true });
        this.setState({ shakeTimer: setTimeout(() => this.setState({ shake: false }), constants.modalAnimationDurationShake) });
      }
    }
  }

  // funTransitionHeight powered by zhangxinxu

  funTransitionHeight(element) {
    if(typeof window.getComputedStyle === "undefined") {
      return;
    }
    let height = window.getComputedStyle(element).height;
    element.style.transitionProperty = 'none';
    element.style.height = 'auto';
    let targetHeight = window.getComputedStyle(element).height;
    element.style.height = height;
    this.__ = element.offsetWidth;
    delete this.__;
    element.style.transitionProperty = 'height, opacity';
    element.style.height = targetHeight;
  };

  funTransitionOpacity(element) {
    if(typeof window.getComputedStyle === "undefined") {
      return;
    }
    element.style.transitionProperty = 'none';
    this.__ = element.offsetWidth;
    delete this.__;
    element.style.transitionProperty = 'opacity';
  };

  switchTab = async(e, selectedTab) => {
    e.preventDefault();
    let modalHeader = document.querySelector(`.${styles.modalTransition} .ant-modal-header`);
    let modalBody = document.querySelector(`.${styles.modalTransition} .ant-modal-body`);
    if(this.state.firstShow) {
      this.funTransitionHeight(modalBody);
      this.setState({ firstShow: false });
    }
    await this.setStatePromise({ contentVisible: false });
    await this.setStatePromise({ tab: selectedTab });
    this.funTransitionOpacity(modalHeader);
    this.funTransitionHeight(modalBody);
    setTimeout(() => this.setState({ contentVisible: true }), constants.modalAnimationDurationSwitch / 2);
  };

  handleShowModel = e => {
    if(e) {
      e.stopPropagation();
    }
    const { onShow } = this.props;
    if(onShow) {
      onShow();
    }
    this.setState({ visible: true });
  };

  handleHideModel = () => {
    this.setState({ visible: false });
  };

  logIn(data) {
    const { dispatch } = this.props;
    dispatch({
      type: 'session/login',
      payload: data,
    });
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.logIn(values);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleOk();
  };

  render() {
    const { children, loading } = this.props;

    return (
      <>
        <a onClick={this.handleShowModel}>{children}</a>
        <Modal
          title={this.tabs[this.state.tab].title}
          visible={this.state.visible}
          okText="Submit"
          confirmLoading={loading}
          onOk={this.handleOk}
          onCancel={this.handleHideModel}
          className={`${gStyles.modalForm} ${gStyles.modalHeightSm} ${styles.modalTransition} ${this.state.contentVisible ? '' : styles.modalTransitionHide} ${this.state.shake ? 'shake-horizontal shake-constant' : ''}`}
        >
          {this.tabs[this.state.tab].body()}
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
