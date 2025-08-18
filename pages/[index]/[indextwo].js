import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import CategoryPage from "../../components/CategoryPage";
import { endPoint, envUrl } from "../../utils/factory";
import { MasterHeader } from "../../components/MasterHeader";

function Home({ pageData }) {
  const router = useRouter();
  //const urlPath = router.asPath.split("/");
  const urlPath = router.query.index;
  const suburlPath = router.query.indextwo;
  const subsuburlPath = router.query.indexthree;

  // const categorylevelOne =
  //   pageData &&
  //   pageData.data &&
  //   pageData.data.category.filter(
  //     (i) => i.name.toLowerCase().replace(/ /g, "-") === urlPath
  //   );

  // const categorylevelTwo =
  //   categorylevelOne &&
  //   categorylevelOne[0].sub_categories.filter(
  //     (i) =>
  //       i.name.split("/").pop().toLowerCase().replace(/ /g, "-") === suburlPath
  //  );

  // useEffect(() => {
  //   if (Object.keys(router.query).length > 2) {
  //     router.replace(`/${urlPath}/${suburlPath}`, undefined, { shallow: true });
  //     console.log("<<<<<<<<111", router);
  //   }
  // }, []);

  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ pageData at [indextwo]", pageData);

  return (
    <>
      {pageData.data.products && (
        <div>
          {/* {categorylevelTwo.length > 0 && (
            <>
              {categorylevelTwo &&
                categorylevelTwo.map((item) => (
                  <>
                    <MasterHeader
                      title={item.meta_title}
                      isCategoryPage={true}
                      categoryPath={urlPath}
                      categorylevelTwo={categorylevelTwo}
                    />
                  </>
                ))}
            </>
          )} */}
          <CategoryPage
            total={pageData.data.total[0].total}
            products={pageData.data.products}
            level="2"
            CategoryData={pageData && pageData.data.category}
            assemblySolutionsList={
              pageData && pageData.data.assemblySolutionsList
            }
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  let query = context.query;

  var obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: query.index + "/" + query.indextwo,
      level: 2,
      page: query.page ? parseInt(query.page) : 1,
      pageSize: 24,
      order_by: query.orderBy ? query.orderBy : "Default",
      minimum_price: query.minPrice ? parseInt(query.minPrice) : 1,
      maximum_price: query.maxPrice ? parseInt(query.maxPrice) : 100000,
      filter_by: Object.keys(query).length > 2 ? query : null,
    }),
  };

  const response = await fetch(
    `${envUrl.baseUrl}${endPoint.webAttribute}`,
    obj
  );

  const pageData = await response.json();

  // redirect invalid url to 404
  if (
    pageData &&
    pageData.data &&
    !pageData.data.products &&
    !pageData.data.productBySlug &&
    !pageData.data.content.length &&
    !pageData.data.categorybyslug.length &&
    !pageData.data.catalogueDataBySlug.length
  ) {
    context.res.writeHead(307, { Location: `/404` });
    context.res.end();
  }

  return {
    props: { pageData },
  };
}

export default Home;
