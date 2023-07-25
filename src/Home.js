import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import db from "./FbConfig";

export default function Home() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            setUser("Welcome " + un);
        } else {
            window.location.href = "/login/";
        }
    }, []);

    useEffect(() => {
        const fetchData = () => {
            const databaseRef = ref(db, "em");
            onValue(databaseRef, (snapshot) => {
                const fetchedData = snapshot.val();
                if (fetchedData) {
                    const dataArray = Object.keys(fetchedData).map((key) => ({
                        ...fetchedData[key],
                        emno: key,
                    }));
                    setData(dataArray);
                }
            });
        };

        fetchData();
    }, []); // Fetch data when the component mounts and on database updates

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
                <NavBar />

                <div id="containerH">
                    <h1> Home </h1>
                    <h1> {user}</h1>
                    <table border={4} style={{ width: "auto" }}>
                        <tr>
                            <th>Employee Id</th>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                        {data.map((item) => (
                            <tr key={item.emno} style={{ textAlign: "center" }}>
                                <td>{item.emno}</td>
                                <td>{item.name}</td>
                                <td>{item.emsalary}</td>
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
