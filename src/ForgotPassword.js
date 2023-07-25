import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/home");
        }
    }, []);
    const nav = useNavigate();
    const [un, setUn] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (un === "") {
            alert("Enter email id to reset password");
        } else {
            sendPasswordResetEmail(auth, un)
                .then((res) => {
                    alert("Check ur gmail ");
                    nav("/login");
                })
                .catch((err) => alert("Issue " + err));
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
                <div id="container5">
                    <h1> Forgot Password </h1>
                    <form onSubmit={check}>
                        <input
                            type="text"
                            placeholder="Enter Reg Email"
                            onChange={hUn}
                            value={un}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Reset" id="resetbutton" />
                        <br />
                        <br />
                    </form>
                </div>
            </center>
        </>
    );
}
