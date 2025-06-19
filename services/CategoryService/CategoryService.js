import axios from "axios";
import { endPoint, envUrl } from "../../utils/factory";

export const getCategoryAx = async () => {
  try {
    // let config = {
    //   headers: {
    //     'x-api-key': process.env.BACKEND_KEY,
    //   },
    // };

    // const res = await axios.post(
    //   String(process.env.BACKEND_URL),
    //   {
    //     query: `query getCategory {
    //             getCategoryMenuHierachy {
    //               id
    //               name
    //               priority
    //               description
    //               banner_url
    //               menuimage_url
    //               promotion_banner
    //               banner_position
    //               publish
    //               meta_keywords
    //               meta_title
    //               meta_description
    //               level
    //               sub_categories {
    //                 id
    //                 name
    //                 priority
    //                 description
    //                 banner_url
    //                 menuimage_url
    //                 promotion_banner
    //                 banner_position
    //                 publish
    //                 meta_keywords
    //                 meta_title
    //                 meta_description
    //                 level
    //               }
    //             }
    //           }`,
    //   },
    //   config,
    // );
    // console.log(
    //   ' res.data.data.getCategoryMenuHierachy :',
    //   res.data.data.getCategoryMenuHierachy,
    // );

    const response = await fetch(`${envUrl.baseUrl}${endPoint.webCategory}`);

    const pageData = await response.json();

    // return res.data.data.getCategoryMenuHierachy;
    return pageData;
  } catch (error) {
    console.error("error in getCategoryAx");
    return [];
  }
};
