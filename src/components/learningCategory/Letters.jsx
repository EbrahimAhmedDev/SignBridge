import LearningCategory from "./LearningCategory";
import letterImg from "../../assets/learning1.png";

const Letters = () => {
  const data = Array(6).fill({ label: "أ", image: letterImg });
  return (
    <LearningCategory
      title="Learning Letters"
      items={data}
      themeColor="#fcd4b4"
      quizTitle="Ready to test what you've learned?"
      quizDesc="Challenge yourself with quick quiz and see how well you understand Letters in sign language!"
      categoryName="letters"
    />
  );
};
export default Letters;
