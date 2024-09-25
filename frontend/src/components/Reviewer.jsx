import ToggleCard from "./Toggle";

const Reviewer = ({ props }) => {
  const { review, improvement, model_answer } = props;

  const styles = {
    border: "1px solid #000",
    padding: "10px 10px 0 10px",
    width: "80%",
    borderRadius: "17px",
    margin: "10px"
  }

  return (
    <div className="reviewer" style={styles}>
      <ToggleCard title="Review" content={review} visible={true} />
      <ToggleCard title="Improvement" content={improvement} />
      <ToggleCard title="Model Answer" content={model_answer} visible={true} />
      <div className="footnote">
        Reviewer
      </div>

    </div>
  );
}

export default Reviewer;