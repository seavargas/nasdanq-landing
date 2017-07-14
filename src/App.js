import React from 'react';
import Transition from 'react-motion-ui-pack';
import { Motion, spring } from 'react-motion';

/*
 * Global Functions/Data
 */

const arr2class = arr => {
  return arr ? arr.join(" ") : "";
};
const disp = () => ({
  opacity: '1',
  transform: 'translateY(0)'
});

/*
 * Components
 */

const NavBar = () => (
  <div>
      <h1 id="logo">Q</h1>
      <nav />
  </div>
);

const Title = () => {
  const wbreak = { wordBreak: "break-all" };
  const mail = "mailto:support@nasdanq.com";
  const teespring = "https://teespring.com/stores/nasdanq-merch";
  return (
    <div id="title">
        <h1>Welcome to <span>NASDANQ</span><span>TM</span></h1>
        <p>We're still figuring things out but we thought you deserved a
            dank landing page.</p>
        <p>For any questions and inquiries email us at <a style={wbreak} href={mail}>support@nasdanq.com</a></p>
        <p>Also, visit our <a style={wbreak} href={teespring}>Teespring store</a> for
            some awesome merch!</p>
        <hr />

        <Motion
          defaultStyle={{opacity: 0, translateY: 125}}
          style={{opacity: spring(1), translateY: spring(0, {stiffness: 150, damping: 17})}}>
          {({opacity, translateY}) => {
            return (
              <h2 style={{
                opacity,
                transform: `translateY(${translateY}px)`
              }}>Would you like to...</h2>
            )
          }}
        </Motion>

    </div>
  );
};

const Container = ({ children, cls, idx }) => (
  <Motion
    defaultStyle={{opacity: 0, translateY: 125}}
    style={{opacity: spring(1), translateY: spring(0, {stiffness: 150, damping: 17})}}>
    {({opacity, translateY}) => {
      return (
        <div style={{
          opacity,
          transform: `translateY(${translateY*(1+idx)}px)`
        }} className={arr2class(cls)}>{children}</div>
      )
    }}
  </Motion>
);

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false,
      message: ""
    };
  }

  changeHandler(e) {
    this.setState({email: e.target.value});
  }

  async submitHandler() {
    const email = this.state.email;
    const optin = true;
    if (email) {
      const _res = await fetch("https://beta.nasdanq.com/api/emailSignup", {
        "method": "POST",
        "headers": new Headers({"Content-Type": "application/json"}),
        "body": JSON.stringify({ email, optin })
      });
      const res = await _res.json();
      if (res.status == "ok") {
        this.setState({message: "Thank you for signing up!", success: true})
      }
      else if (res.status == "nodata") {
        this.setState({message: "Server Error: Contact the Devs", success: true})
      }
      else if (res.status == "dberror") {
        this.setState({message: "You're already signed up!", success: true})
      }
      setTimeout(()=>{
        this.setState({success: false})
      },3000);
    }

  }

  render() {
    const succ = this.state.success;
    const message = this.state.message;
    return (
      <div>
          <h1>
              Get the latest NASDANQ updates sent to your
              inbox?
          </h1>
          <input onChange={this.changeHandler.bind(this)} type="text" placeholder="Email" />
          <button onClick={this.submitHandler.bind(this)}>{succ ? message : "Join our mailing list!"}</button>
      </div>
    )
  }
}

class ParentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cls = [];
    this.sty = null;
    this.state = {sty: null};
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setState({sty: disp()});
    });
  }

  numChildren() {
    this.cls = ["container"];
    switch (this.props.children.length) {
      case 2:
        this.cls.push("half");
        break;
      case 3:
        this.cls.push("third");
        break;
      case 4:
        this.cls.push("quarter");
        break;
      default:
        break;
    }
  }

  renderChildren() {
    return this.props.children.map((child, idx) => {
      return React.cloneElement(child, {
        key: Math.random()*23524,
        cls: this.cls,
        sty: this.state.sty,
        idx
      });
    });
  }

  render() {
    this.numChildren();
    return (
      <div id="content" className="row">
        {this.renderChildren.bind(this)()}
      </div>
    );
  }
}

const Share = () => (
  <iframe
    src="/share.html"
    id="shareBtn"
    name="http://facebook.com/sharer.php?u=http://nasdanq.com
>http://twitter.com/share?&amp;url=http://http://nasdanq.com
>http://reddit.com/submit?url=http://http://nasdanq.com"
  />);

const Footer = () => (
  <h3 style={{marginTop: "16px"}} class="copyright">© NASDANQ LLC {new Date().getFullYear()}</h3>
);

// Base Component
class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
          <NavBar />
          <Title />
          <ParentContainer>

              <Container>
                  <Update />
              </Container>

              <Container>
                  <h1>Donate?</h1>
                  <form
                    action="https://www.paypal.com/cgi-bin/webscr"
                    method="post"
                    target="_top _block"
                  >
                      <input
                        type="hidden"
                        name="cmd"
                        value="_s-xclick"
                      />
                      <input
                        type="hidden"
                        name="encrypted"
                        value="-----BEGIN PKCS7-----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-----END PKCS7-----"
                      />
                      <i className="fa fa-paypal" aria-hidden="true" />
                      <input
                        className="paypalBtn"
                        type="image"
                        src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                        name="submit"
                        alt="PayPal - The safer, easier way to pay online!"
                      />

                      <img
                        alt=""
                        src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                        width="1"
                        height="1"
                        hidden=""
                        style={{ display: "none" }}
                      />
                  </form>
                  <p>E-begging is the new cool</p>
              </Container>

              <Container>
                  <h1>Find us on social media?</h1>
                  <div
                    className="social"
                    style={{
                      opacity: 1,
                      transform: "translateY(0px)"
                    }}
                  >
                      <a
                        href="https://facebook.com/nasdanq"
                        target="_blank"
                      >
                          <i className="fa fa-facebook" />
                      </a>
                      <a
                        href="https://twitter.com/nas_danq"
                        target="_blank"
                      >
                          <i className="fa fa-twitter" />
                      </a>
                      <a
                        href="https://reddit.com/r/nasdanq"
                        target="_blank"
                      >
                          <i className="fa fa-reddit-alien" />
                      </a>
                  </div>
                  <p>We like the attention</p>
              </Container>

          </ParentContainer>
          <Share />
          <Footer />
      </div>
    );
  }
}

export default App
