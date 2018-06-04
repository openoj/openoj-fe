import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Button, message } from 'antd';
import classNames from 'classnames';
import setStatePromise from '../../../utils/setStatePromise';
import constants from '../../../configs/constants';
import styles from './JoinModal.less';
import gStyles from '../../../general.less';
import 'csshake';

class JoinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      shake: false,
      shakeTimer: null,
      firstShow: true,
      contentVisible: true,
      tab: 'login',
      confirmDirty: false,
    };
    this.setStatePromise = setStatePromise.bind(this);
  }

  tabs = {
    login: {
      title: 'Login',
      body: () => {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form layout="vertical" hideRequiredMark={true} onSubmit={this.handleSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email', message: 'Please input a valid email',
                  },
                  {
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
              <a onClick={e => this.switchTab(e, 'forgotPassword')}>Forgot Password</a> or <a
              onClick={e => this.switchTab(e, 'register')}>Register</a>
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
      body: () => {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form layout="vertical" hideRequiredMark={true} onSubmit={this.handleSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Please input a valid email',
                }, {
                  required: true, message: 'Please input email',
                }],
              })(<Input/>)}
            </Form.Item>

            <Form.Item label="Verification Code">
              {getFieldDecorator('verification_code', {
                rules: [{ required: true, message: 'Please input verification code' }],
              })(
                <Input.Search enterButton="Get code" className={styles.inputButton}/>
              )}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input password',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password"/>
              )}
            </Form.Item>

            <Form.Item label="Confirm Password">
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm password',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur}/>
              )}
            </Form.Item>

            <Form.Item label="Username">
              {getFieldDecorator('username', {
                rules: [{
                  required: true, message: 'Please input username',
                }],
              })(
                <Input/>
              )}
            </Form.Item>

            <Form.Item>
              Already have an account? <a onClick={e => this.switchTab(e, 'login')}>Login</a>
            </Form.Item>

            <Form.Item className={gStyles.displayNone}>
              <Button htmlType="submit"/>
            </Form.Item>
          </Form>
        )
      },
    },
    forgotPassword: {
      title: 'Forgot Password',
      body: () => {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form layout="vertical" hideRequiredMark={true} onSubmit={this.handleSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Please input a valid email',
                }, {
                  required: true, message: 'Please input email',
                }],
              })(<Input/>)}
            </Form.Item>

            <Form.Item label="Verification Code">
              {getFieldDecorator('verification_code', {
                rules: [{ required: true, message: 'Please input verification code' }],
              })(
                <Input.Search enterButton="Get code" className={styles.inputButton}/>
              )}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input password',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password"/>
              )}
            </Form.Item>

            <Form.Item label="Confirm Password">
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm password',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur}/>
              )}
            </Form.Item>

            <Form.Item>
              Back to <a onClick={e => this.switchTab(e, 'login')}>Login</a>
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
      if(loginResult.result === 'succeeded') {
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

  switchTab = async (e, selectedTab) => {
    e.preventDefault();
    const form = this.props.form;
    const modalHeader = document.querySelector(`.${styles.modalTransition} .ant-modal-header`);
    const modalBody = document.querySelector(`.${styles.modalTransition} .ant-modal-body`);
    if(this.state.firstShow) {
      this.funTransitionHeight(modalBody);
      this.setState({ firstShow: false });
    }
    await this.setStatePromise({ contentVisible: false });
    await this.setStatePromise({ tab: selectedTab });
    form.resetFields(['verification_code', 'password', 'confirm', 'username']);
    this.funTransitionOpacity(modalHeader);
    this.funTransitionHeight(modalBody);
    setTimeout(() => this.setState({ contentVisible: true }), constants.modalAnimationDurationSwitch / 2);
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(value && value !== form.getFieldValue('password')) {
      callback('Two passwords are inconsistent');
    }
    else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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

  logIn = data => {
    const { dispatch } = this.props;
    dispatch({
      type: 'session/login',
      payload: data,
    });
  };

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
    const classes = classNames(
      gStyles.modalForm,
      gStyles.modalHeightSm,
      styles.modalTransition,
      {
        [styles.modalTransitionHide]: !this.state.contentVisible,
        'shake-horizontal shake-constant': this.state.shake,
      }
    );

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
          className={classes}
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

export default connect(mapStateToProps)(Form.create()(JoinModal));
