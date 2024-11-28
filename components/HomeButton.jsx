import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/" passHref>
      <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-nowrap">
        Go Home
      </button>
    </Link>
  );
};

export default HomeButton;
