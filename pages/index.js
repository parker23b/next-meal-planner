import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>
      <div>Hello</div>
      <Link href="/signup">Sign Up</Link>
      <Link href="/login">Login</Link>
    </>
  );
}
