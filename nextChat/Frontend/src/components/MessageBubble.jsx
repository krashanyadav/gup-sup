import "../styles/messageBubble.css"
import { useState } from "react"
import { jwtDecode } from "jwt-decode";
import { editMessage, deleteMessage, reactMessage } from "../services/chatService"

function MessageBubble({ msg, onDelete }) {

    const [preview, setPreview] = useState(null)
    const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(msg.text)
    const [messageText, setMessageText] = useState(msg.text)
    const [showDelete, setShowDelete] = useState(false)

    const [reactions, setReactions] = useState(msg.reactions || [])

    const token = localStorage.getItem("token")
    let myId = ""

    if (token) {
        try {
            const decoded = jwtDecode(token)
            myId = String(decoded.userId)
        } catch (error) {
            console.error("Invalid token", error)
        }
    }

    const senderId = msg?.sender?._id || msg?.sender || ""
    const isMine = String(senderId) === myId

    const formatTime = (time) => {
        const d = new Date(time)
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // ✅ BASE URL (IMPORTANT)
    const baseUrl = "http://localhost:3000/"

    // ✅ MEDIA URL FIX (FINAL)
    const getMediaUrl = (url) => {
        if (!url) return ""

        // already full URL
        if (url.startsWith("http")) return url

        // fix double slash issue
        if (url.startsWith("/")) return baseUrl + url.slice(1)

        return baseUrl + url
    }

    // =============================
    // EMOJI LOGIC
    // =============================
    const handleEmojiClick = async (emoji) => {
        try {
            setReactions(prev => {
                const existing = prev.find(r => r.userId === myId)

                if (existing && existing.emoji === emoji) {
                    return prev.filter(r => r.userId !== myId)
                }

                if (existing) {
                    return prev.map(r =>
                        r.userId === myId ? { ...r, emoji } : r
                    )
                }

                return [...prev, { userId: myId, emoji }]
            })

            await reactMessage({
                messageId: msg._id,
                emoji
            })

        } catch (err) {
            console.log(err)
        }
    }

    const commonEmojis = ["❤️", "😂", "😮", "😢", "👍", "🔥"]

    // =============================
    // GROUP REACTIONS
    // =============================
    const groupedReactions = Object.values(
        reactions.reduce((acc, r) => {
            if (!acc[r.emoji]) {
                acc[r.emoji] = { emoji: r.emoji, count: 0 }
            }
            acc[r.emoji].count++
            return acc
        }, {})
    )

    // =============================
    // EDIT
    // =============================
    const handleEdit = async () => {
        try {
            await editMessage({ messageId: msg._id, text })
            setMessageText(text)
            setEditing(false)
        } catch (err) {
            console.log(err)
        }
    }

    // =============================
    // DELETE
    // =============================
    const handleDelete = async (type) => {
        try {
            await deleteMessage({ messageId: msg._id, deleteType: type })
            setShowDelete(false)

            if (onDelete) onDelete(msg._id)

        } catch (err) {
            console.log(err)
        }
    }

    const renderStatus = () => {
        if (!msg.status) return "✓"
        if (msg.status === "sent") return "✓"
        if (msg.status === "delivered") return "✓✓"
        if (msg.status === "seen") return <span className="seen">✓✓</span>
    }

    return (
        <div
            className={`bubble-row ${isMine ? "mine-row" : "other-row"}`}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <div className={`bubble ${isMine ? "mine" : "other"}`}>

                {/* ===== EMOJI PICKER ===== */}
                <div className="reaction-picker">
                    {commonEmojis.map(emoji => (
                        <span key={emoji} onClick={() => handleEmojiClick(emoji)}>
                            {emoji}
                        </span>
                    ))}
                </div>

                {/* ===== TEXT ===== */}
                {editing ? (
                    <div className="edit-box">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleEdit() }}
                        />
                        <button onClick={handleEdit}>Save</button>
                    </div>
                ) : (
                    messageText && <div className="bubble-text">{messageText}</div>
                )}

                {/* ===== REACTIONS ===== */}
                {groupedReactions.length > 0 && (
                    <div className="bubble-reactions-count">
                        {groupedReactions.map(r => (
                            <span key={r.emoji}>
                                {r.emoji} {r.count}
                            </span>
                        ))}
                    </div>
                )}

                {/* ===== DELETE POPUP ===== */}
                {showDelete && (
                    <div className="delete-popup">
                        <div className="delete-box">
                            <h4>Delete message?</h4>
                            <button onClick={() => handleDelete("everyone")}>
                                Delete for everyone
                            </button>
                            <button onClick={() => setShowDelete(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* ===== IMAGE ===== */}
                {msg.type === "image" && (
                    <img
                        src={getMediaUrl(msg.mediaUrl)}
                        className="chat-image"
                        onClick={() => setPreview(getMediaUrl(msg.mediaUrl))}
                        alt="chat"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150"
                        }}
                    />
                )}

                {/* ===== IMAGE PREVIEW ===== */}
                {preview && (
                    <div className="img-preview" onClick={() => setPreview(null)}>
                        <img src={preview} alt="preview" />
                    </div>
                )}

                {/* ===== VIDEO ===== */}
                {msg.type === "video" && (
                    <video controls className="chat-video">
                        <source src={getMediaUrl(msg.mediaUrl)} type="video/mp4" />
                        Your browser does not support video.
                    </video>
                )}

                {/* ===== FILE ===== */}
                {msg.type === "file" && (
                    <a
                        href={getMediaUrl(msg.mediaUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="chat-file"
                    >
                        📄 Download File
                    </a>
                )}

                {/* ===== MENU ===== */}
                {showMenu && isMine && (
                    <div className="msg-menu">
                        <div onClick={() => setEditing(true)}>✏️ Edit</div>
                        <div onClick={() => setShowDelete(true)}>🗑 Delete</div>
                    </div>
                )}

                {/* ===== FOOTER ===== */}
                <div className="bubble-footer">
                    <span className="bubble-time">
                        {formatTime(msg.createdAt)}
                    </span>
                    {isMine && <span className="tick">{renderStatus()}</span>}
                </div>

            </div>
        </div>
    )
}

export default MessageBubble