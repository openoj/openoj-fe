import React from 'react';
import { connect } from 'dva';
import { Table, Pagination } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import limits from '../../../configs/limits';
import pages from '../../../configs/pages';

class ContestACMList extends React.Component {
  handleChangePage = page => {
    const { dispatch, title } = this.props;
    router.push({
      pathname: pages.contest.index,
      query: { page, title },
    })
  };

  handleChangeTable = (pagination, filters, sorter) => {
    // console.log(pagination);

  };

  render() {
    const { data, loading, page, total } = this.props;
    return (
      <div>
        <Table dataSource={data}
               rowKey={record => record.id}
               loading={loading}
               onChange={this.handleChangeTable}
               pagination={false}
        >
          <Table.Column
            title="Title"
            dataIndex="title"
            key="title"
            render={(text, record) => (
              <Link to={`${pages.contest.index}/${record.id}`}>{record.title}</Link>
            )}
          />
          <Table.Column
            title="Started at"
            dataIndex="started_at"
            key="started_at"
          />
          <Table.Column
            title="Ended at"
            dataIndex="ended_at"
            key="ended_at"
          />
        </Table>
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={page}
          pageSize={limits.contest.acm.list}
          onChange={this.handleChangePage}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data, page, total, title } = state.contest_acm.list;
  return {
    loading: !!state.loading.effects['contest_acm/getList'] || !!state.loading.effects['contest_acm/reloadList'],
    data,
    page,
    total,
    title,
  };
}

export default connect(mapStateToProps)(ContestACMList);
