import instance from "../_utils/axios.instance";

const getTopRank = async () => {
  const res = await instance.get("/user/rank");

  return res.data;
};

const getAllSiswa = async () => {
  const res = await instance.get("/user");

  return res.data;
}

const getSingleSiswa = async (siswaId) => {
  const res = await instance.get(`/user/${siswaId}`);

  return res.data;
};

const createSiswa = async (newsiswa) => {
  const res = await instance.post('/user/register', newsiswa);

  return res.data;
}

const updateSiswa = async (siswaId, updatedsiswa) => {
  const res = await instance.put(`/user/${siswaId}`, updatedsiswa);

  return res.data;
}

const deleteSiswa = async (siswaId) => {
  const res = await instance.delete(`/user/${siswaId}`);

  return res.data;
}

const SiswaService = {
  getTopRank,
  getAllSiswa,
  getSingleSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa
};

export default SiswaService;
