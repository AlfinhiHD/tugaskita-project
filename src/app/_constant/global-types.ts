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
    Id: string;
    Title: string;
    UserId: string;
    UserName: string;
    image: string;
    Description: string;
    Point: number;
    Status: string;
    Type: string;
}

export type RewardType = {
    Id: string;
    Name: string;
    Stock: number;
    Price: number;
    Image: string;
}

export type RedeemRewardType = {
    Id: string;
    RewardId: string;
    RewardName: string;
    UserId: string;
    UserName: string;
    Status: string
}

export type SiswaType = {
    id: string;
    name: string;
    image: string;
    role: string;
    email: string;
    total_point: string;
}