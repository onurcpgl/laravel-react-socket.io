import axiosClient from "../utils/axiosClient";

const sendMessage = async (value) => {
    const result = await axiosClient.post(`send-message`, value);
    return result.data;
};

const exportFunction = {
    sendMessage,
};

export default exportFunction;
