const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    currentColor: '#000000',
    dots: [],
    lines: [],
    isDrawing: false,
    startPoint: null,
}

const PaletteSlice = createSlice({
    name: 'palette',
    initialState: initialState,
    reducers: {
        addDots: (state, action) => {
            state.dots.push(action.payload);
        },

        getLines: (state, action) => {
            if (action.payload.type === 'start') {
                state.isDrawing = true;
                state.startPoint = action.payload.point;
            } else if (action.payload.type === 'draw' && state.isDrawing) {
                state.lines.push({ start: state.startPoint, end: action.payload.point, color: state.currentColor });
                state.startPoint = action.payload.point;
            } else if (action.payload.type === 'end') {
                state.isDrawing = false;
                state.startPoint = null;
            }
        },

        setColor: (state, action) => {
            state.currentColor = action.payload;
        }
    }
});

export const { addDots, getLines, setColor } = PaletteSlice.actions;
export default PaletteSlice.reducer;