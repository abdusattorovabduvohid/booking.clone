import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";

export interface SearchState {
  destination: string;
  checkIn: string; // ISO string to be serializable
  checkOut: string; // ISO string to be serializable
  adults: number;
  children: number;
  childrenAges: number[];
  rooms: number;
  travelingForWork: boolean;
  withPets: boolean;

  showDestDropdown: boolean;
  showDatePicker: boolean;
  showGuestPicker: boolean;
}

const initialState: SearchState = {
  destination: "",
  checkIn: addDays(new Date(), 6).toISOString(),
  checkOut: addDays(new Date(), 35).toISOString(),
  adults: 3,
  children: 1,
  childrenAges: [7],
  rooms: 1,
  travelingForWork: false,
  withPets: false,

  showDestDropdown: false,
  showDatePicker: false,
  showGuestPicker: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDestination(state, action: PayloadAction<string>) {
      state.destination = action.payload;
    },
    setCheckIn(state, action: PayloadAction<string>) {
      state.checkIn = action.payload;
    },
    setCheckOut(state, action: PayloadAction<string>) {
      state.checkOut = action.payload;
    },
    setAdults(state, action: PayloadAction<number>) {
      state.adults = Math.max(1, action.payload);
    },
    setChildren(state, action: PayloadAction<number>) {
      const newCount = action.payload;
      if (newCount > state.children) {
        state.childrenAges.push(0);
      } else {
        state.childrenAges = state.childrenAges.slice(0, Math.max(0, newCount));
      }
      state.children = Math.max(0, newCount);
    },
    setChildAge(state, action: PayloadAction<{ index: number; age: number }>) {
      if (state.childrenAges[action.payload.index] !== undefined) {
        state.childrenAges[action.payload.index] = action.payload.age;
      }
    },
    setRooms(state, action: PayloadAction<number>) {
      state.rooms = Math.max(1, action.payload);
    },
    setTravelingForWork(state, action: PayloadAction<boolean>) {
      state.travelingForWork = action.payload;
    },
    setWithPets(state, action: PayloadAction<boolean>) {
      state.withPets = action.payload;
    },
    openDestDropdown(state) {
      state.showDestDropdown = true;
      state.showDatePicker = false;
      state.showGuestPicker = false;
    },
    closeDestDropdown(state) {
      state.showDestDropdown = false;
    },
    openDatePicker(state) {
      state.showDatePicker = true;
      state.showDestDropdown = false;
      state.showGuestPicker = false;
    },
    closeDatePicker(state) {
      state.showDatePicker = false;
    },
    openGuestPicker(state) {
      state.showGuestPicker = true;
      state.showDestDropdown = false;
      state.showDatePicker = false;
    },
    closeGuestPicker(state) {
      state.showGuestPicker = false;
    },
    closeAll(state) {
      state.showDestDropdown = false;
      state.showDatePicker = false;
      state.showGuestPicker = false;
    },
  },
});

export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  setChildAge,
  setRooms,
  setTravelingForWork,
  setWithPets,
  openDestDropdown,
  closeDestDropdown,
  openDatePicker,
  closeDatePicker,
  openGuestPicker,
  closeGuestPicker,
  closeAll,
} = searchSlice.actions;

export default searchSlice.reducer;
