import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Header from "./Header";
import { Navigate, Routes, Route } from "react-router";
import Login from "./Login";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/new/1" />} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/top" element={<LinkList />} />
        <Route path="/new/:page" element={<LinkList />} />
      </Routes>
    </div>
  );
}

export default App;
