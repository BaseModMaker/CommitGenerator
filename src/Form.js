import React, { useState } from "react";
import { TextField, Button, Chip, MenuItem } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Form.css"; // Import CSS file for additional styling

function Form() {
    const [type, setType] = useState("");
    const [scope, setScope] = useState("");
    const [description, setDescription] = useState("");
    const [footer, setFooter] = useState("None");

    const handleFooterChipClick = (value) => {
        if (footer === value) {
            setFooter("None");
        } else {
            setFooter(value === "None" ? "None" : value);
        }
    };

    const preMessage = `${type}${footer === "BREAKING CHANGE: " ? "!" : ""}${footer === "UNSTABLE VERSION: " ? "?" : ""}${scope ? `(${scope})` : ""}: ${description}${footer === "None" ? "" : "\n\n" + footer}`;

    return (
        <div className="form-container"> {/* Apply styling to form container */}
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
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="form-item">
                    <TextField
                        label="Scope"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        fullWidth
                    />
                </div>

                <div className="form-item">
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>

                <div className="chip-container"> {/* Apply styling to chip container */}
                    {["None", "BREAKING CHANGE: ", "UNSTABLE VERSION: "].map((option) => (
                        <Chip
                        key={option}
                        label={option}
                        clickable
                        color={footer === option ? "primary" : "default"}
                        onClick={() => handleFooterChipClick(option)}
                        className="chip"
                        />
                    ))}
                </div>{/* Apply styling to chips */}
                <div className="form-item">
                    <TextField
                        label="Footer"
                        value={footer === "None" ? "" : footer}
                        onChange={(e) => setFooter(e.target.value)}
                        fullWidth
                        disabled={footer === "None"}
                    />
                </div>
            </form>

            <div>
                <h2>Form Result:</h2>

                <div className="pre-container"> {/* Apply styling to pre container */}
                    <pre className="pre">{preMessage}</pre>
                </div>

                <CopyToClipboard text={preMessage}>
                    <Button variant="outlined" color="primary">
                        Copy Result
                    </Button>
                </CopyToClipboard>
            </div>
        </div>
    );
}

export default Form;
