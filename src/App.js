import { Component } from "react";
import Particles from "react-particles-js";
import Signin from "./components/authentication/Signin";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Rank from "./components/rank/rank";
import "./App.css";
import Signup from "./components/authentication/Signup";

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "./Signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount() {
    fetch("https://obscure-depths-82125.herokuapp.com/")
      .then((response) => response.json())
      .then(console.log)
      .catch(console.log);
  }

  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: faceData.left_col * width,
      top: faceData.top_row * height,
      right: width - faceData.right_col * width,
      bottom: height - faceData.bottom_row * height,
    };
  };

  setFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://obscure-depths-82125.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://obscure-depths-82125.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.setState(Object.assign(this.state.user, { entries: data }));
            })
            .catch(console.log);
        }
        this.setFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    route === "./Signin"
      ? this.setState(initState)
      : route === "./Home"
      ? this.setState({ route: route, isSignedIn: true })
      : this.setState({ route: route });
  };

  loadUser = (curUser) => {
    this.setState({
      user: {
        id: curUser.id,
        name: curUser.name,
        email: curUser.email,
        entries: curUser.entries,
        joined: curUser.joined,
      },
    });
  };

  render() {
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "./Signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : route === "./Signup" ? (
          <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <div>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageLink={imageUrl} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
