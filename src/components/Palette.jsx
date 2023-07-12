import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDots, getLines, setColor } from 'redux/PaletteStore';

const Palette = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const currentColor = useSelector(state => state.PaletteStore.currentColor);
    const dots = useSelector(state => state.PaletteStore.dots);
    const lines = useSelector(state => state.PaletteStore.lines);
    const isDrawing = useSelector(state => state.PaletteStore.isDrawing);

    const getCoordinates = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return { x, y };
    };

    const handleClick = (e) => {
        if (isDrawing) return;
        const { x, y } = getCoordinates(e);
        dispatch(addDots({ x, y, color: currentColor }));
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 점 그리기
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let dot of dots) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = dot.color;
            ctx.fill();
        }

        // 선 그리기
        for (let line of lines) {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.strokeStyle = line.color;
            ctx.stroke();
        }
    }, [dots, lines]);

    // 선 시작
    const handleMouseDown = (e) => {
        const { x, y } = getCoordinates(e);
        dispatch(addDots({ x, y, color: currentColor }));
        dispatch(getLines({ type: 'start', point: { x, y } }));
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const { x, y } = getCoordinates(e);
        dispatch(getLines({ type: 'draw', point: { x, y } }));
    };

    // 선 종료
    const handleMouseUp = () => {
        dispatch(getLines({ type: 'end' }));
    };

    return (
        <div>
            <button onClick={() => document.getElementById('colorPicker').click()}>
                Select color
            </button>
            <input 
                type="color" 
                id="colorPicker"
                value={currentColor}
                onChange={(e) => dispatch(setColor(e.target.value))}
                style={{display: 'none'}}
            />
            <h1>현재 색깔: {currentColor}</h1>
            <canvas 
                ref={canvasRef}
                onClick={handleClick}
                onMouseDown={handleMouseDown} 
                onMouseMove={handleMouseMove} 
                onMouseUp={handleMouseUp}
                width={400}
                height={400}
                style={{ border: '1px solid black' }}
            />
        </div>
    );
};

export default Palette;