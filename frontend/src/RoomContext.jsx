import { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export function RoomProvider({ children }) {

    
    const [room, setRoomState] = useState(() => {
        const savedRoom = localStorage.getItem("room");
        return savedRoom ? JSON.parse(savedRoom) : null;
    });

    const setRoom = (room) => {
        setRoomState(room);

        if (room) {
            localStorage.setItem("room", JSON.stringify(room));
        } else {
            localStorage.removeItem("room");
        }
    };

    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
}

export function useRoom() {
    return useContext(RoomContext);
}