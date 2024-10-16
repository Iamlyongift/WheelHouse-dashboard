import { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const baseUrl = "https://wheelhouse.onrender.com";
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/product/contact/messages`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        console.log("Fetched data:", data);
        setMessages(data.data || []); // Set the correct data field here
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMessages();
  }, []);
  

  console.log("Messages in render:", messages); // Log messages to check if state updates
  console.log("Loading status:", loading); // Log the loading status

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Messages</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message._id}>
                <td>{message._id}</td>
                <td>{message.name}</td>
                <td>{message.phone}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>{new Date(message.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No messages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
