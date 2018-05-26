export default function (props) {
  return (
    <div>
      <header></header>
      {
        props.children
      }
      <footer></footer>
    </div>
  );
}