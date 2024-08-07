import dynamic from "next/dynamic";
const DaftarTugasPage = dynamic(() => import("./_components/daftar-tugas-page"))

const page = () => {
  return <DaftarTugasPage />;
};

export default page;
