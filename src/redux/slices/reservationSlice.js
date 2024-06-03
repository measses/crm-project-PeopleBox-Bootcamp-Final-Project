import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/reservation";

export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async () => {
    const response = await axios.get(`${API_URL}/reservations.php`);
    return response.data;
  }
);

export const addReservation = createAsyncThunk(
  "reservations/addReservation",
  async (reservation) => {
    const response = await axios.post(
      `${API_URL}/create_reservation.php`,
      reservation,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const updateReservation = createAsyncThunk(
  "reservations/updateReservation",
  async (reservation) => {
    const response = await axios.put(
      `${API_URL}/update_reservation.php`,
      reservation,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async (id) => {
    const response = await axios.delete(`${API_URL}/delete_reservation.php`, {
      data: { id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return id;
  }
);

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reservations = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.reservations.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(
          (reservation) => reservation.id === action.payload.id
        );
        if (index !== -1) {
          state.reservations[index] = action.payload;
        }
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        );
      });
  },
});

export default reservationsSlice.reducer;
