'use client'
import { useEffect, useState } from "react";
import { runCommand } from "../hooks/runCommand";

const CommandComponent = () => {
    const [output, setOutput] = useState('');

    useEffect(() => {
        const fetchCommandoutput =async () => {
            const result = await runCommand();
            setOutput(result);
        };
        fetchCommandoutput();
    }, []);
    return <pre>{output}</pre>
}

export default CommandComponent