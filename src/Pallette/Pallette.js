import React from 'react';
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

class Pallette extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = this.randomState();
        window.onresize = this.onResize.bind(this);
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
        const canvas_container = document.getElementById("canvas-container");
        const position_info = canvas_container.getBoundingClientRect();
        const x = (event.clientX - position_info.x) / position_info.width;
        const new_state = {
            clientX: event.clientX - position_info.x,
            clientY: event.clientY - position_info.y,
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
        function rgbToHex(r, g, b) {
            return "#" + (
                (1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
        }
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        return (rgbToHex(
            Math.max(Math.min(Math.floor(255 * (a[0] + b[0] * Math.cos(2 * Math.PI * (c[0] * x + d[0])))), 255), 0),
            Math.max(Math.min(Math.floor(255 * (a[1] + b[1] * Math.cos(2 * Math.PI * (c[1] * x + d[1])))), 255), 0),
            Math.max(Math.min(Math.floor(255 * (a[2] + b[2] * Math.cos(2 * Math.PI * (c[2] * x + d[2])))), 255), 0)
        ));
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

    SnippetJS()
    {
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        const snippet = `
function myPalette(x)
{
    return ([
        Math.max(Math.min(Math.floor(255 * (${a[0]} + ${b[0]} * Math.cos(2 * Math.PI * (${c[0]} * x + ${d[0]})))), 255), 0),
        Math.max(Math.min(Math.floor(255 * (${a[1]} + ${b[1]} * Math.cos(2 * Math.PI * (${c[1]} * x + ${d[1]})))), 255), 0),
        Math.max(Math.min(Math.floor(255 * (${a[2]} + ${b[2]} * Math.cos(2 * Math.PI * (${c[2]} * x + ${d[2]})))), 255), 0),
    ]);
}`
        return (snippet);
    }

    SnippetPython()
    {
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        const snippet = `
import math

def myPalette(x):
    return [
        max(min(math.floor(255 * (${a[0]} + ${b[0]} * math.cos(2 * math.pi * (${c[0]} * x + ${d[0]})))), 255), 0),
        max(min(math.floor(255 * (${a[1]} + ${b[1]} * math.cos(2 * math.pi * (${c[1]} * x + ${d[1]})))), 255), 0),
        max(min(math.floor(255 * (${a[2]} + ${b[2]} * math.cos(2 * math.pi * (${c[2]} * x + ${d[2]})))), 255), 0),
    ]
`
        return (snippet);
    }

    SnippetGLSL()
    {
        const a = this.state.a;
        const b = this.state.b;
        const c = this.state.c;
        const d = this.state.d;
        const snippet = `
const float PI = 3.1415926535897932384626433832795;

vec3 myPalette(float x)
{
    return vec3(
        ${a[0].toFixed(2)} + ${b[0].toFixed(2)} * cos(2.0 * PI * (${c[0].toFixed(2)} * x + ${d[0].toFixed(2)})),
        ${a[1].toFixed(2)} + ${b[1].toFixed(2)} * cos(2.0 * PI * (${c[1].toFixed(2)} * x + ${d[1].toFixed(2)})),
        ${a[2].toFixed(2)} + ${b[2].toFixed(2)} * cos(2.0 * PI * (${c[2].toFixed(2)} * x + ${d[2].toFixed(2)}))
    );
}
`
        return (snippet);
    }

    renderSnippet()
    {
        return (
            <div className="accordion pt-4" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  JavaScript
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <pre style={{"textAlign": "left"}}>
                        <code className="javascript">
                            {this.SnippetJS()}
                        </code>
                    </pre>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  Python
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <pre style={{"textAlign": "left"}}>
                        <code className="javascript">
                            {this.SnippetPython()}
                        </code>
                    </pre>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  GLSL
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <pre style={{"textAlign": "left"}}>
                        <code className="javascript">
                            {this.SnippetGLSL()}
                        </code>
                    </pre>
                </div>
              </div>
            </div>
          </div>
        );
    }

    renderSample()
    {
        return (
            <div
                className="sample-container"
                style={{
                    display: this.state.showSample ? 'block' : 'none',
                    position: "absolute",
                    left: this.state.clientX ? this.state.clientX - 40 : 0,
                    top: this.state.clientY ? this.state.clientY + 30 : 0,
                }}
            >
                <div className='card p-2'>
                    <div
                        className='card-body p-2'
                        style={{
                            "backgroundColor": this.getColor(this.state.x),
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
                className="btn btn-primary w-100 mt-4"
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
                <table className='mt-4'>
                    <thead>
                        <tr>
                            <th><h1>Red</h1></th>
                            <th><h1>Green</h1></th>
                            <th><h1>Blue</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.renderSlider('a', 0)}</td>
                            <td>{this.renderSlider('a', 1)}</td>
                            <td>{this.renderSlider('a', 2)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSlider('b', 0)}</td>
                            <td>{this.renderSlider('b', 1)}</td>
                            <td>{this.renderSlider('b', 2)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSlider('c', 0)}</td>
                            <td>{this.renderSlider('c', 1)}</td>
                            <td>{this.renderSlider('c', 2)}</td>
                        </tr>
                        <tr>
                            <td>{this.renderSlider('d', 0)}</td>
                            <td>{this.renderSlider('d', 1)}</td>
                            <td>{this.renderSlider('d', 2)}</td>
                        </tr>
                    </tbody>
                </table>
                {this.renderButton("Random", this.randomState.bind(this))}
                {this.renderSample()}
                {this.renderSnippet()}
            </div>
        );
    }
}

export default Pallette;
