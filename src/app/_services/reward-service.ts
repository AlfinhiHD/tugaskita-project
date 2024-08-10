import instance from "../_utils/axios.instance";

const getReward = async () => {
  const res = await instance.get("/admin-reward");

  return res.data;
};

const getRedeemReward = async () => {
    const res = await instance.get("/admin-reward/user");

    return res.data;
}

const RewardService = {
    getReward,
    getRedeemReward
};

export default RewardService
