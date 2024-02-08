import React, { useState } from "react";
import { TextField, Button, Chip, MenuItem, Stack } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify
import "./Form.css"; // Import CSS file for additional styling

function Form() {
    const [type, setType] = useState("");
    const [scope, setScope] = useState("");
    const [description, setDescription] = useState("");
    const [chip, setChip] = useState("None");

    const [darkMode, setDarkMode] = useState(false);

    const handleFooterChipClick = (value) => {
        if (chip === value) {
            setChip("None");
        } else {
            setChip(value === "None" ? "None" : value);
        }
    };

    const preMessage = `${type}${chip[0] === "B" ? "!" : ""}${chip[0] === "U" ? "?" : ""}${scope ? `(${scope})` : ""}: ${description}${chip === "None" ? "" : "\n\n" + chip}`;

    const handleCopy = () => {
        toast.success("Content copied to clipboard!"); // Show success toast
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`form-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="theme-toggle" onClick={toggleDarkMode}>
                {darkMode ? <WbSunnyIcon /> : <Brightness4Icon />}
            </div>
            <h1>Commit Generator</h1>
            <form className="form">
                <div className="form-item">
                    <TextField
                        select
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                    >
                        {["feat", "fix", "build", "chore", "docs", "style", "refactor", "test"].map((option) => (
                            <MenuItem key={option} value={option} >
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="form-item">
                    <TextField
                        inputProps={{ style: { color: darkMode ? "whitesmoke" : "black" } }}
                        label="Scope"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        fullWidth
                    />
                </div>

                <div className="form-item">
                    <TextField
                        inputProps={{ style: { color: darkMode ? "whitesmoke" : "black" } }}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>

                <Stack spacing={1} direction="row" className="chip-stack">
                    {["None", "BREAKING CHANGE", "UNSTABLE VERSION"].map((option) => (
                        <Chip
                            key={option}
                            label={
                                option === "BREAKING CHANGE" ?
                                    <span>{"🚫 "}{option}</span> // "\u274C" is the crossed circle emoji
                                    :
                                    (option === "UNSTABLE VERSION" ?
                                        <span>{"⚠️ "}{option}</span> // "\u274C" is the crossed circle emoji
                                        :
                                        option)
                            }
                            clickable
                            color={chip === option ? "primary" : "default"}
                            onClick={() => handleFooterChipClick(option)}
                            className="chip"
                        />
                    ))}
                </Stack>

                <div className="form-item">
                    <TextField
                        inputProps={{ style: { color: darkMode ? "whitesmoke" : "black" } }}
                        label="Footer"
                        value={
                            chip === "BREAKING CHANGE" ? 
                                "BREAKING CHANGE: " 
                                : 
                                (chip === "UNSTABLE VERSION" ? 
                                    "UNSTABLE VERSION: " 
                                    : 
                                    chip)
                        }
                        onChange={(e) => setChip(e.target.value)}
                        fullWidth
                        disabled={chip === "None"}
                    />
                </div>
            </form>

            <div>
                <h2>Form Result:</h2>

                <div className="pre-container"> {/* Apply styling to pre container */}
                    <pre className="pre">{preMessage}</pre>
                </div>

                <CopyToClipboard text={preMessage}>
                    <Button onClick={handleCopy} variant="outlined" color="primary">
                        Copy Result
                    </Button>
                </CopyToClipboard>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </div>
    );
}

export default Form;
