import "../css/Avatar.css";

const Avatar = (props) => {
  return (
    <div className="avatar">
      <img src={props.user.avatarurl} className="user-img" />
    </div>
  );
};

export default Avatar;
