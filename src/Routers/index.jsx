import { Routes, Route } from "react-router-dom";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<UserRouter></UserRouter>}></Route>
      <Route path="/admin/*" element={<AdminRouter></AdminRouter>}></Route>
      <Route path="/*" element={<UserRouter></UserRouter>}></Route>
    </Routes>
  );
}

export default Routers;
