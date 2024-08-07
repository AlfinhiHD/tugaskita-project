import dynamic from "next/dynamic";
const DaftarRewardPage = dynamic(() => import("./_components/daftar-reward-page"))

const page = () => {
  return <DaftarRewardPage />;
};

export default page;
