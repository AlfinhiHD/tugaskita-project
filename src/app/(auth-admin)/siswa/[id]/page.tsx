import dynamic from "next/dynamic";
const SiswaForm = dynamic(() => import("./_components/siswa-form"))

const page = () => {
  return <SiswaForm />;
};

export default page;
