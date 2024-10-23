import { useState } from "react";
import "../css/AdminSendEmail.css"; // Import the CSS file for styling
import backgroundImage from "../assets/images/background.png"; // Default image

const AdminSendEmail = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [imageURL, setImageURL] = useState(backgroundImage); // Default image URL
  const token = localStorage.getItem("token");

  const baseURL = "https://wheelhouse.onrender.com";
  const sendEmail = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/send-email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the admin token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject,
          messageContent: message,
          pictureUrl: imageURL, // Pass the image URL
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send emails");
      }

      const data = await response.json();
      console.log(data);
      alert("Emails sent to all registered users");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails");
    }
  };

  return (
    <div>
      <h2 className="email-header">Send Email to All Registered Users</h2>
      <input
        type="text"
        className="email-input"
        placeholder="Email Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className="email-textarea"
        placeholder="Message Content"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        className="email-input"
        placeholder="Background Image URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)} // Allow the admin to provide an image URL
      />
      <button className="email-button" onClick={sendEmail}>
        Send Emails
      </button>
    </div>
  );
};

export default AdminSendEmail;

// import { useState } from "react";
// import "../css/AdminSendEmail.css"; // Import the CSS file for styling

// const AdminSendEmail = () => {
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const token = localStorage.getItem("token");

//   const baseURL = "http://localhost:2025";

//   const sendEmail = async () => {
//     const formData = new FormData();
//     formData.append("subject", subject);
//     formData.append("messageContent", message);
//     if (image) {
//       formData.append("image", image); // Attach image file to formData
//     }

//     try {
//       const response = await fetch(`${baseURL}/admin/send-email`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the admin token for authentication
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send emails");
//       }

//       const data = await response.json();
//       console.log(data);
//       alert("Emails sent to all registered users");
//     } catch (error) {
//       console.error("Error sending emails:", error);
//       alert("Failed to send emails");
//     }
//   };

//   return (
//     <div className="email-container">
//       <h2 className="email-header">Send Email to All Registered Users</h2>
//       <input
//         type="text"
//         className="email-input"
//         placeholder="Email Subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />
//       <textarea
//         className="email-textarea"
//         placeholder="Message Content"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files?.[0] || null)} // Handle file selection
//       />
//       <button className="email-button" onClick={sendEmail}>
//         Send Emails
//       </button>
//     </div>
//   );
// };

// export default AdminSendEmail;
