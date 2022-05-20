import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import MarqueeText from "react-native-marquee"
import axios from 'axios'
export default function () {
    const [coupon, setCoupon] = useState("")
    const getAdminCoupon = async () => {
        const response = await axios.get("http://54.146.133.108:5000/api/admin-coupon")
        const { data } = response
        let { promo_text, discount, promo_code } = data[0]
        let promo = promo_text.replace(/X/i, promo_code)
        promo = promo.replace(/y/i, discount);
        setCoupon(promo)
    }
    useEffect(() => {
        getAdminCoupon()
    }, [])

    return (
        <View style={{ marginHorizontal: 4, backgroundColor: "#fff", padding: 4 }}>
            <MarqueeText style={{ fontSize: 18, color: "#f00", fontWeight: 'bold' }} speed={1} marqueeOnStart={true} loop={true} delay={1000}>
                {promo}% OFF
            </MarqueeText>
        </View>
    )
}