import React from 'react';
import axios from 'axios';
import qs from 'qs';
import setStatePromise from '../utils/setStatePromise';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf: '',
      accessToken: '',
      timer: null,
    };
    this.setStatePromise = setStatePromise.bind(this);
  }

  componentDidMount() {
    const hash = this.props.location.hash;
    if(!hash) {
      this.getCsrf();
    }
  }

  componentDidUpdate() {
    const hash = this.props.location.hash;
    if(!hash) {
      console.log(this.state.csrf);
      if(this.state.csrf) {
        const iframe = document.getElementById('iframe');
        console.log(iframe);
        if(!this.state.timer) {
          const timer = setInterval(() => this.checkFrame(iframe), 2000);
          console.log('set timer ' + timer);
          this.setState({ timer: timer });
        }
        // if(iframe && iframe.contentWindow.location.hash) {
        //   console.info(iframe.contentWindow.location.hash);
        //   iframe.parentNode.removeChild(iframe);
        // }
      }
    }
  }

  checkFrame = iframe => {
    const hash = iframe.contentWindow.location.hash;
    console.log('check');
    if(hash) {
      console.log(this.state.timer);
      const { access_token: accessToken } = qs.parse(hash.slice(1));
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
        accessToken: accessToken,
      });
      // this.getProblems(accessToken);
      console.log('ok!');
    }
  };

  getCsrf = async() => {
    let resp = await axios({
      url: 'http://localhost:8000/api/login',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        username: 'MeiK',
        password: 'asdf1234',
      }),
    });
    const csrf = await resp.data.csrfmiddlewaretoken;
    this.setStatePromise({ csrf: csrf });
  };

  getProblems = async(accessToken) => {
    let resp = await axios({
      url: 'http://localhost:8000/api/problem/',
      method: 'get',
      params: {
        access_token: accessToken,
      },
    });
    const data = await resp.data;
    console.log(data);
  };

  render() {
    if(this.props.location.hash)
      return (<h4>{this.props.location.hash}</h4>);
    else if(this.state.csrf)
      return (
        <div>
          <iframe src={`/session?csrf=${this.state.csrf}`} id="iframe" width={800} height={600} frameBorder={0}></iframe>
        </div>
      );
    else return (<div>logging in</div>);
  }
}

export default Index;
