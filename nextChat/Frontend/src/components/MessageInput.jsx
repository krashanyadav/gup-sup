import { useState, useEffect } from "react";
import { sendMessage } from "../services/chatService";
import "../styles/messageInput.css";
import socket from "../services/socket";

function MessageInput({ user, conversationId }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selected);

    if (
      selected.type.startsWith("image/") ||
      selected.type.startsWith("video/")
    ) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);

    const input = document.getElementById("fileInput");
    if (input) input.value = "";
  };

  const send = async () => {
    if (!text.trim() && !file) return;

    try {
      setSending(true);

      const form = new FormData();

      form.append("receiverId", user._id);

      if (conversationId) {
        form.append("conversationId", conversationId);
      }

      form.append("text", text);

      if (file) {
        form.append("file", file);
      }

      const res = await sendMessage(form);

      socket.emit("sendMessage", res.data.message);

      socket.emit("stopTyping", {
        conversationId,
        userId: user._id,
      });

      setText("");
      setTyping(false);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      setFile(null);

      const input = document.getElementById("fileInput");
      if (input) input.value = "";
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (e) => {
    setText(e.target.value);

    if (!typing) {
      setTyping(true);

      socket.emit("typing", {
        conversationId,
        userId: user._id,
      });
    }

    if (e.target.value === "") {
      setTyping(false);

      socket.emit("stopTyping", {
        conversationId,
        userId: user._id,
      });
    }
  };

  return (
    <>
      {(file || preview) && (
        <div className="file-preview">
          {preview && file?.type.startsWith("image/") && (
            <img
              src={preview}
              alt="preview"
              className="preview-image"
            />
          )}

          {preview && file?.type.startsWith("video/") && (
            <video
              src={preview}
              controls
              className="preview-video"
            />
          )}

          {!preview && file && (
            <div className="file-name">
              📄 {file.name}
            </div>
          )}

          <button
            type="button"
            className="remove-file"
            onClick={removeFile}
          >
            ✕
          </button>
        </div>
      )}

      <div className="chat-input">
        <label className="file-btn">
          📎
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={handleFile}
          />
        </label>

        <input
          className="message-field"
          value={text}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !sending) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Type a message"
        />

        <button
          className="send-btn"
          onClick={send}
          disabled={sending}
        >
          {sending ? "..." : "➤"}
        </button>
      </div>
    </>
  );
}

export default MessageInput;