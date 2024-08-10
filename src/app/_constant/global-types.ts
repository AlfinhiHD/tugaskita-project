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
    type: string;
    startDate: string,
    endDate: string
}

export type TopRankType = {
    name: string;
    point: number;
}

