export type LoginValue = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type ResponseDTO<T> = {
    data: T;
    message: string;
  };
  
  export type TugasType = {
    id: string;
    title: string;
    point: number;
    status: string;
    description: string;
    type: string;
    startDate: string,
    endDate: string
}

export type TopRankType = {
    name: string;
    point: number;
}

export type TinjauReqTugasType = {
    id: string;
    title: string;
    user_id: string;
    user_name: string;
    image: string;
    description: string;
    point: number;
    status: string;
    type: string;
    message: string;
    created_at: string;
    updated_at: string;
    date_for_filter?: string;
    formatted_date?: string;
}

export type TinjauSubmitTugasType = {
    id: string;
    task_id: string;
    task_name: string;
    user_id: string;
    user_name: string;
    image: string;
    description: string;
    status: string;
    type:string;
    message: string;
    created_at: string;
    updated_at: string;
    date_for_filter?: string;
    formatted_date?: string;
}

export type RewardType = {
    id: string;
    name: string;
    stock: number;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

export type RedeemRewardType = {
    id: string;
    reward_id: string;
    reward_name: string;
    price: number;
    total_price: number;
    user_id: string;
    user_name: string;
    status: string;
    amount: number;
    created_at: string;
    updated_at: string;
    date_for_filter?: string;
    formatted_date?: string;
}

export type SiswaType = {
    id: string;
    name: string;
    address: string;
    image: string;
    role: string;
    email: string;
    school: string;
    class: string;1
    religion: string;
    total_point: string;
}

export type PelanggaranType = {
    id: string;
    user_id: string;
    user_name: string;
    point: number;
    description: string;
    date: string;
    created_at: string;
    updated_at: string
}

export type KeagamaanTaskType = {
    id: string;
    title: string;
    religion: string;
    point: number;
    created_at: string;
    updated_at: string;
    end_date: string;
    start_date: string;

}

export type SubmitKeagamaanTaskType = {
    id: string;
    task_id: string;
    task_name: string;
    user_id: string;
    username: string;
    user_name?: string;
    image: string;
    type: string;
    description: string;
    status: string;
    message: string;
    created_at: string;
    updated_at: string;
    date_for_filter?: string;
}

export type RequestKeagamaanTaskType = {
    id: string;
    title: string;
    user_id: string;
    user_name: string;
    username?: string;
    image: string;
    type: string;
    description: string;
    status: string;
    point: number;
    message: string;
    created_at: string;
    update_at: string;
    date_for_filter?: string;
}