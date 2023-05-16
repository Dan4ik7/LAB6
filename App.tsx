import React, { useState, useEffect } from "react";

const UserInitial = [
    { username: "Daniel", password: "Danielarenota10" },
    { username: "Miron", password: "Mironarenota10" },
    { username: "Ion", password: "user" },
];

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [EsteLogat, setEsteLogat] = useState(false);
    const [users, SetareUser] = useState(UserInitial);

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            SetareUser([...users, ...JSON.parse(storedUsers)]);
        }
    }, [users]);

    const handleLogin = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const foundUser = users.find(
            (user) => user.username === username && user.password === password
        );
        if (foundUser) {
            setEsteLogat(true);
            localStorage.setItem("EsteLogat", "true");
            localStorage.setItem("user", JSON.stringify(foundUser));
            alert("Bine ai venit, " + username + "!");
        } else {
            alert("Login sau parola incorecta");
        }
    };


    const handleLogout = () => {
        setEsteLogat(false);
        localStorage.setItem("EsteLogat", "false");
        alert("Mai reveniti!, " + username + "!");
    };

    const renderLoginForm = () => {
        return (

            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Autentificare</button>
            </form>
        );
    };

    const renderLogoutButton = () => {
        const storedUser = localStorage.getItem("user");
        const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
        return (
            <div>
                {loggedInUser && <p>User : {loggedInUser.username}</p>}
                <button onClick={handleLogout}>Ieșire</button>
            </div>
        );
    };


    return <div>{EsteLogat ? renderLogoutButton() : renderLoginForm()}</div>;
};

export default App;
