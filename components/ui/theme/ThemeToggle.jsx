"use client";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const stored = localStorage.getItem("theme") || "dark";
        setTheme(stored);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <button className="btn-main btn-light mt-3" onClick={toggleTheme}>
            {theme === "dark" ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>
    );
};

export default ThemeToggle;