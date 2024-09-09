import React, { useEffect } from 'react';


function update_dimensions(get_color)
{
    const canvas = document.getElementById("canvas");
    const canvas_container = document.getElementById("canvas-container");
    const ctx = canvas.getContext("2d");
    const position_info = canvas_container.getBoundingClientRect();
    ctx.canvas.width = position_info.width;
    ctx.canvas.height = position_info.width / 5;
    
    for (let x = 0; x < ctx.canvas.width; x++)
    {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.strokeStyle = get_color(x / ctx.canvas.width);
        console.log(ctx.strokeStyle);
        ctx.stroke();
    }

}

function Canvas(props)
{
    useEffect(() => update_dimensions(props.get_color), [props.get_color]);
    return (
        <div id="canvas-container">
            <canvas id="canvas">
            </canvas>
        </div>
    );
}

class Pallette extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            a: Array.from({length: 3}, () => Math.random()),
            b: Array.from({length: 3}, () => Math.random()),
            c: Array.from({length: 3}, () => Math.random()),
            d: Array.from({length: 3}, () => Math.random()),
        };
    }

    get_color(x)
    {
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        console.log(a, b, c, d);
        const c_r = a[0] + b[0] * Math.cos(2 * Math.PI * (c[0] * x + d[0]));
        const c_g = a[1] + b[1] * Math.cos(2 * Math.PI * (c[1] * x + d[1]));
        const c_b = a[2] + b[2] * Math.cos(2 * Math.PI * (c[2] * x + d[2]));
        const rgb = `rgb(${255 * c_r} ${255 * c_g} ${255 * c_b})`;
        console.log(x, c_r, c_g, c_b, rgb);
        return (rgb);
    }

    render()
    {
        return (
            <div class="card border-0 p-2">
                <div class="card-footer p-0">
                    <Canvas get_color={(x) => this.get_color(x)}/>
                </div>
            </div>
        );
    }
}

export default Pallette;
