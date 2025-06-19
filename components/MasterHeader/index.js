import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getUserDetailsFromDB, signOut } from "../../services/auth/authService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/actions/userActions";

export const MasterHeader = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cateno = router.query.page;
  const urlPath = router.query.index;
  const suburlPath = router.query.indextwo;
  const paths = router.asPath;

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const response = await getUserDetailsFromDB({
        email: user.email,
      });
      console.log("rrrrrrrrrrrrr", response);
      if (response.state) {
        dispatch(saveUser(response.user[0]));
      } else {
        signOut();
        router.push("/");
      }
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        {props.isHomePage && (
          <>
            <title>
              {/* Sparky Warehouse | The world&#039;s most flexible cable
              manufacturer */}
              Sparky Warehouse
            </title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="title"
              content="Sparky Warehouse | The world&#039;s most flexible cable manufacturer"
            />
            <meta
              name="description"
              content="The world's most flexible cable manufacturer"
            />
            <meta
              name="keywords"
              content="electrical cable,triangle cables, lzsh, marine cable, power cable, custom cable, industrial cable, offshore cable, shipboard cable, cable accessories"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            ></meta>
          </>
        )}

        {props.isCategoryPage && (
          <>
            <title>{props.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="title"
              content="Sparky Warehouse | The world&#039;s most flexible cable manufacturer "
            />
            <meta
              name="description"
              content="The world's most flexible cable manufacturer"
            />
            <meta
              name="keywords"
              content="electrical cable,triangle cables, lzsh, marine cable, power cable, custom cable, industrial cable, offshore cable, shipboard cable, cable accessories"
            />
          </>
        )}

        {props.isProductPage && (
          <>
            <title>{props.title}</title>
            <meta
              name="description"
              content="The world's most flexible cable manufacturer"
            />
            <meta
              name="keywords"
              content="electrical cable,triangle cables, lzsh, marine cable, power cable, custom cable, industrial cable, offshore cable, shipboard cable, cable accessories"
            />
          </>
        )}
      </Head>
    </Fragment>
  );
};
