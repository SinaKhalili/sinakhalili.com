import Head from "next/head";

interface IMetaProps {
  title: string;
}

const Meta = ({ title }: IMetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="keywords"
        content="code, python, philosophy, statups, tech, web development, engineering"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default Meta;

Meta.defaultProps = {
  title: "Sina's blog",
};
