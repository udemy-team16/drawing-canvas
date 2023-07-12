import { configureStore } from '@reduxjs/toolkit';
import PaletteStore from 'redux/PaletteStore';

const store = configureStore({
    reducer: {
        PaletteStore: PaletteStore
    },
});

export default store;