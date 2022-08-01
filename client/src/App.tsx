import React, { ReactElement } from "react";

declare global {
  type AppProps = {
    children?: ReactElement;
  };
}

const App = (props: AppProps) => {
  return <div className="container">{props.children}</div>;
};

export default App;
