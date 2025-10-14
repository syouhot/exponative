import { colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors } from "react-native-image-colors/build/types";
export default function usePlayerBackground(imageUrl: string) {
    const [imageColors, setImageColors] = useState<IOSImageColors | AndroidImageColors|null>(null)

    useEffect(() => {
        if(!imageUrl) return
        getColors(imageUrl,{
            fallback:colors.background,
            cache:true,
            key:imageUrl
        }).then((colors) => setImageColors(Platform.OS === "ios" ? colors as IOSImageColors:colors as AndroidImageColors))
    },[imageUrl])

    return {imageColors}
}
