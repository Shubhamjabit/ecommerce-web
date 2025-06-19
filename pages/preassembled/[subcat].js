import React from "react";
import PreAssembledProductList from "../../components/PreAssembled/components/PreAssembledProduct/PreAssembledProductList";

const subcat = ({ data }) => {
  // console.log("&&&&&&&&&&& data", data);
  let productList = [
    {
      id: 1,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 2,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 3,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 4,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 5,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 6,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 7,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
    {
      id: 8,
      image_url: "/images/tricab_img/product1.png",
      tagName: "EBL",
      name: "20A Light Duty 2.5mm2 Cable 3 Pin Plug & Socket",
      description: `Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
      connection to be welded onto steel rebars. This provides a reliable, strong, 
      low resistance path to earth.`,
    },
  ];
  let CategoryData = [];
  let total = 8;
  return (
    <>
      {productList && (
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
          <PreAssembledProductList
            // total={pageData.data.total[0].total}
            // products={pageData.data.products}
            // level="2"
            // CategoryData={pageData && pageData.data && pageData.data.category}
            productList={productList}
            CategoryData={CategoryData}
            total={total}
          />
        </div>
      )}
    </>
  );
};

export default subcat;

export async function getServerSideProps(context) {
  let params = context.params;
  let data = params;
  return {
    props: { data },
  };
}
