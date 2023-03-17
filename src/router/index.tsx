import Login from "@/page/Login";
import Home from "@/page/Home";
import Index from "@/component/Index";
import User from "@/component/System/User";
import Role from "@/component/System/Role";
import Source from "@/component/System/Source";
import Service from "@/component/Monitor/Service";
import Online from "@/component/Monitor/Online";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/index" element={<Index />} />
          <Route path="/user" element={<User />} />
          <Route path="/role" element={<Role />} />
          <Route path="/source" element={<Source />} />
          <Route path="/online" element={<Online />} />
          <Route path="/service" element={<Service />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;
