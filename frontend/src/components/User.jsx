import ToggleCard from "./Toggle";

const User = ({ props }) => {
  const msg = props;

  const styles = {
    border: "1px solid #000",
    padding: "10px 10px 0 10px",
    width: "80%",
    borderRadius: "17px",
    margin: "10px"
  }
  return (
    <div className="user" style={styles}>
      <ToggleCard title="User" content={msg} />
      <div className="footnote">
        User
      </div>
    </div>
  );
}

export default User