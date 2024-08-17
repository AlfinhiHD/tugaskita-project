import instance from "../_utils/axios.instance";

const getPelanggaran = async () => {
  const res = await instance.get("/admin-penalty");

  return res.data;
};

const getSinglePelanggaran = async (pelanggaranId) => {
  const res = await instance.get(`/admin-penalty/${pelanggaranId}`)

  return res.data
}

const createPelanggaran = async (newPelanggaran) => {
    const res = await instance.post('/admin-penalty', newPelanggaran)

    return res.data
} 

const deletePelanggaran = async (pelanggaranId) => {
  const res = await instance.delete(`/admin-penalty/${pelanggaranId}`)

  return res.data
}

const updatePelanggaran = async (pelanggaranId, newData) => {
  const res = await instance.put(`/admin-penalty/${pelanggaranId}`, newData)
}

const PelanggaranService = {
    getPelanggaran,
    createPelanggaran,
    deletePelanggaran,
    getSinglePelanggaran,
    updatePelanggaran
};

export default PelanggaranService;
