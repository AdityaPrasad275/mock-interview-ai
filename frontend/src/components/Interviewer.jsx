import ToggleCard from "./Toggle";



const Interviwer = ({ props }) => {
  const { review, next_question, explanation } = props;

  const styles = {
    border: "1px solid #000",
    padding: "10px 10px 0 10px",
    width: "80%",
    borderRadius: "17px",
    margin: "10px"
  }

  return (
    <div className="interviewer" style={styles}>
      <ToggleCard title="Review" content={review} />
      <ToggleCard title="Next Question" content={next_question} visible={true} />
      <ToggleCard title="Explanation" content={explanation} />
      <div className="footnote">
        Interviewer
      </div>
    </div>
  );
}

export default Interviwer;