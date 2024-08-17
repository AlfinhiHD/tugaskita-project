import dynamic from "next/dynamic";
const PelanggaranForm = dynamic(() => import("./_components/pelanggaran-form"))

const page = () => {
  return <PelanggaranForm />;
};

export default page;
