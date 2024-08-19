import dynamic from "next/dynamic";
const TinjauTugasKeagamaanPage = dynamic(() => import("./_components/tinjau-tugas-keagamaan-page"))

const page = () => {
  return <TinjauTugasKeagamaanPage />;
};

export default page;
