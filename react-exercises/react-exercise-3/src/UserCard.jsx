import PropTypes from "prop-types";

const UserCard = ({ username, email }) => {
  return (
    <div>
      <h2>Username is: {username}</h2>
      <p>Email is: {email}</p>
    </div>
  );
};

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserCard;
