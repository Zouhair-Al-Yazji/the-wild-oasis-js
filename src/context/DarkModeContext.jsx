import { createContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useContext } from 'react';
import { useEffect } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia('(prefers-color-schema: dark)').matches,
		'isDarkMode'
	);

	function toggleDarkMode() {
		setIsDarkMode(isDark => !isDark);
	}

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.remove('light-mode');
				document.documentElement.classList.add('dark-mode');
			} else {
				document.documentElement.classList.add('light-mode');
				document.documentElement.classList.remove('dark-mode');
			}
		},
		[isDarkMode]
	);

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error('DarkModeContext was used outside of darkModeProvider');
	}
	return context;
}

export { DarkModeProvider, useDarkMode };
