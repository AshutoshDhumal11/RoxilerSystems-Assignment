const { createContext } = require("react");

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            authAPI.getMe(token).then(response => {
                setUser(response.data.user);
                setLoading(false);
            }).catch(() => {
                localStorage.removeItem("token");
                setLoading(false);
            })
        } else {
            setLoading(false)
        }
    }, []);

    const login = (user, token) => {
        localStorage.setItem("token", token);
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const value = {
        user, login, logout, loading
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}