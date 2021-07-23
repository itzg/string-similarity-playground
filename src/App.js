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

function Tokens({tokens, intersection}) {
    function tokenClass(intersects) {
        return intersects ? "Token Intersected" : "Token";
    }

    return tokens ? (
        <div className="Tokens">
            {
                tokens.map(token => <span className={tokenClass(intersection && intersection.includes(token))}>{token}</span>)
            }
        </div>
    ) : <></>;
}

function getParam(name, defaultValue) {
    var params = new URLSearchParams(window.location.search);
    if (params.has(name)) {
        return params.get(name);
    } else {
        return defaultValue;
    }
}

function ResultsLink({left, right, shingleSize}) {
    var url = new URL(window.location);
    url.searchParams.set("left", left);
    url.searchParams.set("right", right);
    url.searchParams.set("shingleSize", shingleSize);

    return (
        <div className="ResultsLink">
            <a href={url.toString()}>Link to these results</a>
        </div>
    )
}

function ExternalLink({href,children}) {
    return <a href={href} target="_blank" rel="noreferrer">{children}</a>

}

function App() {
    const [left, setLeft] = useState(getParam("left", "apple"));
    const [leftTokens, setLeftTokens] = useState([]);
    const [right, setRight] = useState(getParam("right", "happen"));
    const [rightTokens, setRightTokens] = useState([]);
    const [shingleSize, setShingleSize] = useState(getParam("shingleSize", 3));
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
            <header>
                <h1>
                    String similarity playground <small className="block">using Sørensen–Dice coefficient</small>
                </h1>
                <ExternalLink href="https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient">More information about this algorithm</ExternalLink>
            </header>
            <main>
                <div>
                    <h2>Inputs</h2>
                    <div className="Inputs">
                        <div className="InputGroup">
                            <Input value={left} setValue={setLeft}/>
                            <Tokens tokens={leftTokens} intersection={result.intersection}/>
                        </div>
                        <div className="InputGroup">
                            <Input value={right} setValue={setRight}/>
                            <Tokens tokens={rightTokens} intersection={result.intersection}/>
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
                    <h2>Similarity Score</h2>
                    <div className="Output">
                            {result.score}
                    </div>
                    <ResultsLink left={left} right={right} shingleSize={shingleSize}/>
                </div>
            </main>
            <footer>
                <ExternalLink href="https://github.com/itzg/string-similarity-playground">
                    <img src="https://img.shields.io/github/stars/itzg/string-similarity-playground?style=social" alt="Github Repo Stars"/>
                </ExternalLink>
            </footer>
        </div>
    );
}

export default App;
