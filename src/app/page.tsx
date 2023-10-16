"use client"
import SessionsTable from "@/components/SessionsTable"
import Button from "@/components/UI/button"
import PageBar from "@/components/UI/pageBar"
import { getSessions } from "@/utils/api"
import { defaultEventId } from "@/utils/constants"
import { Session } from "@/utils/types"
import Image from "next/image"
import { Dispatch, useEffect, useReducer } from "react"
import memoize from "lodash/memoize"
import Pagination from "@/components/Pagination"

const OFFSET = 10

type State = {
  data: Session[]
  isLoading: boolean
  error?: string,
  pages: number
  nextPage: number | null
  prevPage: number | null
  currentPage: number
  count: number
}

type Action =
  | { type: 'request' }
  | {
    type: 'success', results: {
      info: {
        pages: number
        count: number
        nextPage: number | null
        prevPage: number | null
        currentPage: number
      }
      results: Session[]
    }
  }
  | { type: 'failure', error: string }
  | { type: "goToPage", page: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "goToPage": {
      if (action.page === state.currentPage || action.page > state.pages || action.page < 1) {
        return state
      }
      return {
        ...state,
        prevPage: action.page === 1 ? null : action.page - 1,
        nextPage: action.page === state.pages ? null : action.page + 1,
        currentPage: action.page
      }
    }
    case "request": {
      return { ...state, isLoading: true }
    };

    case "success": {
      return { ...state, isLoading: false, ...action.results.info, data: action.results.results }
    };

    case "failure": {
      return { ...state, isLoading: false, error: action.error }
    };

    default: {
      throw Error("Unknown Action")
    }
  }
}


const useLoadData = (dispatch: Dispatch<Action>, page: number) => {
  const memoizedGetSessions = memoize(getSessions)
  useEffect(() => {
    (async function () {
      dispatch({ type: "request" })
      try {
        const data = await memoizedGetSessions(page, defaultEventId, 10)
        if (data.sessions) {
          const currentPage = data.is_last_offset ? Math.ceil(data.count / OFFSET) : (data.number / 10)
          dispatch({
            type: "success", results: {
              info: {
                currentPage: currentPage,
                pages: Math.ceil(data.count / OFFSET) || 1,
                count: data.count,
                nextPage: data.is_last_offset ? null : currentPage + 1,
                prevPage: currentPage === 1 ? null : currentPage - 1
              },
              results: data.sessions
            }
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({ "type": "failure", error: "Something went wrong" })
      }
    })()
  }, [page])
}


const initialState: State = { isLoading: true, data: [], pages: 1, nextPage: null, prevPage: null, count: 0, currentPage: 1 }


export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data, isLoading, error } = state;
  const { nextPage, prevPage, currentPage, pages, count } = state
  useLoadData(dispatch, state.currentPage)
  const goNext = () => {
    dispatch({ type: "goToPage", page: state.currentPage + 1 })
  }

  const goPrev = () => {
    dispatch({ type: "goToPage", page: state.currentPage - 1 })

  }

  const goTo = (page: number) => {
    dispatch({ type: "goToPage", page })
  }

  return (
    <div className="page-content overflow-hidden grow h-full flex flex-col bg-gray-1000 px-4">
      <PageBar title="All Sessions" backButton backButtonText="Events">
        <Button href="/sessions/new" intent={"primary"}>
          <div className="flex items-center gap-x-2">
            <Image className="w-5 h-5" src={"/assets/images/plus-dark.svg"} alt="plus sign" width={24} height={24} />
            New Session
          </div>
        </Button>
      </PageBar>
      <div className="flex flex-col h-full overflow-y-auto w-full">
        <SessionsTable sessions={data}  {...{ isLoading, error }} />
        <Pagination {...{ isLoading, currentCount: data.length, nextPage, prevPage, currentPage, pages, count, goNext, goPrev, goTo }} />
      </div>
    </div>
  )
}
