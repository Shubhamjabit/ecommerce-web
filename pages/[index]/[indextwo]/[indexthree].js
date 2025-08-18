import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import CategoryPage from "../../../components/CategoryPage";
import { endPoint, envUrl } from "../../../utils/factory";
import { MasterHeader } from "../../../components/MasterHeader";
// const products = [
//   {
//     name: "Bootlace / Ferrule Insulated, Single",
//     image: "/images/products/category.png",
//     title: "A01",
//   },
//   {
//     name: "Bootlace / Ferrule Uninsulated, Single",
//     image: "/images/products/image(4).png",
//     title: "A02",
//   },
//   {
//     name: "Bootlace / Ferrule Insulated, Twin",
//     image: "/images/products/image(5).png",
//     title: "A03",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/image(6).png",
//     title: "A05",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/image(7).png",
//     title: "A06",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/category.png",
//     title: "A07",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/image(4).png",
//     title: "A08",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/image(5).png",
//     title: "A09",
//   },
//   {
//     name: "Ring Terminal TPE Insulated",
//     image: "/images/products/image(6).png",
//     title: "A10",
//   },
// ];
function Home({ pageData }) {
  const router = useRouter();
  //const urlPath = router.asPath.split("/");
  const urlPath = router.query.index;
  const suburlPath = router.query.indextwo;
  const subsuburlPath = router.query.indexthree;

  const categorylevelOne =
    pageData &&
    pageData.data &&
    pageData.data.category.filter(
      (i) => i.name.toLowerCase().replace(/ /g, "-") === urlPath
    );

  const categorylevelTwo =
    categorylevelOne &&
    categorylevelOne[0]?.sub_categories?.filter(
      (i) =>
        i.name.split("/").pop().toLowerCase().replace(/ /g, "-") === suburlPath
    );

  const categorylevelThree =
    categorylevelTwo &&
    categorylevelTwo[0].sub_sub_categories.filter(
      (i) =>
        i.name.split("/")[2].toLowerCase().replace(/ /g, "-") === subsuburlPath
    );

  //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@", pageData);

  return (
    <>
      {pageData.data.products && (
        <div>
          {categorylevelThree.length > 0 && (
            <>
              {categorylevelThree &&
                categorylevelThree.map((item) => (
                  <>
                    <MasterHeader
                      title={item.meta_title}
                      isCategoryPage={true}
                      categoryPath={urlPath}
                      categorylevelThree={categorylevelThree}
                    />
                  </>
                ))}
            </>
          )}
          <CategoryPage
            total={pageData.data.total[0].total}
            products={pageData.data.products}
            level="3"
            CategoryData={pageData && pageData.data && pageData.data.category}
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
      slug: query.index + "/" + query.indextwo + "/" + query.indexthree,
      level: 3,
      page: query.page ? parseInt(query.page) : 1,
      pageSize: 6,
      order_by: query.orderBy ? query.orderBy : "Default",
      minimum_price: query.minPrice ? parseInt(query.minPrice) : 10,
      maximum_price: query.maxPrice ? parseInt(query.maxPrice) : 100000,
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
