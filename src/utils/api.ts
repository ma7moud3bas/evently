import { apiEndpoint, apiToken } from "@/utils/constants"
import { Session } from "./types"

type GetSessionsResponse = { number: number, count: number, is_last_offset: boolean, sessions: Session[] }
type GetSessionResponse = Session
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

export const getSession = async (sessionId: string, eventId: string): Promise<GetSessionResponse> => {
    const response = await fetch(apiEndpoint + `/session-details/${sessionId}?event_id=${eventId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiToken
        }
    })
    const data = await response.json()
    return data
}
export const createSession = async (values: { [key: string]: string | string[] }, eventId: string): Promise<GetSessionResponse> => {
    const response = await fetch(apiEndpoint + `/create-sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiToken
        },
        body: JSON.stringify({ ...values, event_id: eventId })
    })
    const data = await response.json()
    return data
}
