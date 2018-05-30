import { connect } from 'dva';

function Session({ dispatch, loading, status }) {
  return (
    <div>
      <p>{loading ? 'loading' : 'not loading'}</p>
      <p>{status.logged_in ? 'Yes' : 'No'}</p>
    </div>
  );
}

function mapStateToProps(state) {
  const { status } = state.session;
  return {
    loading: state.loading.models.session,
    status,
  };
}

export default connect(mapStateToProps)(Session);
