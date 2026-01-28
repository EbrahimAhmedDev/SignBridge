import LearningCategory from "./LearningCategory";
import numberImg from "../../assets/learninig3.png";

const Numbers = () => {
  const data = Array(6).fill({ label: "1", image: numberImg });
  return (
    <LearningCategory
      title="Learning Numbers"
      items={data}
      themeColor="#d3d3df"
      quizTitle="Ready to test Numbers?"
      quizDesc="Challenge yourself with Numbers in sign language!"
      categoryName="numbers"
    />
  );
};
export default Numbers;
