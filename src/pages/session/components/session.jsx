import React from 'react';

class Session extends React.Component {
  componentDidMount() {
    document.getElementById('token').submit();
  }

  render() {
    return (
      <form id="token" method="post" action="http://localhost:8000/api/o/authorize/?response_type=token&client_id=c3r1LUxx2O33jTX8DT7UASNYCvkr7Jg0k6IbuFbK&state=1">
        <input type="hidden" name="csrfmiddlewaretoken" value={this.props.location.query.csrf}/>
        <input type="hidden" name="client_id" value="c3r1LUxx2O33jTX8DT7UASNYCvkr7Jg0k6IbuFbK"/>
        <input type="hidden" name="redirect_uri" value="http://localhost:8000/"/>
        <input type="hidden" name="response_type" value="token"/>
        <input type="hidden" name="state" value="1"/>
        <input type="hidden" name="allow" value="Authorize"/>
        <input type="hidden" name="scope" value="read write groups"/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Session;
