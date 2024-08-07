import dynamic from "next/dynamic";
const TinjauTugasPage = dynamic(() => import("./_components/tinjau-tugas-page"))

const page = () => {
  return <TinjauTugasPage />;
};

export default page;
