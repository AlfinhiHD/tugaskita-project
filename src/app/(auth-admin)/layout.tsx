import Sidebar from "../_components/sidebar";

const Layout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-grow p-8">
      {children}
    </main>
  </div>
);

export default Layout;