import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";
import { Routes, Route } from "react-router";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LinkList />} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
