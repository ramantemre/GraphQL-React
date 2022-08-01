import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import SongList from "./component/SongList";
import SongCreate from "./component/SongCreate";
import SongDetail from "./component/SongDetail";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Access-Control-Allow-Origin": "null",
  },
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => o.id,
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className="container">
        <Router>
          <Routes>
            {/* <Route path="/" element={<App />}> */}
            <Route path="/" element={<SongList />} />
            <Route path="songs/new" element={<SongCreate />} />
            <Route path="songs/:id" element={<SongDetail />} />
            {/* </Route> */}
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
