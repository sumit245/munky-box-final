import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import MarqueeText from "react-native-marquee"
import axios from 'axios'
export default function () {
    const [coupon, setCoupon] = useState("")
    const getAdminCoupon = async () => {
        const response = await axios.get("http://54.146.133.108:5000/api/admin-coupon")
        const { coupons } = response.data
        let { promo_text, discount, promo_code } = coupons[0]
        let promo = promo_text.replace(/X/i, promo_code)
        promo = promo.replace(/y/i, discount);
        setCoupon(promo)
    }
    useEffect(() => {
        getAdminCoupon()
    }, [])

    return (
        <View style={{ marginHorizontal: 4, justifyContent:"center", padding: 4 }}>
            <MarqueeText style={{ fontSize: 18, color: "#FFA500", fontWeight: 'bold' }} speed={1} marqueeOnStart={true} loop={true}>
                {coupon}
            </MarqueeText>
        </View>
    )
}