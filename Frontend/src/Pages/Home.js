import React, { useState } from "react";
import Blog from "../Components/Blogs/Blog";
import ContestsCard from "../Components/Cards/ContestsCard";
import StreamsCard from "../Components/Cards/StreamsCard";
import PremiumCard from "../Components/Cards/PremiumCard";
function Home() {
  // const [blogs, setBlogs] = useState([])
  function getBlogs() {
    // api to get blogs
  }

  let blogs = [
    {
      id: 1,
      type: "blog",
      author: {
        name: "Mahmoud Hawara",
        img: "../Assets/Images/hawara.png",
      },
      date: new Date("2024-01-29T05:43:28.113Z"),
      title: "Exploring Algorithms in Python",
      content: `Hello  community!
      I wanted to share with you my recent exploration of various algorithms in Python. In this post, I will be discussing popular algorithms like binary search, graph traversal, and dynamic programming, and provide their implementations in Python.\n
      I have found these algorithms to be fundamental and they have helped me immensely in my programming journey. I hope that by sharing this knowledge, I can contribute to the learning and growth of fellow programmers.\n      Feel free to ask any questions or provide feedback in the comments below. I look forward to discussing algorithms with all of you!\n
      Happy coding!`,
      likes: 5000,
      unLikes: 10,
      comments: 30

    },
    {
      id: 2,
      type: "announcement",
      author: {
        name: "Mahmoud Hawara",
        img: "../Assets/Images/hawara.png",
      },
      date: new Date("2022-07-25T14:10:26.113Z"),
      title: "Exploring Algorithms in Python",
      content: `Hello  community! \n
      I wanted to share with you my recent exploration of various algorithms in Python. In this post, I will be discussing popular algorithms like binary search, graph traversal, and dynamic programming, and provide their implementations in Python.\n
      I have found these algorithms to be fundamental and they have helped me immensely in my programming journey. I hope that by sharing this knowledge, I can contribute to the learning and growth of fellow programmers.\n
      Feel free to ask any questions or provide feedback in the comments below. I look forward to discussing algorithms with all of you!\n
      Happy coding!`,
      likes: 2000000,
      unLikes: 10,
      comments: 30,
    },
  ];

  const blogsComponents = blogs.map((blog) => {
    return <Blog key={blog.id} blog={blog} />;
  });

  return (
    <div className="grid grid-cols-4 gap-8 mt-10">
      <div className="col-span-4 md:col-span-3">{blogsComponents}</div>
      <div className="hidden  md:block">
        <ContestsCard />
        <StreamsCard />
        <PremiumCard />
      </div>
    </div>
  );
}

export default Home;
