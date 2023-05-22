import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getPosts = (pageIndex: number) => {
  const dirFiles = fs.readdirSync(
    path.join(process.cwd(), "src", "pages", "posts"),
    {
      withFileTypes: true,
    }
  );

  const posts = dirFiles
    .map((file) => {
      if (!file.name.endsWith(".mdx")) return;

      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "src", "pages", "posts", file.name),
        "utf-8"
      );
      const { data, content } = matter(fileContent);

      const slug = file.name.replace(/.mdx$/, "");
      return { data, content, slug };
    })
    .filter((post) => post);

  posts.sort((a, b) => {
    const adate = new Date(a?.data.publishedOn);
    const bdate = new Date(b?.data.publishedOn);
    console.log(adate.getTime(), bdate.getTime());

    return bdate.getTime() - adate.getTime();
  });

  return posts;
};
