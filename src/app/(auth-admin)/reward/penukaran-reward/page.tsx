import dynamic from "next/dynamic";
const PenukaranRewardPage = dynamic(() => import("./_components/penukaran-reward-page"))

const page = () => {
  return <PenukaranRewardPage />;
};

export default page;
