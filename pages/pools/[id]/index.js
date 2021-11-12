import { useRouter } from "next/router";
import Link from "next/link";

const Pool = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1>Pool: {id}</h1>
  );
}

export default Pool;