import dynamic from "next/dynamic";
const DaftarTugasReligionPage = dynamic(() => import("./_components/daftar-tugas-religion-page"))

const page = () => {
  return <DaftarTugasReligionPage />;
};

export default page;
