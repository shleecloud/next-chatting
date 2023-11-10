'use client';
import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Page(): JSX.Element {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleChatRoomEnter = (): void => {
    const socketConnection = io('http://localhost:8080');
    socketConnection.on('connect', () => {
      console.log('connected');
      setSocket(socketConnection);
    });
    socketConnection.on('message', (data: any) => {
      console.log(data);
    });
  };
  const handleSubmit = (): void => {
    // e.preventDefault();
    if (!socket) {
      return;
    }
    socket.emit('message', { message: content });

    setContent('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Chat room</h1>
        <button onClick={handleChatRoomEnter} type="button">
          Enter
        </button>
        <div>
          <p>dummy message</p>
          <p>dummy message</p>
          <p>dummy message</p>
        </div>
      </div>
      <br />
      <hr />
      <form id="chatInput">
        <input id="input" onChange={handleInput} type="textbox" value={content} />
        <button id="submit" onClick={handleSubmit} type="button">
          Submit
        </button>
      </form>
    </div>
  );
}
