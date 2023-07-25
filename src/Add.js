import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { ref, set } from "firebase/database";
import db from "./FbConfig";

export default function Add() {
    const nav = useNavigate();
    const [user, setUser] = useState("");
    const [emno, setEmno] = useState("");
    const [name, setName] = useState("");
    const [emsalary, setEmsalary] = useState("");

    const hName = (event) => {
        setName(event.target.value);
    };
    const hEmno = (event) => {
        setEmno(event.target.value);
    };
    const hEmsalay = (event) => {
        setEmsalary(event.target.value);
    };

    //getting the username and storing it in local storage for later usage

    const saveAs = (event) => {
        event.preventDefault();
        if (emno === "") alert("Employee No cannot be Empty");
        else if (name === "") {
            alert("Name cannot be empty");
        } else if (name.length < 3) {
            alert("Name shud contain atleast 3 letters");
        } else if (emsalary === "") {
            alert("Salary Cannot be Empty");
        } else {
            let data = { emno, name, emsalary };
            let node = emno;
            let r = ref(db, "em/" + node);
            set(r, data);

            alert("Employee Added");
            setEmno("");
            setName("");
            setEmsalary("");
            nav("/home");
        }
    };

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            setUser("Welcome " + un);
        } else {
            nav("/login");
        }
    }, []);

    const de = (event) => {
        event.preventDefault();
        const answer = window.confirm("Are u Sure ❓ ");
        if (answer) {
            const auth = getAuth();
            const user = auth.currentUser;

            deleteUser(user)
                .then(() => {
                    localStorage.clear();
                    nav("/login");
                })
                .catch((err) => alert("Issue " + err));
        }
    };
    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=0.5"
            ></meta>
            <center>
                <NavBar />

                <div id="container6">
                    <h1>Add Employee</h1>
                    <h2> {user} </h2>
                    <form onSubmit={saveAs}>
                        <input
                            type="number"
                            placeholder="Employee Id"
                            onChange={hEmno}
                            value={emno}
                        />
                        <br />
                        <br />
                        <input
                            type="text"
                            placeholder="Enter Name"
                            onChange={hName}
                            value={name}
                        />
                        <br />
                        <br />
                        <input
                            type="number"
                            placeholder="Enter ur salary"
                            onChange={hEmsalay}
                            value={emsalary}
                            id="txt"
                        />
                        <br />
                        <br />
                        <div id="child1">
                            <Link to={"/home"}>
                                <button id="backbutton">Back</button>
                            </Link>
                        </div>
                        <input type="submit" id="homesubbutton" />
                        <br />
                        <br />
                    </form>

                    <div id="child2">
                        <form onSubmit={de}>
                            <input
                                type="submit"
                                value="Del User"
                                id="deleteuser"
                            />
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
