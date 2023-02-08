import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <div className='w-full'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen w-full p-4 bg-white'>{children}</main>
    </div>
  );
};

export default Layout;
