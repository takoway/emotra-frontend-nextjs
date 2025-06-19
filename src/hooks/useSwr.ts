// lib
import useSWR from "swr"

// utils
import { fetcherGet } from "@/fetch/fetcher"

/**
 * カスタムSwr
 */

export const useSwr = <T,>(url?: string, fallbackData?: T) => {
    const { data, error, mutate } = useSWR<T>(url ?? null, fetcherGet, {
        fallbackData,
    });

    return { data, error, mutate }
}
