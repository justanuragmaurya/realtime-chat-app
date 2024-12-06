
# Baatcheet - Real-time Chat Application

Baatcheet is a modern real-time chat application that enables users to create or join chat rooms and communicate instantly with other participants. The application features a clean, responsive interface and supports real-time message delivery using WebSocket technology.

## Features

### Room Management
- Create new rooms with auto-generated unique room IDs
- Join existing rooms using room IDs
- Copy room IDs to clipboard for easy sharing
- Real-time user connection tracking

### Chat Features
- Real-time message delivery
- User-friendly message interface with distinct styling for sent/received messages
- Support for multiple users in the same room
- Username display for each message
- Enter key support for sending messages

### UI/UX
- Clean, modern interface with dark theme
- Responsive design that works on mobile and desktop
- Toast notifications for important actions
- Smooth transitions and hover effects
- Scrollable message history

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe programming
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and development server
- **React Toastify** - Toast notifications
- **Lucide React** - Icon components
- **WebSocket** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe programming
- **ws** - WebSocket server implementation
- **Express** - Web server framework

## Architecture

### Frontend Architecture
The frontend is built as a single-page application (SPA) with React. Key components include:
- Connection management with WebSocket
- State management using React hooks
- Responsive UI components
- Real-time message handling and display

### Backend Architecture
The backend implements a WebSocket server that handles:
- User connections and disconnections
- Room management
- Message broadcasting to room participants
- User count tracking

### Communication Protocol
The application uses a simple message protocol over WebSocket:

#### Join Room Message
```json
{
  "type": "join",
  "payload": {
    "roomid": "ROOM_ID"
  }
}
```

#### Chat Message
```json
{
  "type": "chat",
  "payload": {
    "name": "USERNAME",
    "message": "MESSAGE_CONTENT"
  }
}
```

## Security Features
- Secure WebSocket connections (WSS)
- Input validation
- Room isolation (messages only broadcast to users in the same room)

## Performance Considerations
- Efficient message broadcasting
- Optimized re-renders using React
- Lightweight message protocol
- Responsive design for all device sizes

## Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- WebSocket server configured for production use

## Future Enhancements
- User authentication
- Message persistence
- Typing indicators
- Read receipts
- File sharing capabilities
- User presence indicators
- Room participant list
- Private messaging
