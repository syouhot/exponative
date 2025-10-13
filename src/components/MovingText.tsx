import React, { useEffect } from 'react'
import { TextStyle } from 'react-native'
import Animated, { cancelAnimation, Easing, StyleProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'
export type MovingTextProps = {
    text: string
    animationThreshold: number
    style?: StyleProps | TextStyle
}
export default function MovingText({ text, animationThreshold, style }: MovingTextProps) {
    const translateX = useSharedValue(0)
    const shouldAnimate = text.length >= animationThreshold 
    const textWidth =  text.length * 3 

    useEffect(() => {
        if (!shouldAnimate) return
        translateX.value = withDelay(1000, withRepeat(withTiming(-textWidth, {
            duration: 5000,
            easing: Easing.linear
        }), -1, true))
        return () => {
            cancelAnimation(translateX)
            translateX.value = 0
        }
    }, [translateX, text, animationThreshold, textWidth, shouldAnimate])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value }
            ]
        }
    })

    return (
        <Animated.Text numberOfLines={1} style={[
            style as TextStyle,
            animatedStyle,
            shouldAnimate && {
                width: 9999, //preventing the ellipsis from appearing
                paddingLeft: 16,//avoid the initial character being bardly visible
            }
        ]}>{text}</Animated.Text>
    )
}
