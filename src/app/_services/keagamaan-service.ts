import instance from "../_utils/axios.instance"


const getAllReligionTugas = async () => {
    const res = await instance.get("/admin-task/religion")

    return res.data;
}


const getSpesificReligionTugas = async (taskId) => {
    const res = await instance.get(`/admin-task/religion/${taskId}`)

    return res.data
}

const addReligionTugas = async (data) => {
    const res = await instance.post("admin-task/religion", data)

    return res.data
}

const updateReligionTugas = async (data, taskId) => {
    const res = await instance.put(`/admin-task/religion/${taskId}`, data)

    return res.data
}

const deleteReligionTugas = async (taskId) => {
    const res = await instance.delete(`/admin-task/religion/${taskId}`)

    return res.data
}




const getAllUserSubmitReligionTugas = async () => {
    const res = await instance.get("admin-task/religion/user")

    return res.data
}

const updateStatusSubmitReligionTask = async (taskId, data) => {
    const res = await instance.put(`admin-task/religion/user/${taskId}`, data)

    return res.data
}

const getAllUserReqReligionTugas = async () => {
    const res = await instance.get("admin-task/religion/user-req")

    return res.data
}

const updateStatusReqReligionTask = async (taskId, data) => {
    const res = await instance.put(`admin-task/religion/user-req/${taskId}`, data)

    return res.data
}

const KeagamaanService = {
    getAllReligionTugas,
    getSpesificReligionTugas,
    addReligionTugas,
    updateReligionTugas,
    deleteReligionTugas,
    getAllUserSubmitReligionTugas,
    updateStatusSubmitReligionTask,
    getAllUserReqReligionTugas,
    updateStatusReqReligionTask
}

export default KeagamaanService