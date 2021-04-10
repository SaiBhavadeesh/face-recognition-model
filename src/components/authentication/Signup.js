import { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userEmail: "",
      userPassword: "",
      checkPass: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ userPassword: event.target.value });
  };

  onCheckChange = (event) => {
    this.setState({ checkPass: event.target.value });
  };

  onSubmitSignup = () => {
    const { username, userEmail, userPassword, checkPass } = this.state;
    if (checkPass === userPassword) {
      const data = JSON.stringify({
        name: username,
        email: userEmail,
        password: userPassword,
      });
      fetch("http://localhost:3000/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      })
        .then((response) => response.json())
        .then((res) => {
          if (typeof res === "object") {
            this.props.loadUser(res);
            this.props.onRouteChange("./Home");
          } else window.alert(res);
        });
    } else {
      window.alert("Passwords didnot match");
    }
  };

  render() {
    return (
      <article
        className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
        style={{ backgroundColor: "white" }}
      >
        <div action="sign-up_submit" method="get" acceptCharset="utf-8">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign up</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 measure"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">
                Email address
              </label>
              <input
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 measure"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Re-enter Password
              </label>
              <input
                onChange={this.onCheckChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="resetpassword"
              />
            </div>
          </fieldset>
          <div className="mt3 pa3">
            <input
              onClick={this.onSubmitSignup}
              className="b ph3 pv2 input-reset ba b--black bg-transparent  grow pointer f6"
              type="submit"
              value="Sign Up"
            />
          </div>
        </div>
      </article>
    );
  }
}

export default Signup;
