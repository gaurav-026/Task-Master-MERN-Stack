//create context

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();


//Fetch All Data From Database


function AppContextProvider({ children }) {

    const [data, setData] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [loading, setLoading] = useState(false);



    //Fetch All the DAta from the database
    const fetchTasks = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/v1/getAllTasks`,
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const result = await response.json();
        setData(result.data.tasks);
        setCompletedTask(result.data.completedtasks);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    // console.log("Data Tasks are:", data);
    // console.log("Completed Tasks are: ", completedTask);



    return <AppContext.Provider value={{ data, setData, completedTask, setCompletedTask }}>
        {children}
    </AppContext.Provider>
};

export default AppContextProvider;