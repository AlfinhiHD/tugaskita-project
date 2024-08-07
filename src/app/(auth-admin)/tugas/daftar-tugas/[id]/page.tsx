import dynamic from "next/dynamic";
const DaftarTugasForm = dynamic(() => import("./_components/daftar-tugas-form"))

const page = () => {
  return <DaftarTugasForm />;
};

export default page;
