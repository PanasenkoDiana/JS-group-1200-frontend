import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product";
type RegisterRequest = {
    email: string;
    password: string;
}
type RegisterResponse = {
    id: number;
    email: string;
}
type LoginRequest = {
  email: string;
  password: string;
};
type UserResponse = {
  id: number;
  email: string;
};
// створюємо обєкт Api 
export const baseApi = createApi({
//унікальне імя зрізу для redux store
    reducerPath: "api",
//налаштовуємо базовий http запит
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        credentials: "include"
    }),
    tagTypes: ["Me"],
//описуємо усі запити до бєкенду
    endpoints: (builder)=>({
//будуємо get запит по посиланням /products
        getProducts: builder.query<Product[], void>({
            query: ()=>"/products"
        }),
        register: builder.mutation<RegisterResponse,RegisterRequest>({
            query: (data)=>({
                url: "auth/register",
                method: "POST",
                body: data
            })
        }),
        getMe: builder.query<UserResponse, void>({
            query: () => "/auth/me",
            providesTags: ["Me"],
        }),

        login: builder.mutation<void, LoginRequest>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Me"]
        }),
    })
})
//експортуємо апі під назвою хука useGetProductsQuery
export const {useGetProductsQuery, useRegisterMutation, useGetMeQuery, useLoginMutation} = baseApi
