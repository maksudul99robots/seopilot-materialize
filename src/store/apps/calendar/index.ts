// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { LoginRegistrationAPI } from 'src/services/API'

// ** Types
import { CalendarFiltersType, AddEventType, EventType } from 'src/types/apps/calendarTypes'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars: CalendarFiltersType[] | any) => {
  let res = await LoginRegistrationAPI.getSchadules({})

  // let folders = await LoginRegistrationAPI.getFolders({});
  // let folder: any[] = []
  // folders.data.map(async (f: any, i: number) => {
  //   folder.push(f.name)
  //   if (i == folders.data.length - 1) {
  //     await dispatch(fetchEvents(folder))
  //   }
  // })

  return res.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event: AddEventType, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })
  // await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))
  // console.log("event:", response.data.event)
  let folders = await LoginRegistrationAPI.getFolders({});
  let folder: any[] = []
  folders.data.map(async (f: any, i: number) => {
    folder.push(f.name)
    if (i == folders.data.length - 1) {
      await dispatch(fetchEvents(folder))
    }
  })
  return response.data.event
})

// ** Update Event
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event: EventType, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })
  let folders = await LoginRegistrationAPI.getFolders({});
  let folder: any[] = []
  folders.data.map(async (f: any, i: number) => {
    folder.push(f.name)
    if (i == folders.data.length - 1) {
      await dispatch(fetchEvents(folder))
    }
  })


  return response.data.event
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id: number | string, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })
  let folders = await LoginRegistrationAPI.getFolders({});
  let folder: any[] = []
  folders.data.map(async (f: any, i: number) => {
    folder.push(f.name)
    if (i == folders.data.length - 1) {
      await dispatch(fetchEvents(folder))
    }
  })

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      // console.log("action.payload?._def:", action.payload)
      state.selectedEvent = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})
export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer
