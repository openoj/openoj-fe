import React from 'react';
import router from 'umi/router';
import pages from '../../../../configs/pages';

class ContestIndex extends React.Component {
  componentDidMount() {
    router.replace({
      pathname: `${pages.contest.index}/${this.props.match.params.id}/home`,
    });
  }

  render() {
    return (
      <div/>
    )
  }
}

export default ContestIndex;
