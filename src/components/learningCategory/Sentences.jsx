import LearningCategory from "./LearningCategory";
import sentenceImg from "../../assets/learninig4.png";

const Sentences = () => {
  const data = [
    { label: "السلام عليكم", image: sentenceImg },
    { label: "عاملين ايه", image: sentenceImg },
  ];
  return (
    <LearningCategory
      title="Learning Famous Sentences"
      items={data}
      themeColor="#cce4b0"
      quizTitle="Ready to test Sentences?"
      quizDesc="Practice the most famous sentences in sign language!"
      categoryName="sentences"
    />
  );
};
export default Sentences;
