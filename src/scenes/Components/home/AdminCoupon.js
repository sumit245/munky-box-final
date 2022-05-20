import { View, Text } from 'react-native'
import React, { useState } from 'react'
import MarqueeText from "react-native-marquee"
import axios from 'axios'
export default function () {
    const [coupon,setCoupon]=useState({})
    const getAdminCoupon = async() => {
        const response = await axios.get("http://54.146.133.108:5000/api/admin-coupon")
        const { data } = response
        setCoupon(data[0])
    }
    useEffect(() => {
      getAdminCoupon()
    }, [])
    
    return (
        <View>
            <MarqueeText style={{ fontSize: 24 }} speed={1} marqueeOnStart={true} loop={true} delay={1000}>
                {coupon.promo_text}
            </MarqueeText>
        </View>
    )
}