import React from 'react'
import { connect } from 'react-redux'; 

import { startCounting } from '../../statemanagement/app/AppStateManagement';

class WebcamView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dateRefresh: new Date().getTime()
    };

    this.refresh = this.refresh.bind(this);
    this.handleStartCounting = this.handleStartCounting.bind(this);
  }

  componentDidMount() {
    this.refreshInterval = setInterval(() => {
      this.refresh();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  refresh() {
    this.setState({ dateRefresh: new Date().getTime() });
  }

  handleStartCounting() {
    this.props.dispatch(startCounting());
  }

  render () {
    return (
      <div className="webcam-view">
        <button
          onClick={this.handleStartCounting}
          className="btn-count"
        >
          Start Counting
        </button>
        <img 
          width="1280"
          height="720"
          src={`http://192.168.1.222:8090/webcam.jpg?${this.state.dateRefresh}`} 
        />
        <style jsx>{`
          .webcam-view {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          .btn-count {
            position: fixed;
            top: 40%;
            left: 40%;
            font-size: 20px;
          }

          @media (min-aspect-ratio: 16/9) {
            img {
              width: 100%;
              height: auto;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            img {
              width: auto;
              height: 100%;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default connect()(WebcamView);
