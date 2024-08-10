import instance from "../_utils/axios.instance";

const getTopRank = async () => {
  const res = await instance.get("/user/rank");

  return res.data;
};

const getAllSiswa = async () => {
  const res = await instance.get("/user");

  return res.data;
}

const SiswaService = {
  getTopRank,
  getAllSiswa
};

export default SiswaService;
