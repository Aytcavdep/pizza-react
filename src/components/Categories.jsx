import { useState } from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onClickCategory = (index) => setActiveIndex(index);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              className={activeIndex === index ? "active" : ""}
              key={index}
              onClick={() => onClickCategory(index)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
