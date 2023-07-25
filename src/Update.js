import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import db from "./FbConfig";

export default function Update() {
    const nav = useNavigate();
    const { emno } = useParams();

    const [name, setName] = useState("");
    const [emsalary, setEmSalary] = useState(""); // Initialize with an empty string

    useEffect(() => {
        const fetchData = () => {
            if (emno) {
                const dbRef = ref(db, `em/${emno}`);
                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const { name: employeeName, emsalary: employeeSalary } =
                            data;
                        setName(employeeName);
                        setEmSalary(employeeSalary); // Set the initial salary value fetched from Firebase
                    }
                });
            }
        };

        fetchData();
    }, [emno]);

    // Function to update data in Firebase Realtime Database
    const updateData = () => {
        if (emno) {
            const data = { name, emsalary };
            const dbRef = ref(db, `em/${emno}`);

            set(dbRef, data)
                .then(() => {
                    alert("Data updated successfully.");
                    // Reload the page after successful update to display the updated data
                    nav("/adminpage");
                })
                .catch((error) => {
                    alert("Error updating data:", error);
                });
        }
    };

    return (
        <>
            <center>
                <div id="containerUpd">
                    <h1>Update Employee</h1>
                    <input
                        type="number"
                        placeholder="Employee Number"
                        value={emno}
                        readOnly // Make the input field read-only
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="number"
                        placeholder="Employee Salary"
                        value={emsalary}
                        onChange={(e) => setEmSalary(e.target.value)}
                    />
                    <br />
                    <br />
                    <Link to={"/adminpage"}>
                        <button id="backbutton">Back</button>
                    </Link>
                    &nbsp;
                    <button onClick={updateData} id="updatebutton">
                        Update
                    </button>
                </div>
            </center>
        </>
    );
}
