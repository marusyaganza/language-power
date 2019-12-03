import React from 'react';
import {Button} from "../../components/button/button";
import './home.css';
import {Img} from "../../components/img";

const Home = () => {
    return (
        <main className="content">
            <h1 className="main-heading">Nice Homepage component</h1>
            <Img width={600} height={400} alt="wild cat"/>
            <Button onClick={(e) => console.log('clicked!', e) }>Click to continue</Button>
        </main>
    )
};

export {Home}