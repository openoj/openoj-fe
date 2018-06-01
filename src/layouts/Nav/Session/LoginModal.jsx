import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Button } from 'antd';
import styles from './styles.less';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
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

  handleOk = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        onOk(values);
        this.handleHideModel();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <a onClick={this.handleShowModel}>{children}</a>
        <Modal
          title="Login"
          visible={this.state.visible}
          okText="Submit"
          onOk={this.handleOk}
          onCancel={this.handleHideModel}
          className={styles.modalSm}
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
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(LoginModal);
