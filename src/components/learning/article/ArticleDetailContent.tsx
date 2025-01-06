interface ContentProps {
    text: string;
    createdAt: string;
    authorName: string;
  }
  
  const ArticleDetailContent = ({ text, createdAt, authorName }: ContentProps) => {
    return (
      <div className="max-w-[800px] mx-auto my-10">
        <p className="text-sm text-gray-600">
          {new Date(createdAt).toLocaleDateString()} <br />
          BY. {authorName}
        </p>
        <article className="mt-8 text-gray-800 leading-relaxed">{text}</article>
      </div>
    );
  };
  
  export default ArticleDetailContent;