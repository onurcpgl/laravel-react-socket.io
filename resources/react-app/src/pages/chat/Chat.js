import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import Pusher from "pusher-js";
import Services from "../../services/Services";
function Chat() {
    const [data, setData] = useState([]);
    const [sessionId, setSessionId] = useState(generateUniqueId());

    const [inputValue, setInputValue] = useState();
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        // Initialize Pusher
        const pusher = new Pusher("5c66da6385c2867403b2", {
            cluster: "eu",
        });

        // Subscribe to the channel
        const channel = pusher.subscribe("my-channel");

        // Bind to the event
        channel.bind("my-event", (value) => {
            setData((prevData) => [...prevData, value]);
        });

        // Cleanup on component unmount
        return () => {
            pusher.unsubscribe("my-channel");
        };
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);
    const SendMessage = async () => {
        if (inputValue.length > 0) {
            const result = await Services.sendMessage({
                message: inputValue,
                sessionId: sessionId,
            });
        }
    };

    function generateUniqueId() {
        // Benzersiz kimlik oluşturma mantığınızı buraya ekleyin
        return Math.random().toString(36).substr(2, 9); // Örnek bir rastgele kimlik oluşturma yöntemi
    }
    return (
        <div className="flex flex-col justify-center items-start w-2/4 max-lg:w-3/4 max-sm:w-full max-sm:px-5">
            <div>
                <p className="text-3xl font-mono my-10">Simple Chat App</p>
            </div>
            <div className="border-2 rounded-md h-auto p-5 w-full flex flex-col justify-between">
                <div className="border-2 rounded-lg py-2 px-2 mb-4">
                    {data.length > 0 ? (
                        data?.map((item, i) =>
                            item.sessionId === sessionId ? (
                                <p key={i} className="flex justify-end">
                                    {item.message}
                                </p>
                            ) : (
                                <p key={i} className="flex justify-start">
                                    {item.message}
                                </p>
                            )
                        )
                    ) : (
                        <p className="flex justify-center items-center">
                            Mesaj yok!
                        </p>
                    )}
                </div>
                <div>
                    <div className="mb-2 flex justify-between items-center gap-2">
                        <input
                            type="text"
                            id="default-input"
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div
                            onClick={() => SendMessage()}
                            className="bg-slate-700 w-10 h-10 rounded-full flex justify-center items-center"
                        >
                            <IoIosSend className="text-2xl text-white  cursor-pointer hover:scale-110 hover:text-green-300 duration-100 delay-150" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
