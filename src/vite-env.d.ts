/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module 'swiper/react' {
  import * as React from 'react'
  import { SwiperOptions } from 'swiper/types'
  
  export class Swiper extends React.Component<SwiperOptions & {
    onSwiper?: (swiper: any) => void
    onSlideChange?: (swiper: any) => void
    onBeforeInit?: (swiper: any) => void
    className?: string
    children?: React.ReactNode
  }> {}
  
  export class SwiperSlide extends React.Component<{
    children?: React.ReactNode
    className?: string
    virtualIndex?: number
  }> {}
}

declare module 'swiper/modules' {
  export const Navigation: any
  export const Pagination: any
  export const Autoplay: any
}

declare module 'swiper/css' {}
declare module 'swiper/css/navigation' {}
declare module 'swiper/css/pagination' {}