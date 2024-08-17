import Sidebar from "../_components/sidebar";

const Layout = ({ children }) => (
  <div className="flex flex-col lg:flex-row min-h-screen h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-grow p-0 md:p-8 overflow-y-auto mt-16 lg:mt-0">
      {children}
    </main>
  </div>
);

export default Layout;