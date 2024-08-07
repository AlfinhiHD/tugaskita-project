import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./_components/login-page"))

const page = () => {
  return <LoginPage />;
};

export default page;
