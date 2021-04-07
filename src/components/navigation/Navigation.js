const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
        onClick={() => onRouteChange("./Signin")}
      >
        <p
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-mid-gray"
          style={{ margin: "5px" }}
        >
          Sign out
        </p>
      </nav>
    );
  } else
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <p
          onClick={() => onRouteChange("./Signin")}
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-mid-gray"
          style={{ margin: "5px" }}
        >
          Sign in
        </p>
        <p
          onClick={() => onRouteChange("./Signup")}
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-mid-gray"
          style={{ margin: "5px" }}
        >
          Sign up
        </p>
      </nav>
    );
};
export default Navigation;
