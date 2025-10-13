import { colors } from "@/constants/theme";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors } from "react-native-image-colors/build/types";
export default function usePlayerBackground(imageUrl: string) {
    const [imageColors, setImageColors] = useState<IOSImageColors | AndroidImageColors|null>(null)

    useEffect(()=>{
        getColors(imageUrl,{
            fallback:colors.background,
            cache:true,
            key:imageUrl
        }).then((colors)=>setImageColors(colors as IOSImageColors))
    },[imageUrl])

    return {imageColors}
}
