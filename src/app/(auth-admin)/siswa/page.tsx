import dynamic from "next/dynamic";
const SiswaPage = dynamic(() => import("./_components/siswa-page"))

const page = () => {
  return <SiswaPage />;
};

export default page;
