import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard";

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <Dashboard />
  );
}

export default App;