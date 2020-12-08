import { Entypo, Feather } from "@expo/vector-icons"
import { Icon } from "@expo/vector-icons/build/createIconSet"

export type GetEntypoType<C extends Icon<any, `entypo`>> = C extends Icon<infer T, `entypo`> ? T : unknown
export type GetFeatherType<C extends Icon<any, `feather`>> = C extends Icon<infer T, `feather`> ? T : unknown

export type EntypoIconType = GetEntypoType<typeof Entypo>
export type FeatherIconType = GetFeatherType<typeof Feather>
