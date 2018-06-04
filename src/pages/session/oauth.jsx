import React from 'react';
import apis from '../../configs/apis';

class SessionOAuth extends React.Component {
  componentDidMount() {
    const hash = this.props.location.hash;
    if(!hash) {
      document.getElementById('session-oauth-form').submit();
    }
  }

  render() {
    const { hash, query } = this.props.location;

    if(hash) {
      return (<div style={{style: 'none'}}/>);
    }
    return (
      <form id="session-oauth-form"
            method="post"
            action={`${apis.session.oauth}`}
            style={{display: 'none'}}
      >
        <input type="hidden" name="csrfmiddlewaretoken" value={query.csrf}/>
        <input type="hidden" name="client_id" value="c3r1LUxx2O33jTX8DT7UASNYCvkr7Jg0k6IbuFbK"/>
        <input type="hidden" name="redirect_uri" value="http://localhost:8000/session/oauth"/>
        <input type="hidden" name="response_type" value="token"/>
        <input type="hidden" name="state" value="1"/>
        <input type="hidden" name="allow" value="Authorize"/>
        <input type="hidden" name="scope" value="read write groups"/>
      </form>
    );
  }
}

export default SessionOAuth;
