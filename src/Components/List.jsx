const List = ({ items }) => (
  <ol className="text-left list-decimal text-lg mb-12 mx-6">
    {items.map((item, index) => (
      <li key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: item }}></li>
    ))}
  </ol>
);

export default List;
