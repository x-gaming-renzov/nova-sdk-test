import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNova, useNovaObject } from "nova-react-sdk";

const MyComponent = () => {
  const { props: testButtonProps } = useNovaObject("test-object-1");

  return (
    <button style={{ backgroundColor: testButtonProps?.color }}>
      Test Button
    </button>
  );
};

const App = () => {
  const { setUser, loadAllObjects, trackEvent, state } = useNova();

  const [novaLoaded, setNovaLoaded] = useState(false);

  useEffect(() => {
    const appInit = async () => {
      await setUser({
        userId: "user78211qaqe2e1a1132",
        userProfile: { utm_source: "facebook" },
      });
    };

    appInit();
  }, []);

  useEffect(() => {
    const loadNovaObjects = async () => {
      await loadAllObjects();
      setNovaLoaded(true);
    };

    if (state.user) {
      loadNovaObjects();
      trackEvent("Test Event", {
        test: "test",
      });
    }
  }, [state.user]);

  console.log(state.objects);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {novaLoaded && <MyComponent />}
      </header>
    </div>
  );
};

export default App;
