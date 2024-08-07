import dynamic from "next/dynamic";
const DashboardPage = dynamic(() => import("./_components/dashboard-page"))

const page = () => {
  return <DashboardPage />;
};

export default page;
