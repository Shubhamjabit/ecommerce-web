import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { Container } from 'react-bootstrap';
import styles from './Styles/Preassembled.module.scss'

function PreAssembledUI() {
    //Next Router declartion
    const router =useRouter(); 
    // Static Data for Display
    const itemData=[
        {id:1,prod_img:'/images/tricab_img/product1.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:2,prod_img:'/images/tricab_img/product22.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:3,prod_img:'/images/tricab_img/product3.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:4,prod_img:'/images/tricab_img/product4.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:5,prod_img:'/images/tricab_img/product5.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:6,prod_img:'/images/tricab_img/product4.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:7,prod_img:'/images/tricab_img/product4.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`},
        {id:8,prod_img:'/images/tricab_img/product4.png',tagName:'EBL',textName:'Earth Bonding Leads',description:`Sparky Pre-Assembled Copper - Earth Flexible Bonds provide an earthing 
        connection to be welded onto steel rebars. This provides a reliable, strong, 
        low resistance path to earth.`}
    ]
   // handle Customization
    const handleCustomization=(itemId)=>{
        if(itemId)
        router.push({pathname:'customization',query:{itemId:itemId}})
    }
  return (
    <Container fluid className={styles.ContentWrapper}>
        {/* Banner Container */}
        <div className={styles.BannerContainer}>
            <div className={styles.LeftWireLogo}>
                <img src='/images/tricab_img/LeftWireLogo.png' />
            </div>
            <div className={styles.TitleContainer}>
                <strong>Pre-assemble your Products</strong><br></br>
                <span>Personalize Your Purchase: Create a Unique Product That Fits Your Exact Specifications</span>
            </div>
            <div className={styles.RightWireLogo}>
            <img src='/images/tricab_img/RightWireLogo.png' />
            </div>
        </div>
        {/* Item Container */}
        <Grid container display={"row"} spacing={4} >
            {itemData && itemData.map((item,index)=>(
                <Grid item xs={12} md={6} lg={6} key={index}>
                <div className={styles.ItemContainer}>
                    <div className={styles.ItemBoxs}>
                        <div className={styles.ImageBox}>
                            <img src={item && item.prod_img} />
                        </div>
                        <div className={styles.ItemInformationBox}>
                            <div className={styles.HeadingTitle}>
                                <span className={styles.TagName}>{item && item.tagName}</span>
                                <span className={styles.TextName}>{item && item.textName}</span>
                            </div>
                            <p>{item && item.description} </p>
                            <button onClick={()=>handleCustomization(item && item.id)}>Customize</button>
                        </div>
                    </div>
                </div>
            </Grid>
            ))}
            
          
        </Grid>
        
    </Container>
  )
}

export default PreAssembledUI