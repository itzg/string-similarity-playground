import './App.css';
import {useEffect, useState} from "react";
import {dice, splitByShingle, splitByWord} from "./algos";

function Input({value, setValue}) {
    return (
        <div>
            <input value={value} onChange={event => setValue(event.target.value)}/>
        </div>
    )
}

function App() {
    const [left, setLeft] = useState("apple");
    const [leftTokens, setLeftTokens] = useState([]);
    const [right, setRight] = useState("pineapple");
    const [rightTokens, setRightTokens] = useState([]);
    const [shingleSize, setShingleSize] = useState(3);
    const [result, setResult] = useState({});

    useEffect(() => {
        const normalLeft = left.toLowerCase();
        const normalRight = right.toLowerCase();

        setLeftTokens(shingleSize > 0 ? splitByShingle(normalLeft, shingleSize) : splitByWord(normalLeft));
        setRightTokens(shingleSize > 0 ? splitByShingle(normalRight, shingleSize) : splitByWord(normalRight));
    }, [left, right, shingleSize]);

    useEffect(() => {
        setResult(dice(leftTokens, rightTokens));
    }, [leftTokens, rightTokens]);

    return (
        <div className="App">
            <div>
                <h2>Inputs</h2>
                <div className="Inputs">
                    <div className="InputGroup">
                        <Input value={left} setValue={setLeft}/>
                        {JSON.stringify(leftTokens)}
                    </div>
                    <div className="InputGroup">
                        <Input value={right} setValue={setRight}/>
                        {JSON.stringify(rightTokens)}
                    </div>
                </div>
            </div>
            <div>
                <h2>Config</h2>
                <div>
                    <label htmlFor="shingle-size">Shingle Size:</label>
                    <input id="shingle-size" type="range" min={0} max={10}
                           value={shingleSize} onChange={event => setShingleSize(event.target.value)}/>
                    {shingleSize > 0 ? shingleSize : "words"}
                </div>
            </div>
            <div>
                <h2>Output</h2>
                <div className="Output">
                    <div>
                        <h3>Intersection</h3>
                        {JSON.stringify(result.intersection)}
                    </div>
                    <div><h3>Score</h3>
                        {result.score}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
