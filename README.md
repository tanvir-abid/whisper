# Whisper Chat App

Whisper Chat App is a real-time one-to-one chat application that enables users to connect with friends and have instant conversations. The application provides features for user authentication, creating new connections, and chatting in real-time.

## Features

- **User Authentication:** Users can sign up securely using their email and password. Firebase Authentication is used to manage user authentication.
- **Connections:** Users can search for other users by email or username and send connection requests. The app allows users to manage their connections and view online status.
- **Real-time Chat:** Users can have instant one-to-one conversations with their connections in real-time. The chat interface includes features like message timestamps, message status indicators (seen, delivered), and message sending/receiving animations.
- **Forget Password:** Includes a feature for users to reset their password if forgotten, using their registered email. Firebase provides functionality for password reset.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (ES6)
- **Backend:** Firebase Firestore for real-time database, Firebase Authentication for user authentication
- **UI Design:** Utilizes modern UI/UX principles with Glassmorphism design for a sleek and visually appealing interface.
- **Icons:** Uses Boxicons for stylish icons in the user interface.
- **Deployment:** The application can be deployed to hosting platforms like Firebase Hosting, Netlify, or Vercel.

## Code Structure

### Frontend
- **HTML:** Contains the structure of the application's web pages, including login, registration, chat interface, and modals.
- **CSS:** Defines styles for the UI components, including responsive design for mobile and desktop views.
- **JavaScript:** Implements frontend logic, user interactions, API calls to Firebase, and real-time chat functionality.

### Backend
- **Firebase Firestore:** Stores user data, connection details, and chat messages in a NoSQL database. Utilizes Firestore collections and documents for data organization.
- **Firebase Authentication:** Manages user authentication, including signup, login, password reset, and user sessions.
- **Real-time Communication:** Uses Firestore real-time updates and listeners to enable instant message delivery and chat synchronization across devices.

### Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to store the project.
3. Run the following command to clone the repository:

```bash
git clone https://github.com/your-username/whisper-chat-app.git

## UI

To see the user interface, [click here](https://tanvir-abid.github.io/whisper)


## Future Improvements

- **Group Chat:** Implement group chat functionality to allow multiple users to participate in a chat room.
- **Media Sharing:** Enable users to share images, files, and media in chat conversations.
- **User Profiles:** Enhance user profiles with profile pictures, status updates, and additional user details.
- **Security Features:** Implement security measures like end-to-end encryption for chat messages and user data protection.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
