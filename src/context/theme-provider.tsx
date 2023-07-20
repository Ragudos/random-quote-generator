import React from "react";

interface ThemeProviderProps {
  themes: string[];
  defaultTheme: string;
  enabledColorScheme?: boolean;
  children: React.ReactNode;
}

interface ThemeContextInterface {
  theme: string;
  changeTheme: (newTheme: string) => void;
}

const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: "",
  changeTheme: () => {},
});

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

const attribute = "data-theme";

export const ThemeProvider = ({
  themes,
  defaultTheme,
  enabledColorScheme = true,
  children,
}: ThemeProviderProps) => {
  if (!themes.includes(defaultTheme))
    throw new Error(
      "The default theme must be equal to one of the themes provided",
    );
  const [theme, setTheme] = React.useState(defaultTheme);

  React.useEffect(() => {
    const html = document.documentElement,
      storedTheme = localStorage.getItem("theme");
    html.removeAttribute(attribute);

    if (!storedTheme || storedTheme === "system") {
      const mediaQuery = window.matchMedia(
        `prefers-color-sheme: ${defaultTheme}`,
      );

      if (mediaQuery.matches) {
        html.setAttribute(attribute, defaultTheme);
        setTheme("dark");
        if (enabledColorScheme) {
          html.style.colorScheme = defaultTheme;
        }
      } else {
        html.setAttribute(
          attribute,
          themes[Math.floor(Math.random() * themes.length - 1)],
        );
        setTheme(themes[Math.floor(Math.random() * themes.length - 1)]);
        if (enabledColorScheme) {
          html.style.colorScheme =
            themes[Math.floor(Math.random() * themes.length - 1)];
        }
      }
    } else {
      html.setAttribute(attribute, storedTheme);
      setTheme(storedTheme);
      if (enabledColorScheme) {
        html.style.colorScheme = storedTheme;
      }
    }
  }, [theme]);

  React.useEffect(() => {
    const callback = (e: StorageEvent) => {
      setTheme(e.newValue as string);
    };
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  });

  const changeTheme = React.useCallback(
    (newTheme: string) => {
      if (!themes.includes(newTheme))
        throw new Error(
          "The new theme must be equal to one of the themes provided",
        );
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
