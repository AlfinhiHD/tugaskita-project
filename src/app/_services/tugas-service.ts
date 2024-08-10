import instance from "../_utils/axios.instance";

const getTugas = async () => {
  const res = await instance.get("/admin-task");

  return res.data;
};

const TugasService = {
    getTugas,
};

export default TugasService
