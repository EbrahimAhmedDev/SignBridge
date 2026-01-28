import LearningCategory from "./LearningCategory";
import colorImg from "../../assets/learninig2.png";

const Colors = () => {
  const data = Array(6).fill({ label: "بني", image: colorImg });
  return (
    <LearningCategory
      title="Learning Colors"
      items={data}
      themeColor="#c1e8ed"
      quizTitle="Ready to test Colors?"
      quizDesc="Test your knowledge in sign language colors now!"
      categoryName="colors"
    />
  );
};
export default Colors;
