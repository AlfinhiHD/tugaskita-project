import dynamic from "next/dynamic";
const PelanggaranPage = dynamic(() => import("./_components/pelanggaran-page"))

const page = () => {
  return <PelanggaranPage />;
};

export default page;
