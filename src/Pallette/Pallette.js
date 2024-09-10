import React from 'react';

class Pallette extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = this.randomState();
        window.onResize = this.onResize.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        this.drawGradient();
    }

    componentDidMount()
    {
        this.onResize();
    }

    onResize()
    {
        const canvas = document.getElementById("canvas");
        const canvas_container = document.getElementById("canvas-container");
        const ctx = canvas.getContext("2d");
        const position_info = canvas_container.getBoundingClientRect();
        ctx.canvas.width = position_info.width;
        ctx.canvas.height = position_info.width / 5;
        this.drawGradient();
    }

    onMouseEnter(event)
    {
        const new_state = {};
        new_state["showSample"] = true;
        this.setState(new_state);
    }

    onMouseLeave(event)
    {
        const new_state = {};
        new_state["showSample"] = false;
        this.setState(new_state);
    }

    onMouseMove(event)
    {
        const canvas = document.getElementById("canvas");
        const canvas_container = document.getElementById("canvas-container");
        const ctx = canvas.getContext("2d");
        const position_info = canvas_container.getBoundingClientRect();
        const x = (event.clientX - position_info.x) / position_info.width;
        const color = this.getColor(x);
        const new_state = {
            clientX: event.clientX - position_info.x - 30,
            clientY: event.clientY - position_info.y + 30,
            x: x
        }
        this.setState(new_state);
    }

    onClick()
    {
        if (this.state.showSample)
        {
            const color = this.getColor(this.state.x);
            navigator.clipboard.writeText(color);
        }
    }

    randomState()
    {
        return {
            a: Array.from({length: 3}, () => Number(Math.random().toFixed(1))),
            b: Array.from({length: 3}, () => Number(Math.random().toFixed(1))),
            c: Array.from({length: 3}, () => Number(Math.random().toFixed(1))),
            d: Array.from({length: 3}, () => Number(Math.random().toFixed(1))),
        };
    }

    drawGradient()
    {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        for (let x = 0; x < ctx.canvas.width; x++)
        {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
            ctx.strokeStyle = this.getColor(x / ctx.canvas.width);
            for (let n = 0; n < 6; n++)
                ctx.stroke();
        }
    }

    getColor(x)
    {
        function colorValue(c)
        {
            if (c < 0)
                return (0);
            if (c > 255)
                return (255);
            return (Math.floor(c));
        }
        function rgbToHex(r, g, b) {
            r = colorValue(r);
            g = colorValue(g);
            b = colorValue(b);
            return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
        }
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        const c_r = a[0] + b[0] * Math.cos(2 * Math.PI * (c[0] * x + d[0]));
        const c_g = a[1] + b[1] * Math.cos(2 * Math.PI * (c[1] * x + d[1]));
        const c_b = a[2] + b[2] * Math.cos(2 * Math.PI * (c[2] * x + d[2]));
        return (rgbToHex(255 * c_r, 255 * c_g, 255 * c_b));
    }

    setParameter(parameter, index, event)
    {
        const value = event?.target?.value;
        var param = this.state[parameter].slice();
        param[index] = parseFloat(value);
        const new_state = {};
        new_state[parameter] = param;
        this.setState(new_state);
    }

    renderSample()
    {
        return (
            <div
                className="sample-container"
                style={{
                    display: this.state.showSample ? 'block' : 'none',
                    position: "absolute",
                    left: this.state.clientX,
                    top: this.state.clientY,
                }}
            >
                <div className='card p-2'>
                    <div
                        className='card-body p-2'
                        style={{
                            "background-color": this.getColor(this.state.x),
                            "height": "50px",
                            "width": "70px",
                        }}
                    >
                    </div>
                    <p className="pt-2 m-0"> {this.getColor(this.state.x)} </p>
                </div>
                
            </div>
        );
    }

    renderCanvas()
    {
        return (
            <div id="canvas-container">
                <canvas
                    id="canvas"
                    onMouseEnter={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onMouseMove={this.onMouseMove.bind(this)}
                    onClick={this.onClick.bind(this)}
                >
                </canvas>
            </div>
        );
    }

    renderSlider(parameter, index)
    {
        return (
            <div className="mx-2">
            <p className='mb-0'>{this.state[parameter][index]}</p>
            <input
                type="range"
                className="form-range"
                id={parameter + index}
                value={this.state[parameter][index]}
                onChange={
                    (event) => this.setParameter(parameter, index, event)
                }
                step="0.05"
                min="-3"
                max="3"
            ></input>
            </div>
        );
    }

    renderButton(name, stateFunction)
    {
        return (
            <button
                className="btn btn-primary w-100"
                onClick={() => this.setState(stateFunction())}
            >
                {name}
            </button>
        );
    }

    render()
    {
        return (
            <div className="card border-0 p-2">
                {this.renderCanvas()}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Red</th>
                            <th>Green</th>
                            <th>Blue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Offset</td>
                            <td>{this.renderSlider('a', 0)}</td>
                            <td>{this.renderSlider('a', 1)}</td>
                            <td>{this.renderSlider('a', 2)}</td>
                        </tr>
                        <tr>
                            <td>Amplitude</td>
                            <td>{this.renderSlider('b', 0)}</td>
                            <td>{this.renderSlider('b', 1)}</td>
                            <td>{this.renderSlider('b', 2)}</td>
                        </tr>
                        <tr>
                            <td>Frequency</td>
                            <td>{this.renderSlider('c', 0)}</td>
                            <td>{this.renderSlider('c', 1)}</td>
                            <td>{this.renderSlider('c', 2)}</td>
                        </tr>
                        <tr>
                            <td>Phase</td>
                            <td>{this.renderSlider('d', 0)}</td>
                            <td>{this.renderSlider('d', 1)}</td>
                            <td>{this.renderSlider('d', 2)}</td>
                        </tr>
                    </tbody>
                </table>
                {this.renderButton("Random", this.randomState.bind(this))}
                {this.renderSample()}
            </div>
        );
    }
}

export default Pallette;
