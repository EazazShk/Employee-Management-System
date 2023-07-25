import { useState, useEffect } from "react";
import { onValue, ref, remove } from "firebase/database";
import db from "./FbConfig";
import { Link } from "react-router-dom";

export default function AdminPage() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            setUser("Welcome Admin " + un);
        } else {
            window.location.href = "/login/";
        }
    }, []);

    useEffect(() => {
        const databaseRef = ref(db, "em");
        onValue(databaseRef, (snapshot) => {
            const fetchedData = snapshot.val();
            if (fetchedData) {
                const dataArray = Object.entries(fetchedData).map(
                    ([key, value]) => ({
                        ...value,
                        emno: key,
                    })
                );
                setData(dataArray);
            }
        });
    }, []); // Fetch data when the component mounts

    const handleDeleteFeedback = (emno) => {
        const feedbackRef = ref(db, `em/${emno}`);
        remove(feedbackRef)
            .then(() => {
                alert("Feedback Deleted Successfully");
            })
            .catch((error) => {
                console.error("Error deleting feedback:", error);
            });
    };

    const lo = (event) => {
        event.preventDefault();
        const ans = window.confirm("Are u sure ❓");
        if (ans) {
            localStorage.clear();
            window.location.href = "/login/";
        }
    };

    return (
        <>
            <center>
                <h2 id="navh1">Employee Management System</h2>
                <div id="container1">
                    <h1> {user}</h1>
                    <table border={4} style={{ width: "auto" }}>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {data.map((item) => (
                            <tr key={item.emno} style={{ textAlign: "center" }}>
                                <td>{item.emno}</td>
                                <td>{item.name}</td>
                                <td>{item.emsalary}</td>
                                <td>
                                    <Link to={`/update/${item.emno}`}>
                                        <button id="updatebutton">
                                            Update
                                        </button>
                                    </Link>
                                </td>

                                <td>
                                    <button
                                        id="deletebutton"
                                        onClick={() => {
                                            if (window.confirm("Are u sure ❓"))
                                                handleDeleteFeedback(item.emno);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <br />

                    <form onSubmit={lo}>
                        <input type="submit" value="Logout" id="logout" />
                    </form>
                </div>
            </center>
        </>
    );
}
