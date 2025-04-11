import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalItems: 0,
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (!existingItem) {
        state.items.push({
          ...newItem,
        })
        state.totalItems += 1
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      state.totalItems = state.items.length
    },
    clearWishlist: (state) => {
      state.items = []
      state.totalItems = 0
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
