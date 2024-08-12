import instance from "../_utils/axios.instance";

const getReward = async () => {
  const res = await instance.get("/admin-reward");

  return res.data;
};

const getRedeemReward = async () => {
    const res = await instance.get("/admin-reward/user");

    return res.data;
}

const getSingleReward = async (rewardId) => {
  const res = await instance.get(`/admin-reward/${rewardId}`);

  return res.data;
};

const createReward = async (newReward) => {
  const res = await instance.post('/admin-reward', newReward);

  return res.data;
}

const updateReward = async (rewardId, updatedReward) => {
  const res = await instance.put(`/admin-reward/${rewardId}`, updatedReward);

  return res.data;
}

const deleteReward = async (taskId) => {
  const res = await instance.delete(`/admin-reward/${taskId}`);
  return res.data;
}

const RewardService = {
    getReward,
    getRedeemReward,
    getSingleReward,
    createReward,
    updateReward,
    deleteReward
};

export default RewardService
