import "../styles/Contact.css";

const Contact = ({ user, index, selectContact, handleSelected }) => {
  return (
    <div
      className={`contact-user ${selectContact === index ? "selected" : ""}`}
      onClick={() => handleSelected(index, user)}
    >
      <img src={user.avatarImage} alt={`avatar-${user.username}`} />
      <p>{user.username}</p>
    </div>
  );
};

export default Contact;
