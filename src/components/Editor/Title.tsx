interface Props {
  title: string;
  lang: string;
}

const Title = ({ title, lang }: Props) => {
  return (
    <>
      {title}
      <code className="ms-2 bg-light p-1 rounded-1 fs-5">{lang}</code>
    </>
  );
};

export default Title;
