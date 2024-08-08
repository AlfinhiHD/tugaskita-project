import dynamic from "next/dynamic";
const DaftarRewardForm = dynamic(() => import("./_components/daftar-reward-form"))

const page = () => {
  return <DaftarRewardForm />;
};

export default page;
