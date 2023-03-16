import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { ChakraProvider, extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import RootLayout from "./routes/RootLayout"
import Home from "./pages/Home"
import LoginFinished from "./pages/LoginFinished"
import Dashboard from "./pages/Dashboard"
import TeamPage from "./pages/TeamPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/loginfinished", element: <LoginFinished /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/:id", element: <TeamPage /> },
    ],
  },
])

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }))

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default App
