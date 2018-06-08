import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Modal, Button } from 'antd';
import numberToAlphabet from '../../../../utils/numberToAlphabet';

class SubmissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleOk = () => {
    this.props.form.setFieldsValue({
      problem: this.props.problemId,
    });
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log(values);
        dispatch({
          type: 'contest_acm/submit',
          payload: values,
        });
      }
    });
  };

  handleShowModel = e => {
    if(e) {
      e.stopPropagation();
    }
    this.setState({ visible: true });
  };

  handleHideModel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { children, loading, form, problemId, problemIndex, title } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <a onClick={this.handleShowModel}>{children}</a>
        <Modal
          title="Submit Code"
          visible={this.state.visible}
          okText="Submit"
          confirmLoading={loading}
          onOk={this.handleOk}
          onCancel={this.handleHideModel}
        >
          <Form layout="vertical" hideRequiredMark={true}>
            <Form.Item label="Problem">
              {getFieldDecorator('problem')(<span
                className="ant-form-text">{numberToAlphabet(problemIndex - 1)} - {title}</span>)}
            </Form.Item>

            <Form.Item label="Language">
              {getFieldDecorator('language', {
                rules: [
                  { required: true, message: 'Please select language' },
                ],
              })(
                <Select placeholder="Select a language" initialValue="g++">
                  <Select.Option key="gcc">gcc</Select.Option>
                  <Select.Option key="g++">g++</Select.Option>
                  <Select.Option key="java">java</Select.Option>
                  <Select.Option key="python">python</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Code">
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input code' }],
              })(<Input.TextArea rows={10}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: !!state.loading.effects['contest_acm/submit'],
  };
}

export default connect(mapStateToProps)(Form.create()(SubmissionModal));
