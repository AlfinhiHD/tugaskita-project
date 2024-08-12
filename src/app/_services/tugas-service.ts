import instance from "../_utils/axios.instance";

const getTugas = async () => {
  const res = await instance.get("/admin-task");

  return res.data;
};

const getTinjauTugas = async () => {
  const res = await instance.get('/admin-task/user/request');

  return res.data
}

const getDetailTask = async (taskId) => {
  const res = await instance.get(`/admin-task/${taskId}`);

  return res.data
}

const createTugas = async (newTugas) => {
  const res = await instance.post('/admin-task', newTugas);

  return res.data;
};

const updateTugas = async (taskId, updatedTugas) => {
  const res = await instance.put(`/admin-task/${taskId}`, updatedTugas);
  return res.data;
};

const deleteTugas = async (taskId) => {
  const res = await instance.delete(`/admin-task/${taskId}`);
  return res.data;
};

const TugasService = {
  getTugas,
  getTinjauTugas,
  createTugas,
  updateTugas,
  deleteTugas,
  getDetailTask
};

export default TugasService
