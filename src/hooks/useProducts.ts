import { useQuery } from "@tanstack/react-query";
import {fetchProducts, ProductResponse} from "@/lib/api";

export function useProducts() {
    return useQuery<ProductResponse>({
        queryKey:['products'],
        queryFn: fetchProducts,
    })
}