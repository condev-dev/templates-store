"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSpotify } from "react-icons/fa";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const stored = localStorage.getItem("theme") || "dark";
        setTheme(stored);
        if (stored === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }, []);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    };

    return (
        <div className="w-100 d-flex align-items-center justify-content-between mt-3">
            <small style={{ color: "var(--text-light)", fontSize: "13px" }}>تم سایت:</small>

            <div 
                className="d-flex align-items-center p-1 rounded-pill"
                style={{ 
                    backgroundColor: "var(--bg-main)", 
                    border: "1px solid var(--border-color)",
                    gap: "4px"
                }}
            >
                <button
                    type="button"
                    onClick={() => handleThemeChange("dark")}
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: theme === "dark" ? "#6366f1" : "transparent",
                        color: theme === "dark" ? "#ffffff" : "var(--text-light)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}
                    title="تم اصلی"
                >
                    <FaMoon size={15} />
                </button>

                <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: theme === "light" ? "#1db954" : "transparent",
                        color: theme === "light" ? "#000000" : "var(--text-light)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                    }}
                    title="تم اسپاتیفای"
                >
                    <FaSpotify size={16} />
                </button>
            </div>
        </div>
    );
};

export default ThemeToggle;