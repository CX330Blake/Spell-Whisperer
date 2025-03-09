import { useTheme } from "next-themes";

function ThemeChecker() {
    const { theme, resolvedTheme } = useTheme();
    return (
        <p>
            Theme：{theme} <br />
            Resolved: {resolvedTheme}
        </p>
    );
}

export default ThemeChecker;
