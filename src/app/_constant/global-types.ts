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

export type TinjauTugasType = {
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
    image: string;
    role: string;
    email: string;
    total_point: string;
}