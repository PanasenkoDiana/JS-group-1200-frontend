import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product";
// створюємо обєкт Api 
export const baseApi = createApi({
//унікальне імя зрізу для redux store
    reducerPath: "api",
//налаштовуємо базовий http запит
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000"
    }),
//описуємо усі запити до бєкенду
    endpoints: (builder)=>({
//будуємо get запит по посиланням /products
        getProducts: builder.query<Product[], void>({
            query: ()=>"/products"
        })
    })
})
//експортуємо апі під назвою хука useGetProductsQuery
export const {useGetProductsQuery} = baseApi
