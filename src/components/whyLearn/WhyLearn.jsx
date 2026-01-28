import React from "react";
import style from "./whyLearn.module.css";
import { HiUsers } from "react-icons/hi";
import { GiBrain } from "react-icons/gi";
import { FaHeart, FaBriefcase, FaBaby } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const WhyLearn = () => {
  const features = [
    {
      id: 1,
      title: "Connect with Deaf Community",
      desc: "Build meaningful relationships with deaf and hard-of-hearing individuals, opening doors to a vibrant and rich culture.",
      icon: <HiUsers />,
      colorClass: style.orange,
    },
    {
      id: 2,
      title: "Cognitive Benefits",
      desc: "Learning sign language improves memory, spatial awareness, and multitasking abilities. It activates different parts of the brain.",
      icon: <GiBrain />,
      colorClass: style.blue,
    },
    {
      id: 3,
      title: "Enhanced Communication",
      desc: "Sign language can be used in noisy environments, through windows, or when speaking isn't appropriate.",
      icon: <FaHeart />,
      colorClass: style.purple,
    },
    {
      id: 4,
      title: "Career Opportunities",
      desc: "Opens doors in education, healthcare, interpretation, social work, and many other fields that value accessibility.",
      icon: <FaBriefcase />,
      colorClass: style.pink,
    },
    {
      id: 5,
      title: "Early Childhood Development",
      desc: "Baby sign language helps infants communicate before they can speak, reducing frustration and building bonds.",
      icon: <FaBaby />,
      colorClass: style.green,
    },
    {
      id: 6,
      title: "Personal Growth",
      desc: "Develops empathy, cultural awareness, and a broader perspective on communication and human connection.",
      icon: <HiOutlineSparkles />,
      colorClass: style.red,
    },
  ];

  return (
    <section className={style.container}>
      <h2 className={style.title}>Why Learn Sign Language?</h2>
      <p className={style.subtitle}>
        Learning sign language offers countless benefits, from personal growth
        to professional opportunities and meaningful connections.
      </p>

      <div className={style.grid}>
        {features.map((item) => (
          <div key={item.id} className={`${style.card} ${item.colorClass}`}>
            <div className={style.iconWrapper}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyLearn;
