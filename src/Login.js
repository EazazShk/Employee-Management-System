import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/home");
        }
    }, []);
    const nav = useNavigate();
    const [un, setUn] = useState("");
    const [pw1, setPw1] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };
    const hPw1 = (event) => {
        setPw1(event.target.value);
    };

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (un === "") {
            alert("Email Id cannot be empty!");
        } else if (pw1 === "") {
            alert("Password cannot be empty!");
        } else {
            signInWithEmailAndPassword(auth, un, pw1)
                .then((res) => {
                    localStorage.setItem("un", un);
                    nav("/home");
                })
                .catch((err) => alert("Issue " + err));
            setPw1("");
            setUn("");
        }
    };
    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=0.7"
            ></meta>
            <center>
                <NavBar />
                <div id="container2">
                    <h1> Login </h1>
                    <form onSubmit={check}>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            onChange={hUn}
                            value={un}
                        />
                        <br />
                        <br />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            onChange={hPw1}
                            value={pw1}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Login" id="LoginButton" />
                        <br />
                        <br />
                    </form>
                </div>
            </center>
        </>
    );
}
