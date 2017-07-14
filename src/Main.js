import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.state = {
      email: ""
    }
  }

  componentDidMount() {
    const content = document.getElementsByClassName('row')[0].getElementsByClassName('third');
    setTimeout(function() {
      for (let cont of content) {
        cont.classList.remove('hide');
      }
    }, 500);
  }

  handleEmailSubmit(e) {
    this.setState({
      email: e.target.value
    });
    document.getElementsByName('submit')
  }

  render() {
    return(
      <div id="wrapper">
        <h1 id="logo">Q</h1>
        <nav />
        <div id="title">
          <h1>Welcome to <span>NASDANQ</span><span>TM</span></h1>
          <p>We're still figuring things out but we thought you deserved a
            dank landing page.</p>
          <p>For any questions and inquiries email us at <a>support@nasdanq.com</a></p>
          <p>Also, visit our <a>Teespring store</a> for
            some awesome merch!</p>
          <hr />
        </div>
        <div id="content" className="row">
          <div className="container third hide">
            <h1>Get the latest NASDANQ updates sent to your inbox?</h1>
            <form action="">
              <input type="email" placeholder="Email"/>
              <button name="submit" onClick={this.handleEmailSubmit}>Join our mailing list!</button>
            </form>
          </div>
          <div className="container third hide">
            <h1>Donate?</h1>
            <i className="fa fa-paypal"/>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">

              <input type="hidden" name="business"
                     value="accounting@nasdanq.com"/>

              <input type="hidden" name="cmd" value="_donations"/>

              <input type="hidden" name="item_name" value="Friends of the Park"/>
              <input type="hidden" name="item_number" value="Fall Cleanup Campaign"/>
              <input type="hidden" name="currency_code" value="USD"/>

              <input type="image" name="submit"
                     src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png"
                     alt="Donate"/>
              <img alt="" width="1" height="1"
                   src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />

            </form>
            <p>E-begging is the new cool</p>
          </div>
          <div className="container third hide">
            <h1>Find us on social media?</h1>
            <div className="social">
              <a href="https://facebook.com/nasdanq" target="_blank">
                <i className="fa fa-facebook"/>
              </a>
              <a href="https://twitter.com/nas_danq" target="_blank">
                <i className="fa fa-twitter"/>
              </a>
              <a href="https://reddit.com/r/nasdanq" target="_blank">
                <i className="fa fa-reddit-alien"/>
              </a>
            </div>
            <p>We like the attention</p>
          </div>
        </div>
        <h3 className="copyright">© NASDANQ LLC {new Date().getFullYear()}</h3>
        <iframe
          src="/share.html"
          id="shareBtn"
          name="https://facebook.com/sharer.php?u=https://nasdanq.com
>https://twitter.com/share?&amp;url=https://nasdanq.com
>https://reddit.com/submit?url=https://nasdanq.com"
        />
      </div>
    )
  }
}

export default Main