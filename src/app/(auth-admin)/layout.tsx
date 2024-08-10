import Sidebar from "../_components/sidebar";

const Layout = ({ children }) => (
  <div className="flex min-h-screen h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-grow p-8 overflow-y-auto">
      {children}
    </main>
  </div>
);

export default Layout;
