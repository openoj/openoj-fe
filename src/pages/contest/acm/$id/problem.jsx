import React from 'react';
import { connect } from 'dva';
import {  Button, Spin } from 'antd';
import numberToAlphabet from '../../../../utils/numberToAlphabet';
import ReactMarkdown from 'react-markdown';
import SubmissionModal from '../components/SubmissionModal';
import constants from "../../../../configs/constants";
import gStyles from '../../../../general.less';

class ContestProblem extends React.Component {
  componentDidMount() {
    const { dispatch, location, problems, problemsMap } = this.props;
    const index = location.query.index;
    if(!problems[index]) {
      dispatch({
        type: 'contest_acm/getProblem',
        payload: { id: problemsMap[index], index },
      });
    }
  }

  render() {
    const { location, problems, problemsMap } = this.props;
    const index = location.query.index;
    const data = problems[index];
    if(data) {
      return (
        <div>
          <ReactMarkdown source={data.problem.content}/>
          <SubmissionModal problemId={problemsMap[index]} problemIndex={index} title={problems[index].title}>
            <Button type="primary">Submit</Button>
          </SubmissionModal>
        </div>
      );
    }
    return <Spin delay={constants.indicatorDisplayDelay} className={gStyles.spin}/>;
  }
}

function mapStateToProps(state) {
  const { detail, problems, problemsMap } = state.contest_acm;
  return {
    loading: !!state.loading.effects['contest_acm/getProblem'],
    detail,
    problems,
    problemsMap,
  };
}

export default connect(mapStateToProps)(ContestProblem);
