import dynamic from "next/dynamic";
const DaftarTugasReligionForm = dynamic(() => import("./_components/daftar-tugas-religion-form"))

const page = () => {
  return <DaftarTugasReligionForm />;
};

export default page;
