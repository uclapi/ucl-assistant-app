import ViewPager from '@react-native-community/viewpager'
import React from 'react'

const ViewPagerComponent = ({ children, ...props }) => (
    <ViewPager {...props}>
      {children}
    </ViewPager>
)

export default ViewPagerComponent
