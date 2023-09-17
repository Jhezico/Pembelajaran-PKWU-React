export default function Header({ author }) {
  return (
    <h1 className="text-2xl text-white semi">
      Belajar React bareng {author ? author : "ZICO"} 😍
    </h1>
  );
}
