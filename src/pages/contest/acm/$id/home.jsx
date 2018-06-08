import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Table } from 'antd';
import moment from 'moment';
import TimeStatusBadge from '../components/TimeStatusBadge';
import numberToAlphabet from '../../../../utils/numberToAlphabet';
import pages from '../../../../configs/pages';

class ContestHome extends React.Component {


  render() {
    const { match, detail, serverTime } = this.props;
    const id = match.params.id;
    const data = detail[id];
    return (
      <div>
        <h2>{data.title}</h2>
        <p style={{marginBottom: '15px'}}>
          <span style={{marginRight: '20px'}}>Contest Time: {moment(data.started_at).format('YYYY-MM-DD HH:mm:ss')} ~ {moment(data.ended_at).format('YYYY-MM-DD HH:mm:ss')}</span>
          <TimeStatusBadge start={data.started_at} end={data.ended_at} cur={serverTime}/>
        </p>
        <Table dataSource={data.set_problem}
               rowKey={record => record.id}
               pagination={false}
        >
          <Table.Column
            title="Title"
            key="title"
            render={(text, record) => (
              <Link to={`${pages.contest.index}/${id}/problem?index=${record.index}`}>{numberToAlphabet(record.index-1)} - {record.title}</Link>
            )}
          />
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const detail = state.contest_acm.detail;
  const serverTime = state.contest_acm.serverTime;
  return {
    loading: !!state.loading.effects['contest_acm/getDetail'],
    detail,
    serverTime,
  };
}

export default connect(mapStateToProps)(ContestHome);
