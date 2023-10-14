import { apiEndpoint, apiToken } from "@/utils/constants"
import { Session } from "./types"

type GetSessionsResponse = { number: number, count: number, is_last_offset: boolean, sessions: Session[] }

export const getSessions = async (page: number, event_id: string, limit: number): Promise<GetSessionsResponse> => {
    const response = await fetch(apiEndpoint + `/get-sessions?event_id=${event_id}&offset=${(page * limit) - limit || 0}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiToken
        }
    })
    const data = await response.json()
    return data
}