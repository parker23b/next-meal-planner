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
      <div className="h-screen flex items-center justify-center gap-4">
        <Link href="/signup" className="btn btn-primary">
          Sign Up
        </Link>
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
        <Link href="/mealPlans">meal plans</Link>
      </div>
    </>
  );
}
